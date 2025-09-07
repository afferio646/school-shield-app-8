import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

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
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full border-t-8 border-blue-600">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="text-blue-600" />
            Alert Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{alert.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Date Identified: {alert.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Status:</span>
            {getStatusPill(alert.type)}
          </div>
          {alert.rationale && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Rationale / Impact Analysis</h4>
              <p className="text-gray-700 whitespace-pre-line">{alert.rationale}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
