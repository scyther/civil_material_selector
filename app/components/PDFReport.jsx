'use client';

import React from 'react';

const PDFReport = React.forwardRef(({ projectData, materialReport }, ref) => {
  const formatReportData = () => {
    if (typeof materialReport === 'object' && !materialReport.rawText) {
      return {
        executiveSummary: materialReport.executiveSummary || {},
        costAnalysis: materialReport.costAnalysis || {},
        recommendedMaterials: materialReport.recommendedMaterials || {},
        environmentalImpact: materialReport.environmentalImpact || {},
        durabilityMaintenance: materialReport.durabilityMaintenance || {},
        professionalRecommendations: materialReport.professionalRecommendations || {}
      };
    }
    return { rawText: materialReport.rawText || materialReport };
  };

  const reportData = formatReportData();
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto" style={{ minHeight: '297mm', fontSize: '12px', lineHeight: '1.4' }}>
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          BUILDING MATERIAL ANALYSIS REPORT
        </h1>
        <p className="text-lg text-gray-700 mb-1">
          Professional Material Selection & Analysis
        </p>
        <p className="text-sm text-gray-600">
          Compliant with NBC 2016, IS Codes, and Indian Climate Conditions
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Generated on: {currentDate}
        </div>
      </div>

      {/* Project Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
          PROJECT INFORMATION
        </h2>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
          <div><strong>Project Type:</strong> {projectData.projectType || 'N/A'}</div>
          <div><strong>Climate Zone:</strong> {projectData.climate || 'N/A'}</div>
          <div><strong>Budget Range:</strong> {projectData.budget || 'N/A'}</div>
          <div><strong>Project Area:</strong> {projectData.area ? `${Number(projectData.area).toLocaleString('en-IN')} sq ft` : 'N/A'}</div>
          <div><strong>Expected Budget:</strong> {projectData.expectedBudget ? `₹${Number(projectData.expectedBudget).toLocaleString('en-IN')}` : 'N/A'}</div>
          <div><strong>Duration:</strong> {projectData.duration || 'N/A'}</div>
          <div><strong>Location:</strong> {projectData.location || 'N/A'}</div>
          <div><strong>Sustainability Goals:</strong> {projectData.sustainabilityGoals || 'N/A'}</div>
        </div>
        {projectData.structuralRequirements && (
          <div className="mt-4">
            <strong>Structural Requirements:</strong>
            <p className="text-gray-700 mt-1">{projectData.structuralRequirements}</p>
          </div>
        )}
        {projectData.additionalConstraints && (
          <div className="mt-4">
            <strong>Additional Constraints:</strong>
            <p className="text-gray-700 mt-1">{projectData.additionalConstraints}</p>
          </div>
        )}
      </div>

      {/* Report Content */}
      {reportData.rawText ? (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            ANALYSIS REPORT
          </h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {reportData.rawText}
          </div>
        </div>
      ) : (
        <>
          {/* Executive Summary */}
          {reportData.executiveSummary && Object.keys(reportData.executiveSummary).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
                EXECUTIVE SUMMARY
              </h2>
              <div className="bg-blue-50 p-4 rounded">
                {reportData.executiveSummary.totalCostEstimate && (
                  <div className="mb-2"><strong>Total Cost Estimate:</strong> {reportData.executiveSummary.totalCostEstimate}</div>
                )}
                {reportData.executiveSummary.timelineOverview && (
                  <div className="mb-2"><strong>Timeline Overview:</strong> {reportData.executiveSummary.timelineOverview}</div>
                )}
                {reportData.executiveSummary.climateSuitability && (
                  <div className="mb-2"><strong>Climate Suitability:</strong> {reportData.executiveSummary.climateSuitability}</div>
                )}
                {reportData.executiveSummary.keyRecommendations && reportData.executiveSummary.keyRecommendations.length > 0 && (
                  <div className="mt-3">
                    <strong>Key Recommendations:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      {reportData.executiveSummary.keyRecommendations.map((rec, idx) => (
                        <li key={idx} className="text-gray-700">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cost Analysis */}
          {reportData.costAnalysis && Object.keys(reportData.costAnalysis).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-green-600 pl-3">
                COST ANALYSIS
              </h2>
              <div className="bg-green-50 p-4 rounded">
                {reportData.costAnalysis.materialCosts && (
                  <div className="mb-4">
                    <strong>Material Costs:</strong>
                    <div className="grid grid-cols-2 gap-2 mt-2 ml-4">
                      {Object.entries(reportData.costAnalysis.materialCosts).map(([key, value]) => (
                        <div key={key} className="text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {reportData.costAnalysis.laborCosts && (
                    <div><strong>Labor Costs:</strong> {reportData.costAnalysis.laborCosts}</div>
                  )}
                  {reportData.costAnalysis.transportationCosts && (
                    <div><strong>Transportation:</strong> {reportData.costAnalysis.transportationCosts}</div>
                  )}
                  {reportData.costAnalysis.contingency && (
                    <div><strong>Contingency:</strong> {reportData.costAnalysis.contingency}</div>
                  )}
                </div>
                {reportData.costAnalysis.totalProjectCost && (
                  <div className="mt-4 p-3 bg-green-200 rounded font-bold text-lg">
                    TOTAL PROJECT COST: {reportData.costAnalysis.totalProjectCost}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommended Materials */}
          {reportData.recommendedMaterials && Object.keys(reportData.recommendedMaterials).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-orange-600 pl-3">
                RECOMMENDED MATERIALS
              </h2>
              <div className="space-y-4">
                {Object.entries(reportData.recommendedMaterials).map(([category, materials]) => (
                  <div key={category} className="bg-orange-50 p-4 rounded">
                    <h3 className="font-bold text-lg text-orange-800 mb-3">
                      {category.toUpperCase()} MATERIALS
                    </h3>
                    <div className="space-y-2">
                      {materials.map((material, idx) => (
                        <div key={idx} className="text-gray-700 pl-4 border-l-2 border-orange-300">
                          <div className="font-semibold">{material.name}</div>
                          {material.brand && <div className="text-sm">Brand: {material.brand}</div>}
                          {material.costPerUnit && <div className="text-sm">Cost: {material.costPerUnit}</div>}
                          {material.specifications && <div className="text-sm">Specs: {material.specifications}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Impact */}
          {reportData.environmentalImpact && Object.keys(reportData.environmentalImpact).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-green-600 pl-3">
                ENVIRONMENTAL IMPACT
              </h2>
              <div className="bg-green-50 p-4 rounded">
                {reportData.environmentalImpact.carbonFootprint && (
                  <div className="mb-2"><strong>Carbon Footprint:</strong> {reportData.environmentalImpact.carbonFootprint}</div>
                )}
                {reportData.environmentalImpact.energyEfficiency && (
                  <div className="mb-2"><strong>Energy Efficiency:</strong> {reportData.environmentalImpact.energyEfficiency}</div>
                )}
                {reportData.environmentalImpact.sustainability && reportData.environmentalImpact.sustainability.length > 0 && (
                  <div className="mt-3">
                    <strong>Sustainability Features:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      {reportData.environmentalImpact.sustainability.map((item, idx) => (
                        <li key={idx} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Durability & Maintenance */}
          {reportData.durabilityMaintenance && Object.keys(reportData.durabilityMaintenance).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">
                DURABILITY & MAINTENANCE
              </h2>
              <div className="bg-purple-50 p-4 rounded">
                {reportData.durabilityMaintenance.expectedLifespan && (
                  <div className="mb-2"><strong>Expected Lifespan:</strong> {reportData.durabilityMaintenance.expectedLifespan}</div>
                )}
                {reportData.durabilityMaintenance.maintenanceFrequency && (
                  <div className="mb-2"><strong>Maintenance Frequency:</strong> {reportData.durabilityMaintenance.maintenanceFrequency}</div>
                )}
                {reportData.durabilityMaintenance.climateResistance && (
                  <div className="mb-2"><strong>Climate Resistance:</strong> {reportData.durabilityMaintenance.climateResistance}</div>
                )}
              </div>
            </div>
          )}

          {/* Professional Recommendations */}
          {reportData.professionalRecommendations && reportData.professionalRecommendations.topCombinations && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
                PROFESSIONAL RECOMMENDATIONS
              </h2>
              <div className="space-y-4">
                {reportData.professionalRecommendations.topCombinations.map((combo, idx) => (
                  <div key={idx} className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                    <h3 className="font-bold text-lg text-blue-800">
                      {idx + 1}. {combo.name} {combo.cost && `(${combo.cost})`}
                    </h3>
                    {combo.materials && combo.materials.length > 0 && (
                      <div className="mt-2">
                        <strong>Materials:</strong> {combo.materials.join(', ')}
                      </div>
                    )}
                    {combo.benefits && combo.benefits.length > 0 && (
                      <div className="mt-2">
                        <strong>Benefits:</strong> {combo.benefits.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-gray-300 text-center text-sm text-gray-600">
        <p className="font-semibold">Generated by AI-Powered Building Material Selector</p>
        <p>Compliant with NBC 2016 and Indian Building Standards</p>
        <p className="mt-2">This report is generated for informational purposes. Please consult with certified professionals for final decisions.</p>
      </div>
    </div>
  );
});

PDFReport.displayName = 'PDFReport';

export default PDFReport;
