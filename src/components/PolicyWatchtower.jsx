import React, { useState } from 'react';
import { Archive, Eye, Bell } from "lucide-react";

// This is a small, self-contained helper component for the section title.
function SectionHeader({ icon, title, children }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
            {children}
        </div>
    );
}

export default function PolicyWatchtower({ pendingUpdates, archivedUpdates, monitoredTrends, onViewUpdate }) {
    const [activeTab, setActiveTab] = useState('pending');

    const TabButton = ({ tabName, label, count }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
                activeTab === tabName
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
            }`}
        >
            {label} {count > 0 && <span className={`ml-2 inline-block px-2 py-0.5 text-xs font-bold rounded-full ${activeTab === tabName ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-200'}`}>{count}</span>}
        </button>
    );

    const renderUpdateItem = (item, isPending = false) => (
        <div key={item.id} className="p-4 bg-gray-700 rounded-lg flex items-center justify-between shadow-md gap-4">
            <div className="flex-grow">
                <p className={`font-semibold ${isPending ? 'text-white' : 'text-gray-300'}`}>{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">
                    Date Identified: {item.date}
                    {item.type === 'Immediate Action Required' && <span className="ml-2 font-bold text-red-400">URGENT</span>}
                </p>
            </div>
            {isPending && (
                <button
                    onClick={() => onViewUpdate(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-transform transform hover:scale-105"
                >
                    <Eye size={16} />
                    Review
                </button>
            )}
        </div>
    );

    const renderContent = () => {
        let items;
        let isPending = false;
        switch (activeTab) {
            case 'pending':
                items = pendingUpdates;
                isPending = true;
                break;
            case 'archived':
                items = archivedUpdates;
                break;
            case 'monitored':
                items = monitoredTrends;
                break;
            default:
                items = [];
        }

        return items.length > 0
            ? items.map(item => renderUpdateItem(item, isPending))
            : <p className="text-center text-gray-400 py-8">No items in this category.</p>;
    };

    return (
        <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64", color: "#fff" }}>
            <div className="p-6">
                {/* --- RENAMED THIS TITLE --- */}
                <SectionHeader icon={<Bell className="text-[#faecc4]" size={28} />} title="IQ Handbook Watchtower" />
                <p className="mb-6 text-gray-300">Proactive identification of current industry legislation and trends that are analyzed for their impact on your handbook. Review alerts that require your attention.</p>
                
                <div className="flex border-b border-gray-600 mb-4">
                    <TabButton tabName="pending" label="Actionable Alerts" count={pendingUpdates.length} />
                    <TabButton tabName="archived" label="Archived" count={archivedUpdates.length} />
                    <TabButton tabName="monitored" label="Monitored Alerts" count={monitoredTrends.length} />
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
