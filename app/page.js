'use client';

import { useState } from 'react';
import MaterialReport from './components/MaterialReport';
import ProjectSummary from './components/ProjectSummary';

export default function Home() {
  const [projectData, setProjectData] = useState({
    projectType: '',
    climate: '',
    budget: '',
    duration: '',
    location: '',
    structuralRequirements: '',
    sustainabilityGoals: '',
    additionalConstraints: ''
  });
  
  const [materialReport, setMaterialReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const prompt = `
        As a professional building materials consultant with expertise in Indian construction practices and standards, analyze the following project requirements and provide a comprehensive material selection report:
        
        Project Type: ${projectData.projectType}
        Climate Zone: ${projectData.climate}
        Budget Range: ${projectData.budget}
        Project Duration: ${projectData.duration}
        Location: ${projectData.location}
        Structural Requirements: ${projectData.structuralRequirements}
        Sustainability Goals: ${projectData.sustainabilityGoals}
        Additional Constraints: ${projectData.additionalConstraints}
        
        Please provide a detailed analysis considering Indian context:
        1. Top 3 recommended materials for each major component (foundation, structure, roofing, insulation, finishing) with Indian brands and suppliers
        2. Cost analysis in INR with current market rates
        3. Environmental impact assessment considering Indian climate
        4. Durability and maintenance in Indian conditions (monsoon, heat, humidity)
        5. Local availability and supplier recommendations across India
        6. Compliance with Indian building codes (NBC 2016, IS codes)
        7. Timeline for material procurement in Indian market
        8. Consideration for local labor skills and construction practices
        9. Energy efficiency ratings as per Bureau of Energy Efficiency (BEE)
        10. GRIHA/IGBC green building compliance if applicable
        
        Format the response as a professional engineering report with clear sections, recommendations, and Indian market insights.
      `;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: prompt })
      });

      const data = await response.json();
      if (response.ok) {
        setMaterialReport(data.code);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      await navigator.clipboard.writeText(materialReport);
      alert("Report copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI-Powered Building Material Selector
          </h1>
          <p className="text-lg text-gray-600">
            Professional material selection and analysis for Indian construction industry
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Compliant with NBC 2016, IS Codes, and Indian Climate Conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Input Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Requirements</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={projectData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential Building</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="industrial">Industrial Facility</option>
                  <option value="infrastructure">Infrastructure Project</option>
                  <option value="institutional">Institutional Building</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Climate Zone (as per Indian Standards)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={projectData.climate}
                  onChange={(e) => handleInputChange('climate', e.target.value)}
                >
                  <option value="">Select climate zone</option>
                  <option value="hot-dry">Hot & Dry (Rajasthan, Gujarat)</option>
                  <option value="warm-humid">Warm & Humid (Chennai, Mumbai)</option>
                  <option value="moderate">Moderate (Delhi, Pune)</option>
                  <option value="cold">Cold (Kashmir, Himachal)</option>
                  <option value="composite">Composite (North Indian Plains)</option>
                  <option value="coastal">Coastal (Goa, Kerala)</option>
                  <option value="hill-station">Hill Station (Shimla, Ooty)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range (in INR per sq ft)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={projectData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                >
                  <option value="">Select budget range</option>
                  <option value="economy">Economy (₹800-1,500/sq ft)</option>
                  <option value="standard">Standard (₹1,500-2,500/sq ft)</option>
                  <option value="premium">Premium (₹2,500-4,000/sq ft)</option>
                  <option value="luxury">Luxury (₹4,000+/sq ft)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Duration
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 12 months, 2 years"
                  value={projectData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mumbai, Maharashtra or Delhi, NCR"
                  value={projectData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Structural Requirements
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Load requirements, seismic zone (I-V), wind speed, soil type, monsoon considerations, etc."
                  value={projectData.structuralRequirements}
                  onChange={(e) => handleInputChange('structuralRequirements', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sustainability & Green Building Goals
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="GRIHA/IGBC certification, energy efficiency, rainwater harvesting, waste management, etc."
                  value={projectData.sustainabilityGoals}
                  onChange={(e) => handleInputChange('sustainabilityGoals', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Constraints
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Vastu compliance, fire safety (NBC), acoustic requirements, local building bylaws, etc."
                  value={projectData.additionalConstraints}
                  onChange={(e) => handleInputChange('additionalConstraints', e.target.value)}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading || !projectData.projectType || !projectData.climate}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Generate Material Analysis Report'}
              </button>
            </div>
          </div>

          {/* Material Report Display */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Material Analysis Report</h2>
              {materialReport && (
                <button
                  onClick={handleExportReport}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Export Report
                </button>
              )}
            </div>
            
            <ProjectSummary projectData={projectData} />
            
            <div className="min-h-96">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : materialReport ? (
                <MaterialReport report={materialReport} />
              ) : (
                <div className="text-center text-gray-500 h-96 flex items-center justify-center">
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Fill out the project requirements to generate a comprehensive material analysis report</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
