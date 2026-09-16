import { SeoItem, SeoAnalysisResult, CheckItem, AppSettings } from '../types';

export function analyzeSeo(item: Partial<SeoItem>, settings: AppSettings): SeoAnalysisResult {
  const focusKeyword = (item.focusKeyword || '').trim().toLowerCase();
  const seoTitle = (item.seoTitle || item.title || '').trim();
  const seoDesc = (item.seoDescription || '').trim();
  const slug = (item.slug || '').trim().toLowerCase();
  const content = (item.content || '').trim();
  const lowerContent = content.toLowerCase();

  // Strip HTML tags to get raw text
  const parserTemp = typeof window !== 'undefined' ? document.createElement('div') : null;
  let rawText = content;
  if (parserTemp) {
    parserTemp.innerHTML = content;
    rawText = parserTemp.textContent || parserTemp.innerText || '';
  } else {
    rawText = content.replace(/<[^>]*>/g, ' ');
  }

  // Word count calculation
  const words = rawText.match(/\b[\w'-]+\b/g) || [];
  const wordCount = words.length;

  // Keyword frequency and density
  let keywordCount = 0;
  let keywordDensity = 0;
  if (focusKeyword && wordCount > 0) {
    // Escape special regex characters in keyword
    const escapedKeyword = focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
    const matches = rawText.match(regex);
    keywordCount = matches ? matches.length : 0;
    
    // Keyword word count
    const kwWords = focusKeyword.split(/\s+/).filter(Boolean).length;
    keywordDensity = Number(((keywordCount * kwWords / Math.max(wordCount, 1)) * 100).toFixed(2));
  }

  const checks: CheckItem[] = [];

  // --------------------------------------------------------------------------
  // 1. BASIC SEO CHECKS
  // --------------------------------------------------------------------------

  // Check 1: Focus keyword in title
  const kwInTitle = focusKeyword ? seoTitle.toLowerCase().includes(focusKeyword) : false;
  checks.push({
    id: 'kw-in-title',
    category: 'basic',
    label: 'Focus Keyword in SEO Title',
    passed: kwInTitle,
    details: kwInTitle
      ? `Great! Your focus keyword "${focusKeyword}" appears in the SEO title.`
      : `Add your focus keyword "${focusKeyword || '...'}" to the SEO title for better rankings.`,
    targetField: 'seoTitle',
  });

  // Check 2: Focus keyword in Meta Description
  const kwInDesc = focusKeyword ? seoDesc.toLowerCase().includes(focusKeyword) : false;
  checks.push({
    id: 'kw-in-desc',
    category: 'basic',
    label: 'Focus Keyword in Meta Description',
    passed: kwInDesc,
    details: kwInDesc
      ? `Awesome! Focus keyword is present in the meta description.`
      : `Include the focus keyword in your meta description.`,
    targetField: 'seoDescription',
  });

  // Check 3: Focus keyword in URL/slug
  const cleanSlugKw = focusKeyword.replace(/\s+/g, '-');
  const kwInSlug = focusKeyword ? slug.includes(cleanSlugKw) || slug.includes(focusKeyword.replace(/\s+/g, '')) : false;
  checks.push({
    id: 'kw-in-slug',
    category: 'basic',
    label: 'Focus Keyword in URL / Slug',
    passed: kwInSlug,
    details: kwInSlug
      ? `URL slug contains the focus keyword.`
      : `Include focus keyword (or slug-friendly version "${cleanSlugKw}") in your URL.`,
    targetField: 'slug',
  });

  // Check 4: Focus keyword in first 10% of content
  const first10PercentWords = Math.ceil(wordCount * 0.1);
  const first10Text = words.slice(0, Math.max(first10PercentWords, 50)).join(' ').toLowerCase();
  const kwInFirst10 = focusKeyword ? first10Text.includes(focusKeyword) : false;
  checks.push({
    id: 'kw-in-first-10',
    category: 'basic',
    label: 'Focus Keyword in First 10% of Content',
    passed: kwInFirst10,
    details: kwInFirst10
      ? `Focus keyword appears near the beginning of your content.`
      : `Include your focus keyword in the introduction (first 10% of content).`,
    targetField: 'content',
  });

  // Check 5: Focus keyword in Subheadings (H2/H3)
  const h2h3Matches = content.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || [];
  const h2h3Text = h2h3Matches.map(h => h.replace(/<[^>]*>/g, '').toLowerCase()).join(' ');
  const kwInSubheadings = focusKeyword ? h2h3Text.includes(focusKeyword) : false;
  checks.push({
    id: 'kw-in-subheadings',
    category: 'basic',
    label: 'Focus Keyword in H2 / H3 Subheadings',
    passed: kwInSubheadings,
    warning: !kwInSubheadings && h2h3Matches.length > 0,
    details: kwInSubheadings
      ? `Focus keyword is present in your H2/H3 subheadings.`
      : `Use the focus keyword in at least one H2 or H3 subheading.`,
    targetField: 'content',
  });

  // Check 6: Keyword density
  const minDensity = settings.targetDensityMin || 1.0;
  const maxDensity = settings.targetDensityMax || 1.5;
  const densityPassed = keywordDensity >= minDensity && keywordDensity <= maxDensity;
  const densityWarning = (keywordDensity >= 0.5 && keywordDensity < minDensity) || (keywordDensity > maxDensity && keywordDensity <= 2.5);
  checks.push({
    id: 'kw-density',
    category: 'basic',
    label: `Keyword Density (${keywordDensity}%)`,
    passed: densityPassed,
    warning: densityWarning,
    details: densityPassed
      ? `Keyword density is ideal (${keywordDensity}%, target: ${minDensity}%–${maxDensity}%). Found ${keywordCount} times.`
      : keywordDensity < minDensity
      ? `Keyword density is a bit low (${keywordDensity}%). Target is ${minDensity}%–${maxDensity}%.`
      : `Keyword density is high (${keywordDensity}%). Avoid keyword stuffing (>2.5%).`,
    targetField: 'content',
  });

  // Check 7: Content Length
  const lengthPassed = wordCount >= 1000;
  const lengthWarning = wordCount >= 600 && wordCount < 1000;
  checks.push({
    id: 'content-length',
    category: 'basic',
    label: `Content Length (${wordCount} words)`,
    passed: lengthPassed,
    warning: lengthWarning,
    details: lengthPassed
      ? `Excellent content length (${wordCount} words). Recommended: 1000+ words.`
      : lengthWarning
      ? `Acceptable length (${wordCount} words). Aim for 1000+ words for competitive ranking.`
      : `Content is short (${wordCount} words). Minimum recommended is 600 words.`,
    targetField: 'content',
  });

  // Check 8: Internal Links
  // Detect links that match stored sitemap or root/relative paths or brand URL
  const linkMatches = content.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi) || [];
  let internalLinkCount = 0;
  let externalLinkCount = 0;

  linkMatches.forEach(linkHtml => {
    const hrefMatch = linkHtml.match(/href=["']([^"']+)["']/i);
    if (hrefMatch && hrefMatch[1]) {
      const href = hrefMatch[1];
      if (href.startsWith('/') || href.includes('quranacademy.co.uk') || href.startsWith('#')) {
        internalLinkCount++;
      } else if (href.startsWith('http://') || href.startsWith('https://')) {
        externalLinkCount++;
      }
    }
  });

  checks.push({
    id: 'internal-links',
    category: 'basic',
    label: `Internal Links (${internalLinkCount} found)`,
    passed: internalLinkCount > 0,
    details: internalLinkCount > 0
      ? `Found ${internalLinkCount} internal link(s) to pass link juice.`
      : `Add at least one internal link to another page on your site.`,
    targetField: 'content',
  });

  // Check 9: External Links
  checks.push({
    id: 'external-links',
    category: 'basic',
    label: `External Links (${externalLinkCount} found)`,
    passed: externalLinkCount > 0,
    details: externalLinkCount > 0
      ? `Found ${externalLinkCount} external link(s) to authority resources.`
      : `Add at least one link to an external authoritative resource.`,
    targetField: 'content',
  });

  // Check 10: Image Alt with Focus Keyword
  const imgMatches = content.match(/<img\s+[^>]*alt=["']([^"']+)["'][^>]*>/gi) || [];
  let imgWithKwAlt = false;
  imgMatches.forEach(imgTag => {
    const altMatch = imgTag.match(/alt=["']([^"']+)["']/i);
    if (altMatch && altMatch[1] && focusKeyword) {
      if (altMatch[1].toLowerCase().includes(focusKeyword)) {
        imgWithKwAlt = true;
      }
    }
  });

  checks.push({
    id: 'img-alt-kw',
    category: 'basic',
    label: 'Image with Alt Text containing Focus Keyword',
    passed: imgWithKwAlt,
    warning: imgMatches.length > 0 && !imgWithKwAlt,
    details: imgWithKwAlt
      ? `At least one image has alt text featuring your focus keyword.`
      : imgMatches.length > 0
      ? `Images found, but none contain the focus keyword in their alt attribute.`
      : `No images found. Add an image with alt text containing your focus keyword.`,
    targetField: 'content',
  });

  // --------------------------------------------------------------------------
  // 2. READABILITY CHECKS
  // --------------------------------------------------------------------------

  // Check 11: Sentence Length
  const sentences = rawText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  let totalSentenceWords = 0;
  let longSentences = 0;
  sentences.forEach(s => {
    const sWords = s.split(/\s+/).filter(Boolean).length;
    totalSentenceWords += sWords;
    if (sWords > 20) longSentences++;
  });
  const avgSentenceWords = sentences.length ? Math.round(totalSentenceWords / sentences.length) : 0;
  const sentencePassed = avgSentenceWords <= 20;

  checks.push({
    id: 'avg-sentence-length',
    category: 'readability',
    label: `Sentence Length (Avg: ${avgSentenceWords} words)`,
    passed: sentencePassed,
    warning: !sentencePassed && avgSentenceWords <= 25,
    details: sentencePassed
      ? `Sentence length is optimal (Avg: ${avgSentenceWords} words per sentence).`
      : `Average sentence length is ${avgSentenceWords} words. Try keeping sentences under 20 words for better readability.`,
    targetField: 'content',
  });

  // Check 12: Paragraph Length
  // Extract paragraphs from HTML <p> tags or split rawText by double newlines
  const pTags = content.match(/<p[^>]*>(.*?)<\/p>/gi) || [];
  let maxPWords = 0;
  let longParagraphsCount = 0;

  if (pTags.length > 0) {
    pTags.forEach(p => {
      const pText = p.replace(/<[^>]*>/g, '').trim();
      const pWordLen = pText.split(/\s+/).filter(Boolean).length;
      if (pWordLen > maxPWords) maxPWords = pWordLen;
      if (pWordLen > 150) longParagraphsCount++;
    });
  } else {
    const doubleNewlineBlocks = rawText.split(/\n\s*\n/);
    doubleNewlineBlocks.forEach(block => {
      const bWordLen = block.trim().split(/\s+/).filter(Boolean).length;
      if (bWordLen > maxPWords) maxPWords = bWordLen;
      if (bWordLen > 150) longParagraphsCount++;
    });
  }

  const pPassed = maxPWords <= 150;
  checks.push({
    id: 'paragraph-length',
    category: 'readability',
    label: `Paragraph Length (Max: ${maxPWords} words)`,
    passed: pPassed,
    warning: !pPassed && maxPWords <= 200,
    details: pPassed
      ? `Paragraph lengths are concise (Max paragraph: ${maxPWords} words).`
      : `Found ${longParagraphsCount} paragraph(s) over 150 words. Break them into smaller chunks.`,
    targetField: 'content',
  });

  // Check 13: Transition Words Percentage
  const transitionWords = [
    'however', 'therefore', 'furthermore', 'in addition', 'because', 'consequently',
    'for instance', 'moreover', 'as a result', 'similarly', 'although', 'specifically',
    'in conclusion', 'first', 'second', 'third', 'finally', 'also', 'besides', 'thus'
  ];
  let transitionCount = 0;
  transitionWords.forEach(tw => {
    const reg = new RegExp(`\\b${tw}\\b`, 'gi');
    const m = rawText.match(reg);
    if (m) transitionCount += m.length;
  });
  const transitionPercent = sentences.length ? Math.round((transitionCount / sentences.length) * 100) : 0;
  const transitionPassed = transitionPercent >= 25;

  checks.push({
    id: 'transition-words',
    category: 'readability',
    label: `Transition Words (${transitionPercent}% of sentences)`,
    passed: transitionPassed,
    warning: transitionPercent >= 15 && transitionPercent < 25,
    details: transitionPassed
      ? `Good flow! ${transitionPercent}% of sentences use transition words (Target: 25%+).`
      : `Only ${transitionPercent}% of sentences use transition words. Aim for 25%+ to improve flow.`,
    targetField: 'content',
  });

  // Check 14: Subheading Distribution
  const hasSubheadings = h2h3Matches.length > 0;
  const subheadingsPassed = wordCount < 300 ? true : hasSubheadings;
  checks.push({
    id: 'subheading-distribution',
    category: 'readability',
    label: 'Subheading Distribution (H2 / H3)',
    passed: subheadingsPassed,
    details: subheadingsPassed
      ? `Subheadings are well distributed (${h2h3Matches.length} subheadings found).`
      : `Your text has ${wordCount} words but no H2/H3 subheadings. Add subheadings to break content.`,
    targetField: 'content',
  });

  // --------------------------------------------------------------------------
  // 3. ADDITIONAL SEO CHECKS (Rank Math "Additional" Tab)
  // --------------------------------------------------------------------------

  // Check 15: Focus Keyword as first word in URL
  const firstWordInSlug = slug.split('-')[0] || '';
  const kwFirstWord = focusKeyword ? focusKeyword.startsWith(firstWordInSlug) : false;
  checks.push({
    id: 'kw-first-in-url',
    category: 'additional',
    label: 'Focus Keyword near Start of URL',
    passed: kwFirstWord,
    details: kwFirstWord
      ? `URL slug starts with focus keyword.`
      : `Consider placing the focus keyword closer to the start of the URL.`,
    targetField: 'slug',
  });

  // Check 16: Title has Power/Emotional/Positive Word
  const powerWords = [
    'proven', 'best', 'effective', 'essential', 'ultimate', 'guaranteed',
    'easy', 'step-by-step', 'powerful', 'secret', 'complete', 'vital',
    'top', 'master', 'expert', 'free', 'quick', 'incredible', 'simple'
  ];
  const titleHasPower = powerWords.some(pw => seoTitle.toLowerCase().includes(pw));
  checks.push({
    id: 'title-power-word',
    category: 'additional',
    label: 'Power / Sentiment Word in Title',
    passed: titleHasPower,
    details: titleHasPower
      ? `Title contains compelling click-worthy word.`
      : `Add a power word (e.g. "Proven", "Ultimate", "Step-by-Step", "Best") to boost CTR.`,
    targetField: 'seoTitle',
  });

  // Check 17: Title has Number
  const titleHasNum = /\b\d+\b/.test(seoTitle);
  checks.push({
    id: 'title-has-number',
    category: 'additional',
    label: 'Title contains a Number',
    passed: titleHasNum,
    details: titleHasNum
      ? `Title includes a number, which significantly improves search CTR.`
      : `Adding a number to your title (e.g. "7 Tips", "2026 Guide") boosts click-through rate.`,
    targetField: 'seoTitle',
  });

  // --------------------------------------------------------------------------
  // CALCULATE OVERALL SCORE OUT OF 100
  // --------------------------------------------------------------------------
  const basicChecks = checks.filter(c => c.category === 'basic');
  const readabilityChecks = checks.filter(c => c.category === 'readability');
  const additionalChecks = checks.filter(c => c.category === 'additional');

  const calcGroupScore = (group: CheckItem[]) => {
    let score = 0;
    group.forEach(c => {
      if (c.passed) score += 1;
      else if (c.warning) score += 0.5;
    });
    return group.length > 0 ? (score / group.length) : 0;
  };

  // Weighted score: Basic 60%, Readability 25%, Additional 15%
  const basicScoreNorm = calcGroupScore(basicChecks);
  const readabilityScoreNorm = calcGroupScore(readabilityChecks);
  const additionalScoreNorm = calcGroupScore(additionalChecks);

  const rawFinalScore = (basicScoreNorm * 60) + (readabilityScoreNorm * 25) + (additionalScoreNorm * 15);
  const finalScore = Math.min(100, Math.max(0, Math.round(rawFinalScore)));

  let scoreColor: 'red' | 'orange' | 'green' = 'red';
  if (finalScore >= 80) scoreColor = 'green';
  else if (finalScore >= 50) scoreColor = 'orange';

  return {
    score: finalScore,
    scoreColor,
    wordCount,
    keywordDensity,
    keywordCount,
    checks,
    basicPassedCount: basicChecks.filter(c => c.passed).length,
    basicTotalCount: basicChecks.length,
    readabilityPassedCount: readabilityChecks.filter(c => c.passed).length,
    readabilityTotalCount: readabilityChecks.length,
    additionalPassedCount: additionalChecks.filter(c => c.passed).length,
    additionalTotalCount: additionalChecks.length,
  };
}
