import React from 'react';
import { ResumeTemplate } from '../types/resume';
import { Check, Palette } from 'lucide-react';

interface TemplateSelectorProps {
  templates: ResumeTemplate[];
  selectedTemplate: ResumeTemplate;
  onSelectTemplate: (template: ResumeTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a professional template that matches your style and industry. 
          You can customize colors and fonts after selection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
              selectedTemplate.id === template.id
                ? 'ring-2 ring-primary-500 ring-offset-2'
                : 'hover:scale-105'
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 p-6 relative overflow-hidden">
              <div 
                className="w-full h-full rounded-lg shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}15 0%, ${template.colors.accent}15 100%)`
                }}
              >
                {/* Mock Resume Content */}
                <div className="p-4 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <div 
                      className="h-3 w-24 mx-auto mb-2 rounded"
                      style={{ backgroundColor: template.colors.primary }}
                    />
                    <div className="h-1 w-16 mx-auto bg-gray-300 rounded" />
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div>
                      <div 
                        className="h-2 w-16 mb-1 rounded"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-200 rounded" />
                        <div className="h-1 w-3/4 bg-gray-200 rounded" />
                      </div>
                    </div>
                    
                    <div>
                      <div 
                        className="h-2 w-20 mb-1 rounded"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-gray-200 rounded" />
                        <div className="h-1 w-5/6 bg-gray-200 rounded" />
                        <div className="h-1 w-2/3 bg-gray-200 rounded" />
                      </div>
                    </div>
                    
                    <div>
                      <div 
                        className="h-2 w-12 mb-1 rounded"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                      <div className="flex flex-wrap gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div 
                            key={i}
                            className="h-1 w-8 rounded"
                            style={{ backgroundColor: template.colors.accent }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                {selectedTemplate.id === template.id && (
                  <div className="flex items-center justify-center w-6 h-6 bg-primary-600 rounded-full">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>

              {/* Color Palette */}
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-4 h-4 text-gray-500" />
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: template.colors.accent }}
                  />
                </div>
              </div>

              {/* Font Info */}
              <div className="text-xs text-gray-500">
                <span className="font-medium">Fonts:</span> {template.fonts.heading}, {template.fonts.body}
              </div>
            </div>

            {/* Selection Button */}
            <div className="px-6 pb-6">
              <button
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedTemplate.id === template.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedTemplate.id === template.id ? 'Selected' : 'Select Template'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customization Options */}
      {selectedTemplate && (
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Customize "{selectedTemplate.name}"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Color Scheme</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-600 w-20">Primary:</label>
                  <input
                    type="color"
                    defaultValue={selectedTemplate.colors.primary}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-500">{selectedTemplate.colors.primary}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-600 w-20">Secondary:</label>
                  <input
                    type="color"
                    defaultValue={selectedTemplate.colors.secondary}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-500">{selectedTemplate.colors.secondary}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-600 w-20">Accent:</label>
                  <input
                    type="color"
                    defaultValue={selectedTemplate.colors.accent}
                    className="w-12 h-8 rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-500">{selectedTemplate.colors.accent}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Heading Font:</label>
                  <select className="input">
                    <option value="Inter">Inter</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Body Font:</label>
                  <select className="input">
                    <option value="Inter">Inter</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary">
              Apply Customizations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;