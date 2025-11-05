export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  references: Reference[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface AIGenerationRequest {
  jobTitle?: string;
  industry?: string;
  experience?: string;
  skills?: string[];
  jobDescription?: string;
}