'use client'

const ProjectSummary = ({ projectData }) => {
    const formatProjectType = (type) => {
        const types = {
            'residential': 'Residential Building',
            'commercial': 'Commercial Building',
            'industrial': 'Industrial Facility',
            'infrastructure': 'Infrastructure Project',
            'institutional': 'Institutional Building'
        };
        return types[type] || type;
    };

    const formatClimate = (climate) => {
        const climates = {
            'hot-dry': 'Hot & Dry (Rajasthan, Gujarat)',
            'warm-humid': 'Warm & Humid (Chennai, Mumbai)',
            'moderate': 'Moderate (Delhi, Pune)',
            'cold': 'Cold (Kashmir, Himachal)',
            'composite': 'Composite (North Indian Plains)',
            'coastal': 'Coastal (Goa, Kerala)',
            'hill-station': 'Hill Station (Shimla, Ooty)'
        };
        return climates[climate] || climate;
    };

    const formatBudget = (budget) => {
        const budgets = {
            'economy': 'Economy (₹800-1,500/sq ft)',
            'standard': 'Standard (₹1,500-2,500/sq ft)',
            'premium': 'Premium (₹2,500-4,000/sq ft)',
            'luxury': 'Luxury (₹4,000+/sq ft)'
        };
        return budgets[budget] || budget;
    };

    if (!projectData.projectType && !projectData.climate && !projectData.area && !projectData.expectedBudget) {
        return null;
    }

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Project Specification Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {projectData.projectType && (
                    <div>
                        <span className="font-medium text-blue-700">Type:</span>
                        <span className="ml-2 text-blue-600">{formatProjectType(projectData.projectType)}</span>
                    </div>
                )}
                {projectData.climate && (
                    <div>
                        <span className="font-medium text-blue-700">Climate Zone:</span>
                        <span className="ml-2 text-blue-600">{formatClimate(projectData.climate)}</span>
                    </div>
                )}
                {projectData.budget && (
                    <div>
                        <span className="font-medium text-blue-700">Budget Range:</span>
                        <span className="ml-2 text-blue-600">{formatBudget(projectData.budget)}</span>
                    </div>
                )}
                {projectData.area && (
                    <div>
                        <span className="font-medium text-blue-700">Project Area:</span>
                        <span className="ml-2 text-blue-600">{Number(projectData.area).toLocaleString('en-IN')} sq ft</span>
                    </div>
                )}
                {projectData.expectedBudget && (
                    <div>
                        <span className="font-medium text-blue-700">Expected Budget:</span>
                        <span className="ml-2 text-blue-600">₹{Number(projectData.expectedBudget).toLocaleString('en-IN')}</span>
                    </div>
                )}
                {projectData.location && (
                    <div>
                        <span className="font-medium text-blue-700">Location:</span>
                        <span className="ml-2 text-blue-600">{projectData.location}</span>
                    </div>
                )}
                {projectData.duration && (
                    <div>
                        <span className="font-medium text-blue-700">Duration:</span>
                        <span className="ml-2 text-blue-600">{projectData.duration}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectSummary;
