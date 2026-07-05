import React, { useState } from 'react';

const PREFIXES = [
  '',
  'Mr.',
  'Mrs.',
  'Mr. & Mrs.',
  'Family',
  'Dear',
  'Miss'
];

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const handleGenerate = () => {
    if (!guestName.trim()) {
      alert('Please enter a guest name');
      return;
    }

    const url = new URL(window.location.origin);
    url.searchParams.set('p', prefix);
    url.searchParams.set('n', guestName.trim());
    
    const link = url.toString();
    setGeneratedLink(link);

    const message = `Dear ${prefix ? prefix + ' ' : ''}${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

Pls Confirm your availability ❤️

With love,
❤️ Dhananjaya & Warsha`;
    
    setGeneratedMessage(message);
  };

  const copyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  const copyMessage = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      alert('Message copied to clipboard!');
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Wedding Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Select Prefix</label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {PREFIXES.map((p, idx) => (
                <option key={idx} value={p}>{p || '(No prefix)'}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. Sanjaya"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Generated Output</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-2 font-semibold">Message Preview:</p>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {generatedMessage}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyLink}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Copy Link Only
                </button>
                <button
                  onClick={copyMessage}
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
