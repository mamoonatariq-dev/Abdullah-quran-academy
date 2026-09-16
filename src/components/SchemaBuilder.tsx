import React, { useState } from 'react';
import { SeoItem, SchemaType } from '../types';
import { generateJsonLd } from '../utils/schemaGenerator';
import { Code, Copy, Check, Info } from 'lucide-react';

interface SchemaBuilderProps {
  item: Partial<SeoItem>;
  onChange: (updatedFields: Partial<SeoItem>) => void;
}

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ item, onChange }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const schemaType = item.schemaType || 'Article';
  const fields = item.schemaFields || {};

  const handleTypeChange = (newType: SchemaType) => {
    onChange({
      schemaType: newType,
    });
  };

  const updateField = (key: string, value: any) => {
    onChange({
      schemaFields: {
        ...fields,
        [key]: value,
      },
    });
  };

  const jsonLdCode = generateJsonLd(item);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${jsonLdCode}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600" /> Schema Generator (JSON-LD)
          </h3>
          <p className="text-xs text-gray-500">
            Automatically output structured data to earn rich snippets in Google results.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
        >
          {showCode ? 'Hide JSON-LD Code' : 'View JSON-LD Code'}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Select Schema Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['Article', 'LocalBusiness', 'Service', 'FAQ', 'Product', 'Organization'] as SchemaType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                schemaType === type
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold shadow-2xs'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Fields per Schema Type */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 mb-4 space-y-3">
        {schemaType === 'Article' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Author Name</label>
              <input
                type="text"
                value={fields.author || ''}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="e.g. Ustadh Abdullah"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Publisher Name</label>
              <input
                type="text"
                value={fields.publisher || ''}
                onChange={(e) => updateField('publisher', e.target.value)}
                placeholder="e.g. Abdullah Quran Academy UK"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {schemaType === 'LocalBusiness' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={fields.businessName || ''}
                onChange={(e) => updateField('businessName', e.target.value)}
                placeholder="e.g. Abdullah Quran Academy UK"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={fields.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="e.g. +44 20 7946 0912"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                value={fields.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="e.g. 74 High Street, London, UK"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {schemaType === 'Service' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
              <input
                type="text"
                value={fields.serviceType || ''}
                onChange={(e) => updateField('serviceType', e.target.value)}
                placeholder="e.g. Online Tajweed & Quran Tutoring"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price Range / Offer</label>
              <input
                type="text"
                value={fields.priceRange || ''}
                onChange={(e) => updateField('priceRange', e.target.value)}
                placeholder="e.g. Flexible 1-on-1 Sessions"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {schemaType === 'Product' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
              <input
                type="text"
                value={fields.price || ''}
                onChange={(e) => updateField('price', e.target.value)}
                placeholder="e.g. 49.99"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
              <input
                type="text"
                value={fields.currency || 'GBP'}
                onChange={(e) => updateField('currency', e.target.value)}
                placeholder="GBP"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                value={fields.sku || ''}
                onChange={(e) => updateField('sku', e.target.value)}
                placeholder="SKU-1001"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {showCode && (
        <div className="mt-4 relative bg-gray-900 text-gray-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800 text-gray-400">
            <span>JSON-LD Output</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied script' : 'Copy Script Tag'}
            </button>
          </div>
          <pre className="text-emerald-400">
            {`<script type="application/ld+json">\n${jsonLdCode}\n</script>`}
          </pre>
        </div>
      )}
    </div>
  );
};
