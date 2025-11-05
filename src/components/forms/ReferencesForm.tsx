import { useState } from 'react';
import { Plus, Trash2, User, Building, Mail, Phone, Users } from 'lucide-react';
import { Reference } from '../../types/resume';

interface ReferencesFormProps {
  references: Reference[];
  onUpdate: (references: Reference[]) => void;
}

export default function ReferencesForm({ references, onUpdate }: ReferencesFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Reference, 'id'>>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    relationship: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing reference
      const updatedReferences = references.map(ref =>
        ref.id === editingId ? { ...formData, id: editingId } : ref
      );
      onUpdate(updatedReferences);
    } else {
      // Add new reference
      const newReference: Reference = {
        ...formData,
        id: Date.now().toString()
      };
      onUpdate([...references, newReference]);
    }
    
    resetForm();
  };

  const handleEdit = (reference: Reference) => {
    setFormData({
      name: reference.name,
      title: reference.title,
      company: reference.company,
      email: reference.email,
      phone: reference.phone,
      relationship: reference.relationship
    });
    setEditingId(reference.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(references.filter(ref => ref.id !== id));
  };

  const relationshipOptions = [
    'Former Manager',
    'Former Colleague',
    'Former Client',
    'Professor',
    'Mentor',
    'Business Partner',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">References</h3>
          <p className="text-sm text-gray-600">
            Add professional references who can speak to your work quality and character
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Reference
        </button>
      </div>

      {/* Reference List */}
      <div className="space-y-4">
        {references.map((reference) => (
          <div key={reference.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{reference.name}</h4>
                <p className="text-sm text-gray-600">{reference.title} at {reference.company}</p>
                <p className="text-sm text-gray-500">{reference.relationship}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {reference.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {reference.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(reference)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(reference.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Reference' : 'Add Reference'}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="w-4 h-4 inline mr-1" />
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ABC Corporation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  Relationship *
                </label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john.smith@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Update Reference' : 'Add Reference'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {references.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No references added yet</p>
          <p className="text-sm">Add professional references to strengthen your resume</p>
        </div>
      )}
    </div>
  );
}