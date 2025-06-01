'use client';

import { ReactNode } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type PDFTemplateProps = {
  title: string;
  content: ReactNode;
  footer?: ReactNode;
  orientation?: 'portrait' | 'landscape';
  filename?: string;
};

export const generatePDF = async ({
  title,
  content,
  footer = <p style={{ color: '#006B35', fontSize: '14px' }}>www.sana-equestrian.com</p>,
  orientation = 'portrait',
  filename = 'sana-document.pdf'
}: PDFTemplateProps) => {
  // Create a temporary div for the PDF content
  const pdfContent = document.createElement('div');
  pdfContent.style.width = orientation === 'portrait' ? '210mm' : '297mm'; // A4 dimensions
  pdfContent.style.height = orientation === 'portrait' ? '297mm' : '210mm';
  pdfContent.style.position = 'absolute';
  pdfContent.style.left = '-9999px';
  pdfContent.style.top = '-9999px';
  pdfContent.style.backgroundColor = '#ffffff';
  pdfContent.style.padding = '20mm';
  pdfContent.style.fontFamily = 'Arial, sans-serif';
  
  // Create header div
  const headerDiv = document.createElement('div');
  headerDiv.style.textAlign = 'center';
  headerDiv.style.marginBottom = '20px';
  headerDiv.innerHTML = `
    <h1 style="color: #006B35; font-size: 24px; margin-bottom: 5px;">SANA</h1>
    <p style="color: #666; font-size: 14px;">The Future of Equestrian Care</p>
  `;
  
  // Create content div
  const contentDiv = document.createElement('div');
  contentDiv.style.flex = '1';
  contentDiv.style.display = 'flex';
  contentDiv.style.flexDirection = 'column';
  contentDiv.style.alignItems = 'center';
  contentDiv.style.justifyContent = 'center';
  
  // Create title element
  const titleElement = document.createElement('h2');
  titleElement.style.color = '#006B35';
  titleElement.style.fontSize = '28px';
  titleElement.style.marginBottom = '20px';
  titleElement.textContent = title;
  
  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.id = 'pdf-content-container';
  
  // Create footer div
  const footerDiv = document.createElement('div');
  footerDiv.style.marginTop = 'auto';
  footerDiv.style.borderTop = '2px solid #D4AF37';
  footerDiv.style.paddingTop = '10px';
  footerDiv.style.textAlign = 'center';
  
  // Assemble the PDF structure
  contentDiv.appendChild(titleElement);
  contentDiv.appendChild(contentContainer);
  
  pdfContent.appendChild(headerDiv);
  pdfContent.appendChild(contentDiv);
  pdfContent.appendChild(footerDiv);
  
  document.body.appendChild(pdfContent);
  
  try {
    // Render content
    if (typeof content === 'string') {
      contentContainer.innerHTML = content;
    } else {
      // For React components, we need to render them to a string
      // This is a simplified approach - in a real app, you might use ReactDOMServer
      contentContainer.innerHTML = content.toString();
    }
    
    // Render footer
    if (typeof footer === 'string') {
      footerDiv.innerHTML = footer;
    } else {
      footerDiv.innerHTML = footer.toString();
    }
    
    // Generate PDF
    const pdf = new jsPDF(orientation[0] as 'p' | 'l', 'mm', 'a4');
    const pdfCanvas = await html2canvas(pdfContent, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false
    });
    
    const imgData = pdfCanvas.toDataURL('image/png');
    const pdfWidth = orientation === 'portrait' ? 210 : 297;
    const pdfHeight = orientation === 'portrait' ? 297 : 210;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Download PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  } finally {
    // Clean up
    document.body.removeChild(pdfContent);
  }
};

// Example usage for horse QR code PDF
export const generateHorseQRPDF = async (horse, qrCodeElement) => {
  if (!horse || !qrCodeElement) return false;
  
  try {
    // Capture QR code as canvas
    const qrCanvas = await html2canvas(qrCodeElement);
    const qrDataUrl = qrCanvas.toDataURL('image/png');
    
    // Create content HTML
    const content = `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="${qrDataUrl}" style="width: 200px; height: 200px; margin-bottom: 30px;" />
        <p style="color: #666; font-size: 16px;">Scan this QR code to view ${horse.name}'s profile</p>
      </div>
    `;
    
    // Generate PDF using the template
    return await generatePDF({
      title: horse.name,
      content,
      filename: `${horse.name}-Sana-Profile.pdf`
    });
  } catch (error) {
    console.error('Error generating horse QR PDF:', error);
    return false;
  }
};