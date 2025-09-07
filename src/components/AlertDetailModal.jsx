import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

// This is a simple markdown parser to handle bold text (**text**)
function SimpleMarkdown({ text }) {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

export default function AlertDetailModal({ alert, onClose }) {
  if (!alert) return null;

  const getStatusPill = (type) => {
    switch (type) {
      case 'Immediate Action Required':
        return <span className="px-3 py-1 text-sm font-semibold text-red-800 bg-red-200 rounded-full">{type}</span>;
      default:
        return <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full">{type}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full border-t-8 border-blue-600 flex flex-col max-h-[90vh]">
        <div className="flex-shrink-0">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-blue-600" />
              Alert Details
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{alert.title}</h3>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Status:</span>
              {getStatusPill(alert.type)}
            </div>
            {alert.rationale && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Impact Analysis</h4>
                <p className="text-gray-700 text-sm">{alert.rationale}</p>
              </div>
            )}
          </div>
        </div>

        {/* This new section will display the full article text */}
        {alert.sourceText && (
          <div className="mt-4 pt-4 border-t flex-grow overflow-y-auto">
            <h4 className="font-semibold text-gray-800 mb-2">Source Text</h4>
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap font-mono">
              <SimpleMarkdown text={alert.sourceText} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
