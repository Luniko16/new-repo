import React, { useState } from 'react';
import { PersonalInfo } from '../../types/resume';
import { AIService } from '../../services/aiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  isGenerating: boolean;
  onGenerateContent: (generating: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onUpdate,
  isGenerating,
  onGenerateContent
}) => {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const generateSummary = async () => {
    if (!jobTitle) {
      alert('Please enter a job title to generate a professional summary');
      return;
    }

    onGenerateContent(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedSummary = AIService.generateProfessionalSummary({
        jobTitle,
        industry,
        experience
      });
      
      handleInputChange('summary', generatedSummary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      onGenerateContent(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="input"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="input"
            placeholder="john.doe@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="input"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input"
            placeholder="New York, NY"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website/Portfolio
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      {/* AI Summary Generation */}
      <div className="border-t pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600">
            Generate an AI-powered professional summary based on your target role
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="input"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="input"
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="marketing">Marketing</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input"
            >
              <option value="">Select Experience</option>
              <option value="0-1 years">0-1 years</option>
              <option value="2-3 years">2-3 years</option>
              <option value="4-5 years">4-5 years</option>
              <option value="6-10 years">6-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateSummary}
          disabled={isGenerating || !jobTitle}
          className="btn btn-primary flex items-center space-x-2 mb-4 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>
            {isGenerating ? 'Generating...' : 'Generate AI Summary'}
          </span>
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            value={data.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            className="textarea"
            rows={4}
            placeholder="A brief professional summary highlighting your key strengths and career objectives..."
          />
          <p className="text-xs text-gray-500 mt-1">
            2-3 sentences that highlight your experience, skills, and career goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;