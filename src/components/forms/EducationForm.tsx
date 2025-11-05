import React, { useState } from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    
    onUpdate([...data, newEducation]);
    setExpandedIndex(data.length);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = data.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onUpdate(updated);
  };

  const removeEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree (PhD)',
    'Professional Degree (JD, MD, etc.)',
    'Certificate',
    'Diploma'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={education.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-left flex-1"
                >
                  <h4 className="font-medium text-gray-900">
                    {education.degree || 'New Degree'} 
                    {education.field && ` in ${education.field}`}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {education.institution}
                  </p>
                  <p className="text-sm text-gray-500">
                    {education.startDate} - {education.endDate}
                  </p>
                </button>
                
                <button
                  onClick={() => removeEducation(index)}
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
                        Institution *
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="input"
                        placeholder="University of Technology"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Type *
                      </label>
                      <select
                        value={education.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="input"
                        required
                      >
                        <option value="">Select Degree</option>
                        {degreeOptions.map(degree => (
                          <option key={degree} value={degree}>{degree}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study *
                      </label>
                      <input
                        type="text"
                        value={education.field}
                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                        className="input"
                        placeholder="Computer Science"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        value={education.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        className="input"
                        placeholder="3.8/4.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={education.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Tips for Education Section:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• List your most recent education first</li>
                      <li>• Include relevant coursework, honors, or achievements</li>
                      <li>• Only include GPA if it's 3.5 or higher</li>
                      <li>• For recent graduates, education can come before experience</li>
                    </ul>
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

export default EducationForm;