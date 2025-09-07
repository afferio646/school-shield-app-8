import React, { useState, useRef } from 'react';
import { BookOpen, Search, AlertCircle, TrendingUp, ClipboardCheck } from "lucide-react";

import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';

// (Helper components like HighlightedText, HandbookAuditCard, and SectionHeader are unchanged)
function HighlightedText({ text, highlight }) { /* ... */ }
function HandbookAuditCard() { /* ... */ }
function SectionHeader({ icon, title }) { /* ... */ }


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
    handbookSections
}) {
    // FIX 1: The component now starts with no section selected.
    const [selectedSection, setSelectedSection] = useState("");
    const [isSectionLanguageOpen, setIsSectionLanguageOpen] = useState(false);
    
    // (The rest of the state and handlers are unchanged)
    const [handbookTopicQuery, setHandbookTopicQuery] = useState("");
    const [handbookTopicResults, setHandbookTopicResults] = useState(null);
    const [isAnalyzingTopic, setIsAnalyzingTopic] = useState(false);
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [suggestedUpdate, setSuggestedUpdate] = useState("...");
    const suggestionSectionRef = useRef("");
    const handleTopicSearch = () => { /* ... */ };
    
    const currentVulnerabilities = selectedSection ? (handbookSections(onSectionLinkClick).find(s => s.section === selectedSection)?.vulnerabilities || []) : [];

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
                    <label className="block font-medium mb-1 text-gray-200">Select Section to review the entire section language</label>
                    <select
                        className="block w-full border rounded p-2 shadow text-black mb-2"
                        value={selectedSection}
                        onChange={e => { setSelectedSection(e.target.value); setIsSectionLanguageOpen(true); }}
                    >
                        {/* FIX 2: Added a disabled placeholder option for the start. */}
                        <option value="" disabled>-- Select a Section to Review --</option>
                        {Object.keys(handbookContent).map((sectionTitle) => (
                            <option key={sectionTitle} value={sectionTitle}>{sectionTitle}</option>
                        ))}
                    </select>
                    
                    {isSectionLanguageOpen && selectedSection && (
                        <>
                            <div className="bg-gray-800 p-4 rounded-lg mt-4 shadow-inner border border-gray-700 whitespace-pre-line text-gray-200" style={{ maxHeight: "320px", overflowY: "auto" }}>
                                {handbookContent[selectedSection]}
                            </div>
                            <button 
                                className="text-sm font-semibold text-blue-300 hover:text-blue-200 mt-2" 
                                onClick={() => setIsSectionLanguageOpen(false)}
                            >
                                Close Section
                            </button>
                        </>
                    )}

                    {/* FIX 3: The entire "Vulnerabilities" section will now only appear AFTER a section has been selected. */}
                    {selectedSection && (
                        <div className="mt-6 border-t border-gray-600 pt-4">
                            <h4 className="font-semibold text-gray-200 mb-2">Potential Section Vulnerabilities</h4>
                            {currentVulnerabilities.length > 0 ? (
                                <ul className="space-y-2">
                                    {currentVulnerabilities.map((vuln, i) => (
                                        <li key={i} className="p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg flex items-start gap-3">
                                            <AlertCircle size={18} className="text-red-400 mt-1 flex-shrink-0" />
                                            <span className="text-white text-sm">{vuln.text}</span>
                                            <span className="ml-auto text-xs px-2 py-0-5 rounded-full font-semibold bg-gray-700 text-gray-300 flex-shrink-0">{vuln.source}</span>
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
                    )}

                    <div className="mt-8 border-t border-gray-600 pt-6">
                        <h3 className="text-lg font-bold mb-2 text-[#faecc4]">2. Search Handbook by Topic</h3>
                        {/* ... (The rest of the component is unchanged) ... */}
                    </div>
                </div>
            </div>
            
            <HandbookVulnerabilitiesCardComponent />
            <HandbookComparisonCard apiKey={apiKey} />
            <HandbookAuditCard /> 

            {showSuggestionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    {/* ... (Modal JSX is unchanged) ... */}
                </div>
            )}
        </div>
    );
}
