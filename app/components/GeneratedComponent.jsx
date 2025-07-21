'use client'

const MaterialReport = ({ report }) => {
    // Function to format the AI-generated report into structured sections
    const formatReport = (text) => {
        if (!text) return [];
        
        // Split by common section headers and format
        const sections = text.split(/(?=(?:\d+\.|##|###|\*\*))./)
            .filter(section => section.trim().length > 0)
            .map(section => section.trim());
        
        return sections;
    };

    const formattedSections = formatReport(report);

    return (
        <div className="prose max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Professional Material Analysis Report</h3>
                <p className="text-blue-700 text-sm">
                    This report has been generated based on your specific project requirements and industry best practices.
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
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• This analysis is based on general industry standards and provided requirements</li>
                    <li>• Local building codes and regulations should be verified independently</li>
                    <li>• Material prices and availability may vary by location and time</li>
                    <li>• Professional engineering consultation is recommended for final decisions</li>
                </ul>
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-500 text-center">
                    Report generated on {new Date().toLocaleDateString()} | AI-Powered Building Material Selector
                </p>
            </div>
        </div>
    );
};

export default MaterialReport;