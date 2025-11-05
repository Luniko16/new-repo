import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ReferencesForm from './forms/ReferencesForm';

interface ResumeBuilderProps {
  resumeData: ResumeData;
  onUpdateData: (data: Partial<ResumeData>) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { id: 0, title: 'Personal Info', description: 'Basic contact information and professional summary' },
  { id: 1, title: 'Experience', description: 'Work history and achievements' },
  { id: 2, title: 'Education', description: 'Academic background and certifications' },
  { id: 3, title: 'Skills', description: 'Technical and soft skills' },
  { id: 4, title: 'References', description: 'Professional references and contacts' }
];

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resumeData,
  onUpdateData,
  currentStep,
  onStepChange
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(personalInfo) => onUpdateData({ personalInfo })}
            isGenerating={isGenerating}
            onGenerateContent={setIsGenerating}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(experience) => onUpdateData({ experience })}
            isGenerating={isGenerating}
            onGenerateContent={setIsGenerating}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(education) => onUpdateData({ education })}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(skills) => onUpdateData({ skills })}
            isGenerating={isGenerating}
            onGenerateContent={setIsGenerating}
          />
        );
      case 4:
        return (
          <ReferencesForm
            references={resumeData.references}
            onUpdate={(references) => onUpdateData({ references })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* AI Enhancement Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-primary-900">
            AI-Powered Content Generation
          </span>
        </div>
        <p className="text-sm text-primary-700 mt-1">
          Let AI help you create professional content tailored to your industry and role.
        </p>
      </div>

      {/* Current Form */}
      <div className="mb-8">
        {renderCurrentForm()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="btn btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="btn btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;