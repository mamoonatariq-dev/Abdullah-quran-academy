export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  icon: string;
  ageRange: string;
  duration: string;
  tutors: string;
  pricePerMonth?: string;
  description: string;
  learningOutcomes: string[];
  modules: {
    title: string;
    description: string;
    topics: string[];
  }[];
  whoIsThisFor: string[];
  prerequisites: string;
  scheduleOptions: string[];
}

export const coursesData: CourseDetail[] = [
  {
    id: 'noorani-qaida',
    slug: 'courses/noorani-qaida',
    title: 'Noorani Qaida Course for Beginners & Kids',
    tagline: 'Master the Arabic alphabet, pronunciation, and basic joining rules from ground zero.',
    category: 'Foundation',
    badge: 'Beginner Essential',
    icon: '📖',
    ageRange: 'Ages 8+ and adult sisters',
    duration: '2 to 4 months (customized pace)',
    tutors: 'Certified Female Qaida Specialists',
    pricePerMonth: 'Flexible 1-on-1 Schedule',
    description:
      'The Noorani Qaida is the gold standard foundation for reading the Holy Quran. Our patient female tutors guide beginners step-by-step through letter recognition, articulation points, compound letters, and short vowels.',
    learningOutcomes: [
      'Identify all 29 individual Arabic letters with accurate Makharij',
      'Recognize compound letters (Murakkabat) in various joined forms',
      'Master short vowels: Fatha (Zabar), Kasra (Zair), and Damma (Paish)',
      'Apply Tanween, Sukoon, Jazm, and Tashdeed correctly',
      'Transition smoothly to reading words and full Quranic verses',
    ],
    modules: [
      {
        title: 'Module 1: Single Arabic Letters (Huroof Mufradat)',
        description: 'Learning the 29 letters of the Arabic alphabet with their correct articulation points.',
        topics: ['Letter sounds & recognition', 'Differences between similar-sounding letters', 'Basic Makharij'],
      },
      {
        title: 'Module 2: Compound Letters (Huroof Murakkabat)',
        description: 'Understanding how Arabic letters connect at the beginning, middle, and end of words.',
        topics: ['Two-letter compounds', 'Three-letter combinations', 'Isolated vs. joined shapes'],
      },
      {
        title: 'Module 3: Harakat & Tanween (Vowels & Double Vowels)',
        description: 'Pronouncing short vowel sounds without stretching or jerking.',
        topics: ['Fatha, Kasra, Damma', 'Two Fathas, two Kasras, two Dammas', 'Pronunciation of Noon sounds in Tanween'],
      },
      {
        title: 'Module 4: Sukoon, Tashdeed & Maddah Foundations',
        description: 'Advanced Qaida exercises preparing students for the Holy Quran.',
        topics: ['Jazm / Sukoon rules', 'Shaddah (doubled consonants)', 'Connecting words with fluency'],
      },
    ],
    whoIsThisFor: [
      'Children (ages 8+) taking their foundational steps in Quran reading',
      'Sisters and female beginners who have never learned Arabic before',
      'Reverts seeking a gentle, patient, step-by-step learning atmosphere',
    ],
    prerequisites: 'No prior Arabic knowledge required.',
    scheduleOptions: ['2 days/week', '3 days/week', '5 days/week', 'Weekend only'],
  },
  {
    id: 'quran-reading',
    slug: 'courses/quran-reading',
    title: 'Online Quran Reading',
    tagline: 'Achieve effortless, fluent recitation directly from the Holy Mushaf with confidence.',
    category: 'Fluency',
    badge: 'Most Enrolled',
    icon: '🕋',
    ageRange: 'Kids, Girls & Sisters',
    duration: '6 to 12 months (complete Mushaf)',
    tutors: 'Certified Female Quran Tutors',
    pricePerMonth: 'Flexible 1-on-1 Schedule',
    description:
      'Designed for students who know basic Arabic letters and want to read the Holy Quran fluently without hesitation. Daily one-on-one sessions with live teacher feedback.',
    learningOutcomes: [
      'Recite the Holy Quran fluently directly from any Surah',
      'Recognize Quranic calligraphy styles and stop symbols',
      'Eliminate hesitation, stammering, and mispronunciations',
      'Develop a natural, pleasant recitation rhythm and proper breathing control',
      'Complete reading the entire 30 Juz under teacher supervision',
    ],
    modules: [
      {
        title: 'Module 1: Juz 30 (Juz Amma) Recitation',
        description: 'Short Surahs to build immediate confidence and cadence.',
        topics: ['Surah An-Nas to Surah An-Naba', 'Word-by-word correction', 'Stopping and breathing exercises'],
      },
      {
        title: 'Module 2: Juz 1 to 10 (Foundational Mushaf Flow)',
        description: 'Longer Surahs with varied sentence structures and historical narratives.',
        topics: ['Surah Al-Baqarah to Surah At-Tawbah', 'Connecting verses fluently', 'Rhythmic pacing'],
      },
      {
        title: 'Module 3: Juz 11 to 20 (Intermediate Recitation)',
        description: 'Expanding stamina, Tajweed consistency, and melodic recitation.',
        topics: ['Surah Yunus to Surah Al-Anbiya', 'Handling complex compound words', 'Correct pausing rules'],
      },
      {
        title: 'Module 4: Juz 21 to 29 (Advanced Fluency & Khatm Preparation)',
        description: 'Mastery of complete Mushaf recitation towards Quran Khatm certificate.',
        topics: ['Final Juz recitation', 'Recitation without hesitation', 'Preparation for Tajweed certificate'],
      },
    ],
    whoIsThisFor: [
      'Students who completed Noorani Qaida but struggle with smooth Mushaf reading',
      'Busy sisters looking to reconnect with the Holy Quran during mornings, evenings or weekends',
      'Parents wanting their daughters and sons to finish Quran Khatm with qualified female tutors',
    ],
    prerequisites: 'Completion of Noorani Qaida or basic letter-reading ability.',
    scheduleOptions: ['2 days/week', '3 days/week', '5 days/week', 'Weekend only'],
  },
  {
    id: 'tajweed-rules',
    slug: 'courses/tajweed-rules',
    title: 'Learn Quran with Tajweed & Higher Level of Tajweed',
    tagline: 'Recite with the exact beauty, precision, and rules revealed to the Prophet (PBUH).',
    category: 'Mastery',
    badge: 'Classical Curriculum',
    icon: '✨',
    ageRange: 'Kids, Sisters & Female Students',
    duration: '4 to 6 months',
    tutors: 'Certified Female Tajweed Scholars & Ijazah Holders',
    pricePerMonth: 'Flexible 1-on-1 Schedule',
    description:
      'Master foundational and higher level Tajweed based on Umm Abdullah’s renowned 95-page classical guide "Al-Qawl al-Mufeed fi Qawa‘id at-Tajweed". Covers all 17 Makharij, Sifaat, Noon/Meem Saakinah, Madd, and Waqf symbols.',
    learningOutcomes: [
      'Articulate all 17 Makharij al-Huroof from the throat, tongue, lips, and nasal cavity',
      'Differentiate permanent characteristics (Sifaat Lazimah) with and without opposites',
      'Apply the 4 rules of Noon Saakinah and Tanween: Izhar, Idgham, Iqlab, Ikhfa',
      'Master all types of Madd (Natural, Obligatory, Permissible, and Madd Lazim 6 counts)',
      'Recognize all Mushaf stopping symbols (مـ, ط, ج, صلے, قلے, لا, سكتة)',
    ],
    modules: [
      {
        title: 'Module 1: Makharij al-Huroof (17 Articulation Points)',
        description: 'In-depth study of the throat (Halq), tongue (Lisan), lips (Shafatain), and nasal cavity (Khaishoom).',
        topics: ['Throat letters (ء هـ ع ح غ خ)', 'Deep tongue letters (ق ك)', 'Edges and tip of the tongue (ض ل ن ر)'],
      },
      {
        title: 'Module 2: Sifaat al-Huroof (Letter Characteristics)',
        description: 'Permanent and temporary attributes that distinguish Arabic letters.',
        topics: ['Hams vs. Jahr (Airflow)', 'Shiddah vs. Rakhawah (Sound blockage)', 'Isti‘la vs. Istifal (Heavy vs. Light)', 'Qalqalah'],
      },
      {
        title: 'Module 3: Noon Saakinah, Meem Saakinah & Ghunnah',
        description: 'The core practical rules applied in almost every Quranic verse.',
        topics: ['Izhar Halqi', 'Idgham with and without Ghunnah', 'Iqlab into Meem', 'Ikhfa Haqiqi with 15 letters'],
      },
      {
        title: 'Module 4: Rules of Madd (Lengthening) & Waqf (Stopping)',
        description: 'Higher level Tajweed rules of elongation counts and pausing points.',
        topics: ['Madd Tabi‘i (2 counts)', 'Madd Muttasil & Munfasil (4–5 counts)', 'Madd Lazim (6 counts)', 'Rules of stopping (Waqf)'],
      },
    ],
    whoIsThisFor: [
      'Anyone seeking to purify their recitation and avoid hidden mistakes (Lahn Khafi)',
      'Female students seeking specialized female Tajweed tutors',
      'Advanced students aiming for Tajweed Ijazah and Qirat perfection',
    ],
    prerequisites: 'Ability to read Quran at a basic level.',
    scheduleOptions: ['2 days/week', '3 days/week', '5 days/week', 'Weekend only'],
  },
  {
    id: 'quran-hifz',
    slug: 'courses/quran-hifz',
    title: 'Online Quran Hifdh Program (Systematic Memorization)',
    tagline: 'Structured, daily one-to-one memorization with proven Sabaq, Sabqi, and Manzil methods.',
    category: 'Memorization',
    badge: 'Intensive Track',
    icon: '🧠',
    ageRange: 'Kids (8+) and dedicated sisters',
    duration: 'Flexible (Part-time or Full 30 Juz)',
    tutors: 'Certified Female Hafizaat with Sanad',
    pricePerMonth: 'Flexible 1-on-1 Schedule',
    description:
      'Memorize the Holy Quran systematically with experienced female Hafizaat tutors. Whether your goal is memorizing select Surahs (Yaseen, Mulk, Rahman, Kahf) or the complete Mushaf, our 3-tier revision system guarantees retention.',
    learningOutcomes: [
      'Memorize verses with accurate Tajweed and zero phonetic errors',
      'Retain memorized Surahs permanently through daily structured Sabqi and Manzil revision',
      'Build mental stamina, discipline, and daily spiritual consistency',
      'Receive official Hifdh completion certificate and graduation recognition',
    ],
    modules: [
      {
        title: 'Pillar 1: Sabaq (Daily New Lesson)',
        description: 'Memorizing new Ayahs under the live supervision and correction of your teacher.',
        topics: ['Pre-listening to recitation', 'Pronunciation verification', 'Word association techniques'],
      },
      {
        title: 'Pillar 2: Sabqi (Recent Revision)',
        description: 'Daily recitation of the last 5 to 10 pages memorized.',
        topics: ['Cementing short-term memory', 'Connecting end-of-page verses', 'Surah flow testing'],
      },
      {
        title: 'Pillar 3: Manzil (Long-Term Retention)',
        description: 'Rotating review of previously completed Juz to prevent forgetting.',
        topics: ['Quarter Juz to full Juz daily testing', 'Mutashabihat (similar verses) guidance', 'Self-evaluation logs'],
      },
    ],
    whoIsThisFor: [
      'Children and girls eager to become Hafiza-e-Quran alongside their UK school education',
      'Sisters wishing to memorize Surah Al-Baqarah, Surah Al-Kahf, Juz Amma, or the full Quran',
      'Existing Hafizaat needing a rigorous revision coach to polish their retention',
    ],
    prerequisites: 'Fluent Quran reading with basic Tajweed.',
    scheduleOptions: ['3 days/week', '4 days/week', '5 days/week'],
  },
  {
    id: 'translation-tafseer',
    slug: 'courses/translation-tafseer',
    title: 'Quran Translation & Tafseer Course (Understanding Quran)',
    tagline: 'Uncover the divine wisdom, historical revelation context, and practical guidance of Allah’s words.',
    category: 'Understanding',
    badge: 'Intellectual & Spiritual',
    icon: '💡',
    ageRange: 'Girls (10+) and Adult Sisters',
    duration: '6 to 12 months per level',
    tutors: 'Qualified Female Alimahs & Islamic Scholars',
    pricePerMonth: 'Flexible 1-on-1 Schedule',
    description:
      'Move beyond recitation to true understanding. This course teaches word-by-word Arabic vocabulary, grammatical roots, Asbab an-Nuzul (reasons for revelation), and classical commentaries (Ibn Kathir, Al-Jalalayn, Ma‘ariful Quran).',
    learningOutcomes: [
      'Understand the word-by-word meaning of frequent Quranic vocabulary',
      'Grasp the historical background and circumstances of revelation (Asbab an-Nuzul)',
      'Extract daily moral, spiritual, and contemporary ethical lessons',
      'Experience deep Khushoo in Salah through knowing what you recite',
    ],
    modules: [
      {
        title: 'Module 1: Quranic Vocabulary & Grammatical Roots',
        description: 'Understanding the 80% most frequent words occurring in the Holy Quran.',
        topics: ['Root letter system (3-letter roots)', 'Nouns, verbs, and particles', 'Common phrases'],
      },
      {
        title: 'Module 2: Tafseer of Short Surahs (Juz 30)',
        description: 'Deep dive into the Surahs recited daily in five daily prayers.',
        topics: ['Surah Al-Fatiha detailed Tafseer', 'Themes of the Day of Judgment', 'Tawheed & Prophethood'],
      },
      {
        title: 'Module 3: Tafseer of Major Surahs',
        description: 'Study of Surah Al-Baqarah, Surah Al-Kahf, Surah Yaseen, and Surah Al-Mulk.',
        topics: ['Stories of the Prophets', 'Divine commands & prohibitions', 'Spiritual medicine for the heart'],
      },
    ],
    whoIsThisFor: [
      'Sisters and students who read Quran regularly and yearn to understand what they recite',
      'University students and mothers seeking authentic Islamic knowledge',
      'Anyone wanting to experience greater focus and Khushoo in their daily Salah',
    ],
    prerequisites: 'Ability to read Quran.',
    scheduleOptions: ['2 days/week', '3 days/week', 'Weekend only'],
  },
];
