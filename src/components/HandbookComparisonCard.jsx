import React, { useState } from 'react';
import { Scale } from 'lucide-react'; // ADDED: Import the Scale icon
import ExpandableOption from './ExpandableOption.jsx';

// ADDED: The SectionHeader component for a consistent title style
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
        // (All your topic data remains unchanged)
        socialMedia: { name: "Employee Social Media & Digital Conduct", /* ... */ },
        harassment: { name: "Harassment Policy & Reporting Procedures", /* ... */ }
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
        // CHANGED: Standardized the background color for the main container
        <div className="shadow-2xl border-0 rounded-2xl" style={{ background: "#4B5C64" }}>
            <div className="p-6 text-white">
                {/* CHANGED: Replaced the simple h2 with the consistent SectionHeader */}
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
                            <p className="text-gray-800 bg-gray-100 p-3 rounded-md whitespace-pre-line">{analysisResult.h1}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 2 (H2)" isOpen={openOptions.h2} onToggle={() => handleOptionToggle('h2')}>
                            <p className="text-gray-800 bg-gray-100 p-3 rounded-md whitespace-pre-line">{analysisResult.h2}</p>
                        </ExpandableOption>
                        
                        <div className="p-4 rounded-md bg-green-900 bg-opacity-40 border border-green-500">
                             <h4 className="font-bold text-lg text-green-300 mb-2">AI Analysis & Recommendations</h4>
                             <div className="space-y-3 text-white">
                                 <p><strong>Policy Gap:</strong> {analysisResult.analysis.gap}</p>
                                 <p><strong>Potential Risk:</strong> {analysisResult.analysis.risk}</p>
                                 <p><strong>Industry Benchmark:</strong> {analysisResult.analysis.benchmark}</p>
                                 <div className="border-t border-green-700 mt-3 pt-3">
                                     <h5 className="font-semibold text-green-200">Action Plan:</h5>
                                     <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                                         {analysisResult.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
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
