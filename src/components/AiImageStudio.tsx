import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Download, Copy, Check, Sliders, RefreshCw, Wand2, Info } from 'lucide-react';

interface AiImageStudioProps {
  initialPrompt?: string;
  onApplyImage?: (imageUrl: string) => void;
}

export const AiImageStudio: React.FC<AiImageStudioProps> = ({ initialPrompt = '', onApplyImage }) => {
  const [prompt, setPrompt] = useState(
    initialPrompt || 'Professional high-definition web banner for an online Quran and Tajweed academy with elegant typography and warm lighting, photorealistic'
  );
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3' | '9:16'>('16:9');
  const [editImageBase64, setEditImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          size,
          aspectRatio,
          editImageBase64,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Image generation failed');
      }

      setGeneratedImage(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setEditImageBase64(evt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyUrl = () => {
    if (!generatedImage) return;
    navigator.clipboard.writeText(generatedImage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> AI Image Generator & Studio
            </h2>
            <p className="text-xs text-gray-500">
              Create and edit custom high-resolution featured blog images and Open Graph banners using Gemini models.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full border border-indigo-200">
            gemini-3.1-flash-image
          </span>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          {/* Prompt input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Image Text Prompt / Edit Instructions
            </label>
            <textarea
              rows={3}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate or edit in detail..."
              className="w-full text-sm p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Config Controls Grid: Resolution Size & Aspect Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {/* Image Resolution Size (1K, 2K, 4K) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Resolution Size
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['1K', '2K', '4K'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all ${
                      size === s
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full text-xs p-2 bg-white border border-gray-300 rounded-lg font-medium"
              >
                <option value="16:9">16:9 (Blog Header / OG Banner)</option>
                <option value="1:1">1:1 (Square Profile)</option>
                <option value="4:3">4:3 (Standard Card)</option>
                <option value="9:16">9:16 (Vertical Mobile)</option>
              </select>
            </div>

            {/* Optional Edit Image Source */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Edit Existing Image (Optional)
              </label>
              <label className="block text-xs font-medium px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer text-center truncate">
                {editImageBase64 ? 'Image Uploaded ✓' : 'Upload Image to Edit'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {editImageBase64 && (
                <button
                  type="button"
                  onClick={() => setEditImageBase64(null)}
                  className="text-[10px] text-red-600 hover:underline mt-1 block"
                >
                  Clear uploaded image
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Generating {size} Image...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" /> Generate {size} Image
                </>
              )}
            </button>
          </div>
        </form>

        {/* Display Generated Result */}
        {generatedImage && (
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Generated {size} Image Result</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyUrl}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Data URL'}
                </button>

                {onApplyImage && (
                  <button
                    type="button"
                    onClick={() => onApplyImage(generatedImage)}
                    className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1"
                  >
                    Apply to Active Editor
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 flex items-center justify-center p-2">
              <img
                src={generatedImage}
                alt={prompt ? `AI Generated Quran Education Asset - ${prompt}` : "Gemini AI Generated Quran Educational Asset"}
                title={prompt || "AI Generated Quran Asset"}
                className="max-h-[450px] w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
