import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeData, ResumeTemplate } from './types/resume';
import { StorageService } from './services/storageService';
import Header from './components/Header';
import ResumeBuilder from './components/ResumeBuilder';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';
import { defaultResumeData, defaultTemplates } from './data/defaults';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(defaultTemplates[0]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Load saved data on app start
    const savedData = StorageService.loadResumeData();
    if (savedData) {
      setResumeData(savedData);
    }
  }, []);

  useEffect(() => {
    // Auto-save data when it changes
    StorageService.saveResumeData(resumeData);
  }, [resumeData]);

  const updateResumeData = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/builder" replace />} 
          />
          
          <Route 
            path="/builder" 
            element={
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <ResumeBuilder
                      resumeData={resumeData}
                      onUpdateData={updateResumeData}
                      currentStep={currentStep}
                      onStepChange={setCurrentStep}
                    />
                  </div>
                  
                  <div className="lg:sticky lg:top-8">
                    <ResumePreview
                      resumeData={resumeData}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              </div>
            } 
          />
          
          <Route 
            path="/templates" 
            element={
              <TemplateSelector
                templates={defaultTemplates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
            } 
          />
          
          <Route 
            path="/preview" 
            element={
              <div className="container mx-auto px-4 py-8">
                <ResumePreview
                  resumeData={resumeData}
                  template={selectedTemplate}
                  fullScreen={true}
                />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;