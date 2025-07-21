'use client'

const MaterialReport = ({ report }) => {
    // Check if report is JSON object or raw text
    const isJsonReport = report && typeof report === 'object' && !report.rawText;
    
    // Component for displaying material cards
    const MaterialCard = ({ material, category }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">{material.name}</h4>
            {material.brand && (
                <p className="text-sm text-blue-600 mb-2">Brand: {material.brand}</p>
            )}
            <p className="text-sm text-green-600 font-medium mb-2">{material.costPerUnit}</p>
            {material.benefits && (
                <div className="mb-2">
                    <p className="text-xs font-medium text-gray-600 mb-1">Benefits:</p>
                    <ul className="text-xs text-gray-600 list-disc ml-4">
                        {material.benefits.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                        ))}
                    </ul>
                </div>
            )}
            {material.isCodes && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {material.isCodes.map((code, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {code}
                        </span>
                    ))}
                </div>
            )}
            {material.monsoonResistance && (
                <p className="text-xs text-gray-600 mt-2">
                    Monsoon Resistance: <span className="font-medium">{material.monsoonResistance}</span>
                </p>
            )}
            {material.thermalRating && (
                <p className="text-xs text-gray-600 mt-2">
                    Thermal Rating: <span className="font-medium">{material.thermalRating}</span>
                </p>
            )}
        </div>
    );

    // Function to format the raw text report (fallback)
    const formatReport = (text) => {
        if (!text) return [];
        
        // Split by common section headers and format
        const sections = text.split(/(?=(?:\d+\.|##|###|\*\*))./)
            .filter(section => section.trim().length > 0)
            .map(section => section.trim());
        
        return sections;
    };

    if (isJsonReport) {
        return (
            <div className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="prose max-w-none pr-4">
                    {/* Header */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                            Professional Material Analysis Report (India)
                        </h3>
                        <p className="text-blue-700 text-sm">
                            This report has been generated based on your specific project requirements and Indian building standards (NBC 2016, IS Codes).
                        </p>
                    </div>

                    {/* Executive Summary */}
                    {report.executiveSummary && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Executive Summary
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">Total Cost</h4>
                                    <p className="text-xl font-bold text-green-700">
                                        {report.executiveSummary.totalCostEstimate}
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-800 mb-2">Timeline</h4>
                                    <p className="text-xl font-bold text-orange-700">
                                        {report.executiveSummary.timelineOverview}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-800 mb-2">Climate Suitability</h4>
                                    <p className="text-sm text-purple-700">
                                        {report.executiveSummary.climateSuitability}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Key Recommendations:</h4>
                                <ul className="list-disc ml-6 text-gray-700">
                                    {report.executiveSummary.keyRecommendations.map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Recommended Materials */}
                    {report.recommendedMaterials && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Recommended Materials by Component
                            </h2>
                            
                            {Object.entries(report.recommendedMaterials).map(([category, materials]) => (
                                <div key={category} className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-3 capitalize">
                                        {category} Materials
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {materials.map((material, idx) => (
                                            <MaterialCard key={idx} material={material} category={category} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Cost Analysis */}
                    {report.costAnalysis && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Cost Analysis
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">Material Costs</h4>
                                        {Object.entries(report.costAnalysis.materialCosts).map(([item, cost]) => (
                                            <div key={item} className="flex justify-between py-2 border-b border-gray-200">
                                                <span className="capitalize">{item}:</span>
                                                <span className="font-medium">{cost}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">Additional Costs</h4>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span>Labor:</span>
                                            <span className="font-medium">{report.costAnalysis.laborCosts}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span>Transportation:</span>
                                            <span className="font-medium">{report.costAnalysis.transportationCosts}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span>Contingency:</span>
                                            <span className="font-medium">{report.costAnalysis.contingency}</span>
                                        </div>
                                        <div className="flex justify-between py-3 mt-2 bg-green-100 px-3 rounded">
                                            <span className="font-bold">Total Project Cost:</span>
                                            <span className="font-bold text-green-700">{report.costAnalysis.totalProjectCost}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Environmental Impact */}
                    {report.environmentalImpact && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Environmental Impact Assessment
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">Sustainability Features</h4>
                                    <ul className="text-sm text-green-700 list-disc ml-4">
                                        {report.environmentalImpact.sustainability.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Energy Efficiency</h4>
                                        <p className="text-gray-700">{report.environmentalImpact.energyEfficiency}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Carbon Footprint</h4>
                                        <p className="text-gray-700">{report.environmentalImpact.carbonFootprint}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Durability & Maintenance */}
                    {report.durabilityMaintenance && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Durability & Maintenance
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="mb-2">
                                        <span className="font-semibold">Expected Lifespan:</span> {report.durabilityMaintenance.expectedLifespan}
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-semibold">Maintenance Frequency:</span> {report.durabilityMaintenance.maintenanceFrequency}
                                    </p>
                                    <h4 className="font-semibold text-gray-800 mb-2">Common Issues</h4>
                                    <ul className="text-gray-700 list-disc ml-4">
                                        {report.durabilityMaintenance.commonIssues.map((issue, idx) => (
                                            <li key={idx}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Preventive Measures</h4>
                                    <ul className="text-gray-700 list-disc ml-4">
                                        {report.durabilityMaintenance.preventiveMeasures.map((measure, idx) => (
                                            <li key={idx}>{measure}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Professional Recommendations */}
                    {report.professionalRecommendations && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                Professional Recommendations
                            </h2>
                            {report.professionalRecommendations.topCombinations && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Top Material Combinations</h3>
                                    <div className="space-y-4">
                                        {report.professionalRecommendations.topCombinations.map((combo, idx) => (
                                            <div key={idx} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                                <h4 className="font-semibold text-blue-800 mb-2">{combo.name}</h4>
                                                <p className="text-blue-700 mb-2">Cost: {combo.cost}</p>
                                                <p className="text-sm text-blue-600 mb-2">
                                                    Materials: {combo.materials.join(', ')}
                                                </p>
                                                <ul className="text-sm text-blue-700 list-disc ml-4">
                                                    {combo.benefits.map((benefit, bIdx) => (
                                                        <li key={bIdx}>{benefit}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Risk Mitigation</h4>
                                    <ul className="text-gray-700 list-disc ml-4">
                                        {report.professionalRecommendations.riskMitigation.map((risk, idx) => (
                                            <li key={idx}>{risk}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Quality Assurance</h4>
                                    <ul className="text-gray-700 list-disc ml-4">
                                        {report.professionalRecommendations.qualityAssurance.map((qa, idx) => (
                                            <li key={idx}>{qa}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Important Notes */}
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes for Indian Projects:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• This analysis is based on Indian building standards (NBC 2016) and provided requirements</li>
                            <li>• Local building codes and state-specific regulations should be verified independently</li>
                            <li>• Material prices are indicative and may vary by location, season, and market conditions</li>
                            <li>• Consider monsoon timing for material procurement and construction scheduling</li>
                            <li>• Professional consultation with licensed Indian engineers is recommended for final decisions</li>
                            <li>• Verify seismic zone requirements and local authority approvals</li>
                        </ul>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                        <p className="text-xs text-gray-500 text-center">
                            Report generated on {new Date().toLocaleDateString()} | AI-Powered Building Material Selector
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback for raw text format
    const formattedSections = formatReport(report.rawText || report);

    return (
        <div className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="prose max-w-none pr-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Professional Material Analysis Report (India)</h3>
                    <p className="text-blue-700 text-sm">
                        This report has been generated based on your specific project requirements and Indian building standards (NBC 2016, IS Codes).
                    </p>
                </div>
                
                <div className="space-y-6">
                    {formattedSections.map((section, index) => {
                        // Check if section is a header
                        const isHeader = /^(\d+\.|##|###|\*\*)/.test(section);
                        const isMainHeader = /^(\d+\.)/.test(section);
                        
                        if (isMainHeader) {
                            return (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        {section.replace(/^\d+\./, '').trim()}
                                    </h3>
                                </div>
                            );
                        } else if (isHeader) {
                            return (
                                <h4 key={index} className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                                    {section.replace(/^(##|###|\*\*)|(\*\*)$/g, '').trim()}
                                </h4>
                            );
                        } else {
                            // Regular content
                            const lines = section.split('\n').filter(line => line.trim());
                            return (
                                <div key={index} className="text-gray-600 space-y-2">
                                    {lines.map((line, lineIndex) => {
                                        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                                            return (
                                                <li key={lineIndex} className="ml-4 list-disc">
                                                    {line.replace(/^[-•]\s*/, '')}
                                                </li>
                                            );
                                        } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                                            return (
                                                <p key={lineIndex} className="font-semibold text-gray-800">
                                                    {line.replace(/\*\*/g, '')}
                                                </p>
                                            );
                                        } else {
                                            return (
                                                <p key={lineIndex} className="text-gray-700 leading-relaxed">
                                                    {line}
                                                </p>
                                            );
                                        }
                                    })}
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Additional Professional Elements */}
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Notes for Indian Projects:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• This analysis is based on Indian building standards (NBC 2016) and provided requirements</li>
                        <li>• Local building codes and state-specific regulations should be verified independently</li>
                        <li>• Material prices are indicative and may vary by location, season, and market conditions</li>
                        <li>• Consider monsoon timing for material procurement and construction scheduling</li>
                        <li>• Professional consultation with licensed Indian engineers is recommended for final decisions</li>
                        <li>• Verify seismic zone requirements and local authority approvals</li>
                    </ul>
                </div>

                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-xs text-gray-500 text-center">
                        Report generated on {new Date().toLocaleDateString()} | AI-Powered Building Material Selector
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaterialReport;