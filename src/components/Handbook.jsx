import React, { useState } from 'react';
import { BookOpen, Calendar } from "lucide-react";

import PolicyWatchtower from './PolicyWatchtower.jsx';
import HandbookComparisonCard from './HandbookComparisonCard.jsx';

// +++ START OF RESTORED HandbookAuditCard CODE +++
// This component now contains its full, original functionality.
function CalendarModal({ auditType, onClose }) {
    // This is a placeholder for your more detailed calendar modal
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-xl font-bold mb-4">Schedule {auditType} Audit</h3>
                <p>Your calendar scheduling component would appear here.</p>
                <button onClick={onClose} className="mt-6 px-4 py-2 bg-gray-200 text-black rounded-lg">Close</button>
            </div>
        </div>
    );
}

function HandbookAuditCard() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [auditType, setAuditType] = useState('');
    const [isProcessRevealed, setIsProcessRevealed] = useState(false);

    const openCalendar = (type) => {
        setAuditType(type);
        setShowCalendar(true);
    };

    const auditProcess = [
        { title: "Legislative Compliance Scan", details: "Real-time monitoring of federal, state, and local employment law changes. Cross-reference with NLRB, EEOC, DOL, and state agency updates. Automatic flagging of policies affected by new regulations." },
        { title: "Peer Benchmarking Analysis", details: "Comparison against current school handbooks in our database. Identification of emerging best practices and industry standards. Gap analysis highlighting areas where your policies may be outdated." },
        { title: "Legal Vulnerability Assessment", details: "Expert review by education law specialists. Risk scoring of ambiguous or potentially problematic language. Proactive identification of litigation exposure areas." },
        { title: "Policy Currency Review", details: "Line-by-line analysis of each handbook section. Dating and source verification of current policy language. Recommendations for modernization and clarity improvements." },
        { title: "Compliance Integration Check", details: "Alignment verification with Title IX, ADA, FMLA, and other federal mandates. State-specific requirement integration (varies by location). Board policy synchronization review." },
        { title: "Executive Summary & Action Plan", details: "Prioritized recommendations with implementation timelines. Draft policy language for immediate updates. Legal risk mitigation strategies." }
    ];

    return (
        <>
            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6 text-white">
                    {/* CHANGED: Title updated to include "IQ" */}
                    <h2 className="text-xl font-bold text-white mb-4">IQ Handbook Audit</h2>
                    {/* RESTORED: All descriptive text is back */}
                    <div className="space-y-3 text-gray-200">
                        <p className="font-semibold">"Comprehensive Handbook Intelligence Audit - Ensuring Policy Excellence & Legal Compliance"</p>
                        <p>A systematic, multi-source analysis of your school handbook leveraging industry-leading databases, federal & state legislative monitoring, peer benchmarking from multiple schools, and expert legal review.</p>
                        <p>Our quarterly/annual audit process identifies policy gaps, regulatory updates, and emerging compliance requirements to ensure your handbook remains current, legally sound, and aligned with best practices.</p>
                    </div>
                    {/* RESTORED: All buttons are back */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800" onClick={() => openCalendar('Quarterly')}>
                            Audit Quarterly
                        </button>
                        <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800" onClick={() => openCalendar('Annual')}>
                            Audit Annually
                        </button>
                        <button
                            className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800"
                            onClick={() => setIsProcessRevealed(!isProcessRevealed)}
                        >
                            {isProcessRevealed ? "Close Process" : "Our 6-Stage Audit Process"}
                        </button>
                    </div>
                    {isProcessRevealed && (
                        <div className="mt-6 text-white space-y-4 border-t border-gray-500 pt-4">
                            {auditProcess.map((item, index) => (
                                <div key={index}>
                                    <p><strong>{index + 1}. {item.title}.</strong></p>
                                    <p className="text-sm pl-4 text-gray-300">{item.details}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showCalendar && <CalendarModal auditType={auditType} onClose={() => setShowCalendar(false)} />}
        </>
    );
}
// +++ END OF RESTORED HandbookAuditCard CODE +++


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
    selectedSection,
    setSelectedSection,
    isSectionLanguageOpen,
    setIsSectionLanguageOpen,
    pendingUpdates,
    archivedUpdates,
    monitoredTrends,
    onViewUpdate,
    onViewAlertDetail,
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
                onViewAlertDetail={onViewAlertDetail} 
            />

            <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
                <div className="p-6 text-white">
                    {/* CHANGED: Title updated to be unique */}
                    <SectionHeader icon={<BookOpen className="text-[#faecc4]" size={26} />} title="Handbook Section Review" />
                    <div className="mb-2">
                        <label className="block font-medium mb-1 text-gray-200">Select Section to Review</label>
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
                        <div className="bg-gray-800 p-4 rounded-lg mt-4 shadow-inner border border-gray-700 whitespace-pre-line text-gray-200" style={{ maxHeight: "320px", overflowY: "auto" }}>
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
