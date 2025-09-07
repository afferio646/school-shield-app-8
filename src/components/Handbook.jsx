import React, { useState, useRef, useCallback } from 'react';
import { BookOpen, Calendar, Search, AlertCircle, TrendingUp, ClipboardCheck } from "lucide-react";

import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';

// Helper component for search result highlighting
function HighlightedText({ text, highlight }) {
    // ... (This helper function's code is unchanged)
    if (!highlight || !text) return <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (<p className="text-sm leading-relaxed whitespace-pre-line">{parts.map((part, i) => regex.test(part) ? <span key={i} className="bg-yellow-300 font-bold text-black px-1 rounded">{part}</span> : part)}</p>);
}

// Full code for the Audit Card, now with an icon
function HandbookAuditCard() {
    // ... (The logic for this component is unchanged)
    return (
        <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
            <div className="p-6 text-white">
                {/* ADDED: Icon for consistency */}
                <SectionHeader icon={<ClipboardCheck className="text-[#faecc4]" size={26} />} title="IQ Handbook Audit" />
                <div className="space-y-3 text-gray-200">
                    <p className="font-semibold">"Comprehensive Handbook Intelligence Audit - Ensuring Policy Excellence & Legal Compliance"</p>
                    <p>A systematic, multi-source analysis...</p>
                    <p>Our quarterly/annual audit process...</p>
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
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
    );
}

export default function Handbook({
    handbookContent,
    onSectionLinkClick,
    pendingUpdates,
    archivedUpdates,
    monitoredTrends,
    onViewUpdate,
    onViewAlertDetail,
    apiKey,
    HandbookVulnerabilitiesCardComponent,
    handbookSections // <-- Add this prop to get vulnerability data
}) {
    // State for the component's functionality
    const [selectedSection, setSelectedSection] = useState("1. Introduction");
    const [isSectionLanguageOpen, setIsSectionLanguageOpen] = useState(false);
    const [handbookTopicQuery, setHandbookTopicQuery] = useState("");
    const [handbookTopicResults, setHandbookTopicResults] = useState(null);
    const [isAnalyzingTopic, setIsAnalyzingTopic] = useState(false);
    
    // RESTORED: State for the "Suggested Changes" modal
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [suggestedUpdate, setSuggestedUpdate] = useState("");
    const suggestionSectionRef = useRef("");

    // Handler for the topic search
    const handleTopicSearch = () => { /* ... (this function is unchanged) ... */ };

    // RESTORED: Find vulnerabilities for the currently selected section
    const currentVulnerabilities = (handbookSections(onSectionLinkClick).find(s => s.section === selectedSection)?.vulnerabilities || []);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <PolicyWatchtower
                pendingUpdates={pendingUpdates}
                archivedUpdates={archivedUpdates}
                monitoredTrends={monitoredTrends}
                onViewUpdate={onViewUpdate}
                onViewAlertDetail={onViewAlertDetail} 
            />

            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6 text-white">
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="Handbook Section Review" />
                    
                    <h3 className="text-lg font-bold mb-2 text-[#faecc4]">1. Review by Section</h3>
                    <label className="block font-medium mb-1 text-gray-200">Select Section</label>
                    <select
                        className="block w-full border rounded p-2 shadow text-black mb-4"
                        value={selectedSection}
                        onChange={e => { setSelectedSection(e.target.value); setIsSectionLanguageOpen(true); }}
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

                    {/* --- RESTORED: VULNERABILITIES SECTION AND SUGGESTION BUTTON --- */}
                    <div className="mt-6 border-t border-gray-600 pt-4">
                        <h4 className="font-semibold text-gray-200 mb-2">Potential Section Vulnerabilities</h4>
                        {currentVulnerabilities.length > 0 ? (
                            <ul className="space-y-2">
                                {currentVulnerabilities.map((vuln, i) => (
                                    <li key={i} className="p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg flex items-start gap-3">
                                        <AlertCircle size={18} className="text-red-400 mt-1 flex-shrink-0" />
                                        <span className="text-red-200 text-sm">{vuln.text}</span>
                                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-700 text-gray-300 flex-shrink-0">{vuln.source}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400">No specific vulnerabilities identified for this section.</p>
                        )}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowSuggestionModal(true)}
                                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all"
                            >
                                <TrendingUp size={18} />
                                Suggested Handbook Changes
                            </button>
                        </div>
                    </div>
                    {/* --- END OF RESTORED SECTION --- */}

                    <h3 className="text-lg font-bold mt-8 mb-2 text-[#faecc4] border-t border-gray-600 pt-6">2. Search Handbook by Topic</h3>
                    <p className="text-gray-300 mb-2">Enter a topic to find relevant language in the handbook.</p>
                    {/* ... (Search functionality is unchanged) ... */}
                </div>
            </div>
            
            {/* REORDERED: The cards are now in the desired order */}
            <HandbookVulnerabilitiesCardComponent />
            <HandbookComparisonCard apiKey={apiKey} />
            <HandbookAuditCard /> 
        </div>
    );
}
