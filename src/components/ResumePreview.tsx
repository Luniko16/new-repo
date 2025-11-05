import React from 'react';
import { ResumeData, ResumeTemplate } from '../types/resume';
import { ExportService } from '../services/exportService';
import { Download, FileText, Globe } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: ResumeTemplate;
  fullScreen?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  template,
  fullScreen = false
}) => {
  const handleExportPDF = async () => {
    try {
      await ExportService.exportToPDF(resumeData, `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const handleExportWord = async () => {
    try {
      await ExportService.exportToWord(resumeData, `${resumeData.personalInfo.fullName || 'resume'}.docx`);
    } catch (error) {
      console.error('Failed to export Word:', error);
      alert('Failed to export Word document. Please try again.');
    }
  };

  const handleExportHTML = () => {
    try {
      const htmlContent = ExportService.exportToHTML(resumeData, template.id);
      ExportService.downloadHTML(htmlContent, `${resumeData.personalInfo.fullName || 'resume'}.html`);
    } catch (error) {
      console.error('Failed to export HTML:', error);
      alert('Failed to export HTML. Please try again.');
    }
  };

  const renderModernTemplate = () => (
    <div className="bg-white shadow-lg" style={{ fontFamily: template.fonts.body }}>
      {/* Header */}
      <div 
        className="px-8 py-6 text-white"
        style={{ backgroundColor: template.colors.primary }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: template.fonts.heading }}>
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.linkedin && (
            <span>{resumeData.personalInfo.linkedin}</span>
          )}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="mb-6">
            <h2 
              className="text-xl font-semibold mb-3 pb-2 border-b-2"
              style={{ 
                color: template.colors.primary,
                borderColor: template.colors.accent,
                fontFamily: template.fonts.heading
              }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-xl font-semibold mb-4 pb-2 border-b-2"
              style={{ 
                color: template.colors.primary,
                borderColor: template.colors.accent,
                fontFamily: template.fonts.heading
              }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-xl font-semibold mb-4 pb-2 border-b-2"
              style={{ 
                color: template.colors.primary,
                borderColor: template.colors.accent,
                fontFamily: template.fonts.heading
              }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-xl font-semibold mb-4 pb-2 border-b-2"
              style={{ 
                color: template.colors.primary,
                borderColor: template.colors.accent,
                fontFamily: template.fonts.heading
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${template.colors.accent}20`,
                    color: template.colors.primary
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {resumeData.references.length > 0 && (
          <section>
            <h2 
              className="text-xl font-semibold mb-4 pb-2 border-b-2"
              style={{ 
                color: template.colors.primary,
                borderColor: template.colors.accent,
                fontFamily: template.fonts.heading
              }}
            >
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.references.map((reference) => (
                <div key={reference.id} className="space-y-1">
                  <h3 className="font-semibold text-gray-900">{reference.name}</h3>
                  <p className="text-sm text-gray-700">{reference.title}</p>
                  <p className="text-sm text-gray-700">{reference.company}</p>
                  <p className="text-sm text-gray-600">{reference.email}</p>
                  <p className="text-sm text-gray-600">{reference.phone}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white shadow-lg overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div 
          className="w-1/3 p-6 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.accent} 100%)`
          }}
        >
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {resumeData.personalInfo.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
              </span>
            </div>
            <h1 className="text-xl font-bold" style={{ fontFamily: template.fonts.heading }}>
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">Contact</h3>
            <div className="space-y-2 text-sm">
              {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
              {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
              {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-lg">Skills</h3>
              <div className="space-y-2">
                {resumeData.skills.slice(0, 8).map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2"
                        style={{ 
                          width: skill.level === 'expert' ? '100%' : 
                                 skill.level === 'advanced' ? '80%' : 
                                 skill.level === 'intermediate' ? '60%' : '40%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-6">
              <h2 
                className="text-xl font-semibold mb-3"
                style={{ color: template.colors.primary, fontFamily: template.fonts.heading }}
              >
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: template.colors.primary, fontFamily: template.fonts.heading }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: template.colors.accent }}>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: template.colors.primary, fontFamily: template.fonts.heading }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {resumeData.references.length > 0 && (
            <section>
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: template.colors.primary, fontFamily: template.fonts.heading }}
              >
                References
              </h2>
              <div className="space-y-3">
                {resumeData.references.map((reference) => (
                  <div key={reference.id} className="border-l-4 pl-4" style={{ borderColor: template.colors.accent }}>
                    <h3 className="font-semibold text-gray-900">{reference.name}</h3>
                    <p className="text-gray-700 font-medium">{reference.title}</p>
                    <p className="text-gray-700">{reference.company}</p>
                    <p className="text-sm text-gray-600">{reference.email}</p>
                    <p className="text-sm text-gray-600">{reference.phone}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div className="bg-white shadow-lg" style={{ fontFamily: template.fonts.body }}>
      {/* Header */}
      <div className="px-8 py-6 border-b-4" style={{ borderColor: template.colors.primary }}>
        <h1 
          className="text-4xl font-bold mb-2 text-center"
          style={{ 
            color: template.colors.primary,
            fontFamily: template.fonts.heading
          }}
        >
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-center text-gray-600">
          <div className="flex justify-center space-x-6 text-sm">
            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4 text-center"
              style={{ 
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-center italic">
              {resumeData.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ 
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-lg font-semibold" style={{ color: template.colors.secondary }}>
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-3 text-center">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span 
                            className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: template.colors.accent }}
                          />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 
                className="text-xl font-bold mb-4 text-center"
                style={{ 
                  color: template.colors.primary,
                  fontFamily: template.fonts.heading
                }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700">{edu.field}</p>
                    <p className="font-semibold" style={{ color: template.colors.secondary }}>
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 text-center"
                style={{ 
                  color: template.colors.primary,
                  fontFamily: template.fonts.heading
                }}
              >
                Core Competencies
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="text-center py-2 px-3 rounded border"
                    style={{ borderColor: template.colors.accent }}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* References */}
        {resumeData.references.length > 0 && (
          <section>
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ 
                color: template.colors.primary,
                fontFamily: template.fonts.heading
              }}
            >
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.references.map((reference) => (
                <div key={reference.id} className="text-center border rounded-lg p-4" style={{ borderColor: template.colors.accent }}>
                  <h3 className="font-bold text-gray-900 mb-1">{reference.name}</h3>
                  <p className="font-semibold" style={{ color: template.colors.secondary }}>
                    {reference.title}
                  </p>
                  <p className="text-gray-700 mb-2">{reference.company}</p>
                  <p className="text-sm text-gray-600">{reference.email}</p>
                  <p className="text-sm text-gray-600">{reference.phone}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template.id) {
      case 'creative':
        return renderCreativeTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className={fullScreen ? 'container mx-auto' : ''}>
      {/* Export Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {fullScreen ? 'Resume Preview' : 'Live Preview'}
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={handleExportPDF}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </button>
          
          <button
            onClick={handleExportWord}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Word</span>
          </button>
          
          <button
            onClick={handleExportHTML}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>HTML</span>
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div 
        id="resume-preview"
        className={`${fullScreen ? 'max-w-4xl mx-auto' : 'w-full'} bg-white`}
        style={{ 
          minHeight: '11in',
          aspectRatio: fullScreen ? '8.5/11' : 'auto'
        }}
      >
        {renderTemplate()}
      </div>

      {/* Template Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Using template: <span className="font-medium">{template.name}</span>
      </div>
    </div>
  );
};

export default ResumePreview;