import { jsPDF } from 'jspdf';
import { GeneratedStory } from '../types';

export async function downloadStoryAsPDF(story: GeneratedStory): Promise<void> {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Título da história
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  const titleLines = pdf.splitTextToSize(story.title, contentWidth);
  let yPosition = margin + 20;
  
  titleLines.forEach((line: string) => {
    pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
  });
  
  yPosition += 20;
  
  // Adicionar cada página da história
  for (let i = 0; i < story.pages.length; i++) {
    const page = story.pages[i];
    
    if (i > 0) {
      pdf.addPage();
      yPosition = margin + 20;
    }
    
    // Número da página
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Página ${i + 1}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Adicionar imagem se disponível
    const imageUrl = page.imageUrl;
    if (imageUrl) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imageData = canvas.toDataURL('image/jpeg', 0.8);
                const imageWidth = contentWidth * 0.8;
                const imageHeight = (img.height / img.width) * imageWidth;
                
                if (yPosition + imageHeight > pageHeight - margin) {
                  pdf.addPage();
                  yPosition = margin + 20;
                }
                
                pdf.addImage(
                  imageData,
                  'JPEG',
                  (pageWidth - imageWidth) / 2,
                  yPosition,
                  imageWidth,
                  imageHeight
                );
                
                yPosition += imageHeight + 15;
                resolve(void 0);
              } else {
                reject(new Error('Não foi possível obter contexto do canvas'));
              }
            } catch (error) {
              console.warn('Erro ao processar imagem:', error);
              resolve(void 0); // Continue sem a imagem
            }
          };
          
          img.onerror = () => {
            console.warn('Erro ao carregar imagem, continuando sem ela');
            resolve(void 0); // Continue sem a imagem
          };
          
          img.src = imageUrl;
        });
      } catch (error) {
        console.warn('Erro ao adicionar imagem ao PDF:', error);
      }
    }
    
    // Adicionar texto da página
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin + 20;
    }
    
    const textLines = pdf.splitTextToSize(page.text, contentWidth);
    textLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin + 20;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
  }
  
  // Adicionar rodapé na última página
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  const footerText = `História criada especialmente para Theo em ${new Date().toLocaleDateString('pt-BR')}`;
  pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Fazer download do PDF
  pdf.save(`historia-do-theo-${Date.now()}.pdf`);
}