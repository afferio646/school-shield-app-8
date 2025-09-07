import React, { useState, useCallback } from 'react';
import { BookOpen, Calendar, Search, AlertCircle, TrendingUp } from "lucide-react";

import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';

// Helper component for search result highlighting (moved from App.jsx)
function HighlightedText({ text, highlight }) {
    if (!highlight || !text) {
        return <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>;
    }
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <p className="text-sm leading-relaxed whitespace-pre-line">
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-yellow-300 font-bold text-black px-1 rounded">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </p>
    );
}

// Full code for the Audit Card is kept here for stability
function HandbookAuditCard() {
    // ... (full code for HandbookAuditCard remains here)
    return (
        <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
            <div className="p-6 text-white">
                <h2 className="text-xl font-bold text-white mb-4">IQ Handbook Audit</h2>
                <div className="space-y-3 text-gray-200">
                    <p className="font-semibold">"Comprehensive Handbook Intelligence Audit - Ensuring Policy Excellence & Legal Compliance"</p>
                    {/* ... other text ... */}
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                    <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800">Audit Quarterly</button>
                    <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800">Audit Annually</button>
                    <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800">Our 6-Stage Audit Process</button>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
    );
}

export default function Handbook({
    handbookContent,
    onSectionLinkClick, // We now need this prop for vulnerability links
    pendingUpdates,
    archivedUpdates,
    monitoredTrends,
    onViewUpdate,
    onViewAlertDetail,
    apiKey,
    HandbookVulnerabilitiesCardComponent
}) {
    // RESTORED: State for the component's functionality
    const [selectedSection, setSelectedSection] = useState("1. Introduction");
    const [isSectionLanguageOpen, setIsSectionLanguageOpen] = useState(false);
    const [handbookTopicQuery, setHandbookTopicQuery] = useState("");
    const [handbookTopicResults, setHandbookTopicResults] = useState(null);
    const [isAnalyzingTopic, setIsAnalyzingTopic] = useState(false);

    // RESTORED: Handler for the topic search
    const handleTopicSearch = () => {
        if (!handbookTopicQuery) return;
        setIsAnalyzingTopic(true);
        setHandbookTopicResults(null);
        setTimeout(() => {
            const query = handbookTopicQuery.toLowerCase();
            const results = [];
            for (const sectionTitle in handbookContent) {
                const sectionText = handbookContent[sectionTitle];
                if (sectionText.toLowerCase().includes(query)) {
                    results.push({
                        mainTitle: sectionTitle,
                        subsections: [sectionText.trim()],
                    });
                }
            }
            setHandbookTopicResults(results);
            setIsAnalyzingTopic(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <PolicyWatchtower
                pendingUpdates={pendingUpdates}
                archivedUpdates={archivedUpdates}
                monitoredTrends={monitoredTrends}
                onViewUpdate={onViewUpdate}
                onViewAlertDetail={onViewAlertDetail} 
            />

            {/* RESTORED: Full functionality of the Section Review card */}
            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6 text-white">
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="Handbook Section Review" />
                    
                    <h3 className="text-lg font-bold mb-2 text-[#faecc4]">1. Review by Section</h3>
                    <label className="block font-medium mb-1 text-gray-200">Select Section</label>
                    <select
                        className="block w-full border rounded p-2 shadow text-black mb-4"
                        value={selectedSection}
                        onChange={e => {
                            setSelectedSection(e.target.value);
                            setIsSectionLanguageOpen(true);
                        }}
                    >
                        {Object.keys(handbookContent).map((sectionTitle) => (
                            <option key={sectionTitle} value={sectionTitle}>{sectionTitle}</option>
                        ))}
                    </select>
                    
                    <button className="text-md font-bold text-[#faecc4] cursor-pointer focus:outline-none" onClick={() => setIsSectionLanguageOpen(open => !open)}>
                        {selectedSection.split('. ').slice(1).join('. ')}
                        <span className="ml-2 text-xs font-normal text-gray-300">(Click to show/hide full Handbook Section language)</span>
                    </button>

                    {isSectionLanguageOpen && (
                        <div className="bg-gray-800 p-4 rounded-lg mt-2 shadow-inner border border-gray-700 whitespace-pre-line text-gray-200" style={{ maxHeight: "320px", overflowY: "auto" }}>
                            {handbookContent[selectedSection] || "Language not available."}
                        </div>
                    )}

                    <h3 className="text-lg font-bold mt-8 mb-2 text-[#faecc4]">2. Search Handbook by Topic</h3>
                    <p className="text-gray-300 mb-2">Enter a topic to find relevant language in the handbook.</p>
                    <textarea
                        className="w-full min-h-[80px] p-2 rounded-md text-black"
                        placeholder="e.g., Confidentiality, Remote Work, Discipline..."
                        value={handbookTopicQuery}
                        onChange={(e) => setHandbookTopicQuery(e.target.value)}
                    />
                    <button
                        onClick={handleTopicSearch}
                        disabled={isAnalyzingTopic}
                        className="bg-blue-700 text-white font-semibold px-5 py-2 mt-2 rounded-lg shadow hover:bg-blue-800 disabled:bg-gray-500"
                    >
                        {isAnalyzingTopic ? 'Analyzing...' : 'Analyze Handbook'}
                    </button>

                    {handbookTopicResults && (
                        <div className="mt-4">
                            <h4 className="font-semibold text-lg">Search Results for "{handbookTopicQuery}"</h4>
                            {handbookTopicResults.length > 0 ? (
                                handbookTopicResults.map((result, i) => (
                                    <div key={i} className="mt-2 p-3 bg-gray-700 rounded-lg">
                                        <h5 className="font-bold text-blue-300">{result.mainTitle}</h5>
                                        {result.subsections.map((sub, j) => (
                                            <div key={j} className="mt-1 border-t border-gray-600 pt-1">
                                                <HighlightedText text={sub} highlight={handbookTopicQuery} />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : <p className="mt-2 text-gray-400">No results found.</p>}
                        </div>
                    )}
                </div>
            </div>
            
            {/* REORDERED: The cards are now in the desired order */}
            <HandbookVulnerabilitiesCardComponent onSectionLinkClick={onSectionLinkClick} />
            <HandbookComparisonCard apiKey={apiKey} />
            <HandbookAuditCard /> 
        </div>
    );
}
