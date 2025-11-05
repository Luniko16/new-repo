import { ResumeData, ResumeTemplate } from '../types/resume';

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  references: []
};

export const defaultTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design perfect for tech and business roles',
    preview: '/templates/modern-preview.png',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold, colorful template for creative professionals',
    preview: '/templates/creative-preview.png',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#ec4899'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    id: 'executive',
    name: 'Executive Classic',
    description: 'Traditional, elegant design for senior positions',
    preview: '/templates/executive-preview.png',
    colors: {
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#059669'
    },
    fonts: {
      heading: 'Georgia',
      body: 'Inter'
    }
  }
];

export const industryKeywords = {
  'Technology': ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Agile', 'Scrum', 'DevOps'],
  'Marketing': ['Digital Marketing', 'SEO', 'SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'Campaign Management', 'A/B Testing', 'CRM', 'Lead Generation'],
  'Finance': ['Financial Analysis', 'Risk Management', 'Excel', 'SQL', 'Bloomberg', 'Financial Modeling', 'Compliance', 'Auditing', 'Investment Analysis', 'Portfolio Management'],
  'Healthcare': ['Patient Care', 'Medical Records', 'HIPAA', 'Clinical Research', 'Healthcare Analytics', 'Telemedicine', 'Medical Software', 'Quality Assurance', 'Regulatory Compliance', 'EMR'],
  'Sales': ['Lead Generation', 'CRM', 'Salesforce', 'Pipeline Management', 'Client Relations', 'Negotiation', 'Account Management', 'Revenue Growth', 'Market Analysis', 'Prospecting']
};