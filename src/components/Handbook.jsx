import React from 'react';
import { BookOpen } from "lucide-react";

import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';

// Combining the AuditCard code directly into this file to avoid import errors.
function HandbookAuditCard() {
    // Assuming the logic for HandbookAuditCard is self-contained or its dependencies are met.
    // This is a simplified placeholder based on our last fix.
    return (
        <div className="shadow-2xl border-0 rounded-2xl mb-6" style={{ background: "#4B5C64" }}>
            <div className="p-6 text-white">
                <h2 className="text-xl font-bold">Handbook Audit</h2>
                <p className="mt-4">Our audit process identifies policy gaps, regulatory updates, and emerging compliance requirements.</p>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );
}

// NOTE: We've added onViewAlertDetail to the list of props this component receives.
export default function Handbook({
    handbookContent,
    selectedSection,
    setSelectedSection,
    isSectionLanguageOpen,
    setIsSectionLanguageOpen,
    pendingUpdates,
    archivedUpdates,
    monitoredTrends,
    onViewUpdate,
    onViewAlertDetail, // <-- Receiving the function from App.jsx
    apiKey,
    HandbookVulnerabilitiesCardComponent
}) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">

            <PolicyWatchtower
                pendingUpdates={pendingUpdates}
                archivedUpdates={archivedUpdates}
                monitoredTrends={monitoredTrends}
                onViewUpdate={onViewUpdate}
                // FIX: Pass the onViewAlertDetail prop down to the Watchtower
                onViewAlertDetail={onViewAlertDetail} 
            />

            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6" style={{ color: "#fff" }}>
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="IQ Handbook Center" />
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Select Section to Review</label>
                        <select
                            className="block w-full border rounded p-2 shadow text-black"
                            style={{ background: "#fff", border: "2px solid #faecc4" }}
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
                    </div>

                    {isSectionLanguageOpen && (
                        <div className="bg-slate-100 p-4 rounded-xl mb-4 shadow-inner border border-slate-200 whitespace-pre-line text-black" style={{ maxHeight: "320px", overflowY: "auto" }}>
                            {handbookContent[selectedSection] || "Language not available."}
                        </div>
                    )}
                </div>
            </div>
            
            <HandbookAuditCard /> 
            <HandbookComparisonCard apiKey={apiKey} />
            <HandbookVulnerabilitiesCardComponent />
        </div>
    );
}
