import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import ExpandableOption from './ExpandableOption.jsx';

function SectionHeader({ icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
    );
}

export default function HandbookComparisonCard({ apiKey }) {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedLanguage, setSuggestedLanguage] = useState(null);
    const [openOptions, setOpenOptions] = useState({
        ts: true,
        h1: true,
        h2: true
    });

    const handleOptionToggle = (key) => {
        setOpenOptions(prev => ({...prev, [key]: !prev[key]}));
    };

    const comparisonTopics = {
        socialMedia: {
            name: "Employee Social Media & Digital Conduct",
            ts: `8.3 Technology Acceptable Use Policy...`,
            h1: `Social Media Policy...`,
            h2: `Social Networking...`,
            analysis: {
                gap: "TS's policy is outdated...",
                risk: "This ambiguity creates a significant liability risk...",
                benchmark: "The language in H1 and H2... aligns with recommendations from the National Association of Independent Schools (NAIS)..."
            },
            recommendations: [
                "**Immediate Action:** Issue a formal memo...",
                "**Short-Term Goal (30-60 days):** Draft and approve new language...",
                "**Long-Term Strategy:** Include a mandatory 20-minute training module..."
            ],
            suggestedLanguage: `To ensure professional boundaries are maintained...`
        },
        harassment: {
            name: "Harassment Policy & Reporting Procedures",
            ts: `2.4 Non-Discrimination and Harassment...`,
            h1: `Employee Policy against Harassment...`,
            h2: `Policy against Harassment...`,
            analysis: {
                gap: "TS's policy provides direct reporting channels but lacks an anonymous or confidential reporting mechanism...",
                risk: "Without an anonymous channel, the school may not learn of serious issues until they escalate significantly...",
                benchmark: "Many institutions now provide multiple reporting avenues..."
            },
            recommendations: [
                "**Immediate Action:** Designate a secondary administrator...",
                "**Short-Term Goal (30-60 days):** Research and implement a low-cost anonymous reporting system...",
                "**Long-Term Strategy:** Update the handbook to explicitly include the new anonymous reporting channel..."
            ],
            suggestedLanguage: `In addition to reporting concerns to a supervisor or the Head of School...`
        }
    };

    const handleAnalyze = () => {
        if (!selectedTopic) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setSuggestedLanguage(null);
        setTimeout(() => {
            const topicData = comparisonTopics[selectedTopic];
            setAnalysisResult(topicData);
            setIsAnalyzing(false);
        }, 1000);
    };
    
    const handleSuggestChange = () => {
        if (!analysisResult) return;
        setIsSuggesting(true);
        setTimeout(() => {
            setSuggestedLanguage(analysisResult.suggestedLanguage);
            setIsSuggesting(false);
        }, 1000);
    };

    const handleClose = () => {
        setAnalysisResult(null);
        setSelectedTopic("");
        setSuggestedLanguage(null);
    };

    return (
        <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
            <div className="p-6 text-white">
                <SectionHeader icon={<Scale className="text-[#faecc4]" size={26} />} title="IQ Handbook Comparison" />
                
                <div className="space-y-2 text-gray-200">
                    <p>Compare your current handbook to others based on specific queries.</p>
                    <div>
                        <label htmlFor="handbookQuery" className="block font-medium mb-1">Select a Topic to Analyze</label>
                        <select id="handbookQuery" className="w-full p-2 rounded-md text-black" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} disabled={!!analysisResult}>
                            <option value="">-- Select a Topic --</option>
                            {Object.entries(comparisonTopics).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-4 pt-2">
                        {!analysisResult ? (
                            <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800" onClick={handleAnalyze} disabled={isAnalyzing || !selectedTopic}>
                                {isAnalyzing ? "Analyzing..." : "Analyze"}
                            </button>
                        ) : (
                            <button className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-700" onClick={handleClose}>
                                Close Analysis
                            </button>
                        )}
                    </div>
                </div>

                {analysisResult && (
                    <div className="mt-6 border-t border-gray-500 pt-4 space-y-4">
                        <ExpandableOption title="Your Current Handbook (TS)" isOpen={openOptions.ts} onToggle={() => handleOptionToggle('ts')}>
                             <p className="text-blue-200 p-3 rounded-md whitespace-pre-line bg-gray-900">{analysisResult.ts}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 1 (H1)" isOpen={openOptions.h1} onToggle={() => handleOptionToggle('h1')}>
                            {/* FIX: Text color changed for readability on a dark background */}
                            <p className="text-gray-200 bg-gray-700 p-3 rounded-md whitespace-pre-line">{analysisResult.h1}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 2 (H2)" isOpen={openOptions.h2} onToggle={() => handleOptionToggle('h2')}>
                            {/* FIX: Text color changed for readability on a dark background */}
                            <p className="text-gray-200 bg-gray-700 p-3 rounded-md whitespace-pre-line">{analysisResult.h2}</p>
                        </ExpandableOption>
                        
                        <div className="p-4 rounded-md bg-green-900 bg-opacity-40 border border-green-500">
                             <h4 className="font-bold text-lg text-green-300 mb-2">AI Analysis & Recommendations</h4>
                             <div className="space-y-3 text-white">
                                 {/* FIX: Added optional chaining (?.) to prevent crashes */}
                                 <p><strong>Policy Gap:</strong> {analysisResult.analysis?.gap}</p>
                                 <p><strong>Potential Risk:</strong> {analysisResult.analysis?.risk}</p>
                                 <p><strong>Industry Benchmark:</strong> {analysisResult.analysis?.benchmark}</p>
                                 <div className="border-t border-green-700 mt-3 pt-3">
                                     <h5 className="font-semibold text-green-200">Action Plan:</h5>
                                     <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                                         {analysisResult.recommendations?.map((rec, i) => <li key={i}>{rec}</li>)}
                                     </ul>
                                 </div>
                             </div>
                             {!suggestedLanguage && (
                                 <div className="mt-4">
                                     <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700" onClick={handleSuggestChange} disabled={isSuggesting}>
                                         {isSuggesting ? "Generating..." : "Generate Suggested Language"}
                                     </button>
                                 </div>
                             )}
                        </div>

                        {suggestedLanguage && (
                            <div className="p-4 rounded-md bg-yellow-900 bg-opacity-40 border-yellow-500">
                                <h4 className="font-bold text-lg text-yellow-300 mb-2">AI-Generated Language</h4>
                                <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-line italic">{suggestedLanguage}</div>
                                <div className="mt-4">
                                    <button className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-700" onClick={() => alert("This would add the language to the handbook in a live system.")}>
                                        Add to Handbook
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
