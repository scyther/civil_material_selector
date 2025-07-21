'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementRef, filename = 'material-analysis-report.pdf') => {
  if (!elementRef.current) {
    console.error('Element reference is null');
    throw new Error('Element reference is null');
  }

  try {
    const element = elementRef.current;
    
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 1.5, // Reduced scale for better performance
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      height: element.scrollHeight,
      width: element.scrollWidth,
      scrollX: 0,
      scrollY: 0,
      logging: false, // Disable logging for production
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions for A4
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if content is longer
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Alternative method using browser's print functionality
export const printReport = (elementRef, filename = 'material-analysis-report') => {
  if (!elementRef.current) {
    throw new Error('Element reference is null');
  }

  try {
    const element = elementRef.current;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      throw new Error('Failed to open print window. Please allow pop-ups for this site.');
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);
    
    // Create a complete HTML document for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${filename}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.4;
              color: #333;
              background: white;
              padding: 20px;
            }
            /* Tailwind-like utility classes for print */
            .bg-white { background-color: white !important; }
            .bg-gray-50 { background-color: #f9fafb !important; }
            .bg-blue-50 { background-color: #eff6ff !important; }
            .bg-green-50 { background-color: #f0fdf4 !important; }
            .bg-orange-50 { background-color: #fff7ed !important; }
            .bg-purple-50 { background-color: #faf5ff !important; }
            .bg-green-200 { background-color: #bbf7d0 !important; }
            .text-blue-900 { color: #1e3a8a !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-500 { color: #6b7280 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-orange-800 { color: #9a3412 !important; }
            .text-blue-800 { color: #1e40af !important; }
            .border-blue-600 { border-color: #2563eb !important; }
            .border-green-600 { border-color: #16a34a !important; }
            .border-orange-600 { border-color: #ea580c !important; }
            .border-purple-600 { border-color: #9333ea !important; }
            .border-blue-400 { border-color: #60a5fa !important; }
            .border-orange-300 { border-color: #fed7aa !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            
            @media print {
              body { 
                print-color-adjust: exact; 
                -webkit-print-color-adjust: exact;
                margin: 0;
                padding: 15mm;
              }
              .page-break { 
                page-break-before: always; 
              }
              .no-print { 
                display: none !important; 
              }
            }
            
            @page {
              size: A4;
              margin: 15mm;
            }
          </style>
        </head>
        <body>
          ${clonedElement.outerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 1000);
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    return true;
  } catch (error) {
    console.error('Error printing report:', error);
    throw error;
  }
};
