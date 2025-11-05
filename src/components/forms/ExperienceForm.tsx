import React, { useState } from 'react';
import { Experience } from '../../types/resume';
import { AIService } from '../../services/aiService';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  isGenerating: boolean;
  onGenerateContent: (generating: boolean) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  onUpdate,
  isGenerating,
  onGenerateContent
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    
    onUpdate([...data, newExperience]);
    setExpandedIndex(data.length);
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = data.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const addAchievement = (expIndex: number) => {
    const updated = data.map((exp, i) => 
      i === expIndex 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    onUpdate(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = data.map((exp, i) => 
      i === expIndex 
        ? { 
            ...exp, 
            achievements: exp.achievements.map((ach, j) => 
              j === achIndex ? value : ach
            )
          }
        : exp
    );
    onUpdate(updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = data.map((exp, i) => 
      i === expIndex 
        ? { 
            ...exp, 
            achievements: exp.achievements.filter((_, j) => j !== achIndex)
          }
        : exp
    );
    onUpdate(updated);
  };

  const generateDescription = async (index: number) => {
    const experience = data[index];
    if (!experience.company || !experience.position) {
      alert('Please enter company and position first');
      return;
    }

    onGenerateContent(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedDescription = AIService.generateJobDescription(
        experience.company,
        experience.position,
        experience.achievements
      );
      
      updateExperience(index, 'description', generatedDescription);
    } catch (error) {
      console.error('Failed to generate description:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      onGenerateContent(false);
    }
  };

  const generateAchievements = async (index: number) => {
    const experience = data[index];
    if (!experience.position) {
      alert('Please enter position first');
      return;
    }

    onGenerateContent(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedAchievements = AIService.generateAchievements(
        experience.position,
        experience.company
      );
      
      updateExperience(index, 'achievements', generatedAchievements);
    } catch (error) {
      console.error('Failed to generate achievements:', error);
      alert('Failed to generate achievements. Please try again.');
    } finally {
      onGenerateContent(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={experience.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-left flex-1"
                >
                  <h4 className="font-medium text-gray-900">
                    {experience.position || 'New Position'} 
                    {experience.company && ` at ${experience.company}`}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </p>
                </button>
                
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {expandedIndex === index && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        className="input"
                        placeholder="Software Engineer"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="input"
                        placeholder="Tech Corp"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <div className="space-y-2">
                        <input
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          className="input"
                          disabled={experience.current}
                        />
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={experience.current}
                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">Currently working here</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Description
                      </label>
                      <button
                        onClick={() => generateDescription(index)}
                        disabled={isGenerating}
                        className="btn btn-secondary text-xs flex items-center space-x-1"
                      >
                        {isGenerating ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        <span>AI Generate</span>
                      </button>
                    </div>
                    <textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="textarea"
                      rows={3}
                      placeholder="Brief description of your role and responsibilities..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Key Achievements
                      </label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => generateAchievements(index)}
                          disabled={isGenerating}
                          className="btn btn-secondary text-xs flex items-center space-x-1"
                        >
                          {isGenerating ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="h-3 w-3" />
                          )}
                          <span>AI Generate</span>
                        </button>
                        <button
                          onClick={() => addAchievement(index)}
                          className="btn btn-secondary text-xs flex items-center space-x-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                            className="input flex-1"
                            placeholder="Increased team productivity by 25%..."
                          />
                          <button
                            onClick={() => removeAchievement(index, achIndex)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;