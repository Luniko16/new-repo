import React, { useState } from 'react';
import { Skill } from '../../types/resume';
import { AIService } from '../../services/aiService';
import { industryKeywords } from '../../data/defaults';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
  isGenerating: boolean;
  onGenerateContent: (generating: boolean) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  onUpdate,
  isGenerating,
  onGenerateContent
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Skill['category']>('technical');
  const [selectedLevel, setSelectedLevel] = useState<Skill['level']>('intermediate');
  const [jobTitle, setJobTitle] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category: selectedCategory,
      level: selectedLevel
    };

    onUpdate([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onUpdate(data.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onUpdate(data.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const generateSkills = async () => {
    if (!jobTitle) {
      alert('Please enter a job title to generate relevant skills');
      return;
    }

    onGenerateContent(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestedSkills = AIService.suggestSkills(jobTitle, selectedIndustry);
      
      const newSkills: Skill[] = suggestedSkills.map((skillName, index) => ({
        id: (Date.now() + index).toString(),
        name: skillName,
        category: 'technical' as const,
        level: 'intermediate' as const
      }));

      // Merge with existing skills, avoiding duplicates
      const existingSkillNames = new Set(data.map(s => s.name.toLowerCase()));
      const uniqueNewSkills = newSkills.filter(
        skill => !existingSkillNames.has(skill.name.toLowerCase())
      );

      onUpdate([...data, ...uniqueNewSkills]);
    } catch (error) {
      console.error('Failed to generate skills:', error);
      alert('Failed to generate skills. Please try again.');
    } finally {
      onGenerateContent(false);
    }
  };

  const addIndustrySkills = (industry: string) => {
    const skills = industryKeywords[industry as keyof typeof industryKeywords] || [];
    const existingSkillNames = new Set(data.map(s => s.name.toLowerCase()));
    
    const newSkills: Skill[] = skills
      .filter(skillName => !existingSkillNames.has(skillName.toLowerCase()))
      .map((skillName, index) => ({
        id: (Date.now() + index).toString(),
        name: skillName,
        category: 'technical' as const,
        level: 'intermediate' as const
      }));

    onUpdate([...data, ...newSkills]);
  };

  const skillsByCategory = {
    technical: data.filter(skill => skill.category === 'technical'),
    soft: data.filter(skill => skill.category === 'soft'),
    language: data.filter(skill => skill.category === 'language')
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'beginner': return 'bg-red-100 text-red-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
        
        {/* AI Skills Generation */}
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-primary-900 mb-3">AI-Powered Skill Suggestions</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
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
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="input"
              >
                <option value="">Select Industry</option>
                {Object.keys(industryKeywords).map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={generateSkills}
              disabled={isGenerating || !jobTitle}
              className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>Generate AI Skills</span>
            </button>

            {selectedIndustry && (
              <button
                onClick={() => addIndustrySkills(selectedIndustry)}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add {selectedIndustry} Skills</span>
              </button>
            )}
          </div>
        </div>

        {/* Manual Skill Addition */}
        <div className="border rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Add Custom Skill</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="input"
                placeholder="Enter skill name"
              />
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Skill['category'])}
                className="input"
              >
                <option value="technical">Technical</option>
                <option value="soft">Soft Skill</option>
                <option value="language">Language</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as Skill['level'])}
                className="input flex-1"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              
              <button
                onClick={addSkill}
                className="btn btn-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Display by Category */}
      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-900 mb-3 capitalize">
              {category} Skills ({skills.length})
            </h4>
            
            {skills.length === 0 ? (
              <p className="text-gray-500 text-sm">No {category} skills added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="font-medium text-gray-900 bg-transparent border-none p-0 focus:ring-0 w-full"
                      />
                      <div className="flex items-center space-x-2 mt-1">
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                          className="text-xs border-none p-0 focus:ring-0 bg-transparent"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-800 p-1 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-medium text-green-900 mb-2">Skills Optimization Tips:</h5>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Include 8-12 relevant skills for your target role</li>
            <li>• Mix technical skills with soft skills</li>
            <li>• Use industry-standard terminology</li>
            <li>• Be honest about your skill levels</li>
            <li>• Prioritize skills mentioned in job descriptions</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;