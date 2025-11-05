import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export class ExportService {
  static async exportToPDF(resumeData: ResumeData, filename: string = 'resume.pdf'): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const maxWidth = options.maxWidth || contentWidth;
      const lineHeight = options.lineHeight || fontSize * 0.35;
      
      pdf.setFontSize(fontSize);
      if (options.bold) pdf.setFont('helvetica', 'bold');
      else pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string, index: number) => {
        if (y + (index * lineHeight) > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, x, y + (index * lineHeight));
      });
      
      return y + (lines.length * lineHeight);
    };

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Header - Name
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    const nameWidth = pdf.getTextWidth(resumeData.personalInfo.fullName);
    pdf.text(resumeData.personalInfo.fullName, (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 12;

    // Contact Information
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location,
      resumeData.personalInfo.linkedin
    ].filter(Boolean).join(' | ');
    
    const contactWidth = pdf.getTextWidth(contactInfo);
    pdf.text(contactInfo, (pageWidth - contactWidth) / 2, yPosition);
    yPosition += 15;

    // Professional Summary
    if (resumeData.personalInfo.summary) {
      checkPageBreak(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PROFESSIONAL SUMMARY', margin, yPosition);
      yPosition += 8;
      
      // Add underline
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, margin + 60, yPosition);
      yPosition += 5;
      
      yPosition = addText(resumeData.personalInfo.summary, margin, yPosition, {
        fontSize: 10,
        lineHeight: 4
      });
      yPosition += 10;
    }

    // Professional Experience
    if (resumeData.experience.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
      yPosition += 8;
      
      // Add underline
      pdf.line(margin, yPosition, margin + 80, yPosition);
      yPosition += 8;

      resumeData.experience.forEach((exp) => {
        checkPageBreak(25);
        
        // Job Title and Company
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position, margin, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        const companyText = ` | ${exp.company}`;
        const titleWidth = pdf.getTextWidth(exp.position);
        pdf.text(companyText, margin + titleWidth, yPosition);
        yPosition += 5;
        
        // Dates
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
        pdf.text(dateText, margin, yPosition);
        yPosition += 6;
        
        // Description
        if (exp.description) {
          yPosition = addText(exp.description, margin, yPosition, {
            fontSize: 10,
            lineHeight: 4
          });
          yPosition += 3;
        }
        
        // Achievements
        if (exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            checkPageBreak(8);
            yPosition = addText(`• ${achievement}`, margin + 5, yPosition, {
              fontSize: 10,
              lineHeight: 4
            });
            yPosition += 2;
          });
        }
        
        yPosition += 5;
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCATION', margin, yPosition);
      yPosition += 8;
      
      // Add underline
      pdf.line(margin, yPosition, margin + 35, yPosition);
      yPosition += 8;

      resumeData.education.forEach(edu => {
        checkPageBreak(15);
        
        // Degree and Field
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${edu.degree} in ${edu.field}`, margin, yPosition);
        yPosition += 5;
        
        // Institution
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(edu.institution, margin, yPosition);
        yPosition += 4;
        
        // Dates
        pdf.setFont('helvetica', 'italic');
        pdf.text(`${edu.startDate} - ${edu.endDate}`, margin, yPosition);
        yPosition += 8;
      });
    }

    // Skills
    if (resumeData.skills.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SKILLS', margin, yPosition);
      yPosition += 8;
      
      // Add underline
      pdf.line(margin, yPosition, margin + 25, yPosition);
      yPosition += 5;
      
      const skillsText = resumeData.skills.map(skill => skill.name).join(' • ');
      yPosition = addText(skillsText, margin, yPosition, {
        fontSize: 10,
        lineHeight: 4
      });
      yPosition += 10;
    }

    // References
    if (resumeData.references.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('REFERENCES', margin, yPosition);
      yPosition += 8;
      
      // Add underline
      pdf.line(margin, yPosition, margin + 40, yPosition);
      yPosition += 8;

      resumeData.references.forEach((ref, index) => {
        checkPageBreak(20);
        
        // Reference Name
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(ref.name, margin, yPosition);
        yPosition += 5;
        
        // Title and Company
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${ref.title} | ${ref.company}`, margin, yPosition);
        yPosition += 4;
        
        // Contact Info
        pdf.text(`${ref.email} | ${ref.phone}`, margin, yPosition);
        yPosition += 8;
      });
    }

    pdf.save(filename);
  }

  static async exportToWord(resumeData: ResumeData, filename: string = 'resume.docx'): Promise<void> {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header with name
          new Paragraph({
            text: resumeData.personalInfo.fullName,
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 }
          }),
          
          // Contact info
          new Paragraph({
            children: [
              new TextRun(`${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`),
              new TextRun({ text: ` | ${resumeData.personalInfo.location}`, break: 1 }),
              ...(resumeData.personalInfo.linkedin ? [new TextRun({ text: ` | ${resumeData.personalInfo.linkedin}`, break: 1 })] : [])
            ],
            spacing: { after: 300 }
          }),

          // Professional Summary
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: resumeData.personalInfo.summary,
            spacing: { after: 300 }
          }),

          // Experience
          new Paragraph({
            text: 'Professional Experience',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          
          ...resumeData.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true }),
                new TextRun(` | ${exp.company}`),
                new TextRun({ text: ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, break: 1 })
              ],
              spacing: { before: 100, after: 50 }
            }),
            new Paragraph({
              text: exp.description,
              spacing: { after: 100 }
            }),
            ...exp.achievements.map(achievement => 
              new Paragraph({
                text: `• ${achievement}`,
                spacing: { after: 50 }
              })
            )
          ]),

          // Education
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          
          ...resumeData.education.map(edu => 
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true }),
                new TextRun({ text: ` | ${edu.institution}`, break: 1 }),
                new TextRun({ text: ` | ${edu.startDate} - ${edu.endDate}`, break: 1 })
              ],
              spacing: { after: 100 }
            })
          ),

          // Skills
          new Paragraph({
            text: 'Skills',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: resumeData.skills.map(skill => skill.name).join(' • '),
            spacing: { after: 100 }
          }),

          // References
          ...(resumeData.references.length > 0 ? [
            new Paragraph({
              text: 'References',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 200, after: 100 }
            }),
            ...resumeData.references.map(ref => 
              new Paragraph({
                children: [
                  new TextRun({ text: ref.name, bold: true }),
                  new TextRun({ text: ` | ${ref.title}`, break: 1 }),
                  new TextRun({ text: ` | ${ref.company}`, break: 1 }),
                  new TextRun({ text: ` | ${ref.email} | ${ref.phone}`, break: 1 })
                ],
                spacing: { after: 100 }
              })
            )
          ] : [])
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  }

  static exportToHTML(resumeData: ResumeData, template: string = 'modern'): string {
    const styles = this.getHTMLStyles(template);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>${styles}</style>
</head>
<body>
    <div class="resume">
        <header class="header">
            <h1>${resumeData.personalInfo.fullName}</h1>
            <div class="contact">
                <span>${resumeData.personalInfo.email}</span>
                <span>${resumeData.personalInfo.phone}</span>
                <span>${resumeData.personalInfo.location}</span>
                ${resumeData.personalInfo.linkedin ? `<span>${resumeData.personalInfo.linkedin}</span>` : ''}
            </div>
        </header>

        <section class="summary">
            <h2>Professional Summary</h2>
            <p>${resumeData.personalInfo.summary}</p>
        </section>

        <section class="experience">
            <h2>Professional Experience</h2>
            ${resumeData.experience.map(exp => `
                <div class="job">
                    <div class="job-header">
                        <h3>${exp.position}</h3>
                        <span class="company">${exp.company}</span>
                        <span class="dates">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p class="description">${exp.description}</p>
                    <ul class="achievements">
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </section>

        <section class="education">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
                <div class="degree">
                    <h3>${edu.degree} in ${edu.field}</h3>
                    <span class="school">${edu.institution}</span>
                    <span class="dates">${edu.startDate} - ${edu.endDate}</span>
                </div>
            `).join('')}
        </section>

        <section class="skills">
            <h2>Skills</h2>
            <div class="skill-list">
                ${resumeData.skills.map(skill => `<span class="skill">${skill.name}</span>`).join('')}
            </div>
        </section>

        ${resumeData.references.length > 0 ? `
        <section class="references">
            <h2>References</h2>
            ${resumeData.references.map(ref => `
                <div class="reference">
                    <h3>${ref.name}</h3>
                    <span class="title">${ref.title}</span>
                    <span class="company">${ref.company}</span>
                    <div class="contact-info">
                        <span>${ref.email}</span>
                        <span>${ref.phone}</span>
                    </div>
                </div>
            `).join('')}
        </section>
        ` : ''}
    </div>
</body>
</html>`;
  }

  private static getHTMLStyles(template: string): string {
    const baseStyles = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .resume { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .contact span { font-size: 0.9em; }
        section { margin-bottom: 25px; }
        h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-bottom: 15px; }
        .job, .degree { margin-bottom: 20px; }
        .job-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .job-header h3 { color: #2c3e50; }
        .company, .school { font-weight: bold; color: #7f8c8d; }
        .dates { font-style: italic; color: #95a5a6; }
        .achievements { margin-left: 20px; margin-top: 8px; }
        .skill-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #ecf0f1; padding: 5px 10px; border-radius: 15px; font-size: 0.9em; }
        .reference { margin-bottom: 15px; }
        .reference h3 { color: #2c3e50; margin-bottom: 5px; }
        .reference .title { font-weight: bold; color: #7f8c8d; }
        .reference .company { color: #95a5a6; margin-left: 10px; }
        .contact-info { margin-top: 5px; }
        .contact-info span { margin-right: 15px; font-size: 0.9em; color: #7f8c8d; }
    `;

    if (template === 'creative') {
      return baseStyles + `
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
        h2 { color: #667eea; }
        .skill { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      `;
    }

    return baseStyles;
  }

  static downloadHTML(content: string, filename: string = 'resume.html'): void {
    const blob = new Blob([content], { type: 'text/html' });
    saveAs(blob, filename);
  }
}