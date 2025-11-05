import { AIGenerationRequest } from '../types/resume';

// Mock AI service - In production, integrate with OpenAI, Claude, or similar
export class AIService {
  private static readonly PROFESSIONAL_SUMMARIES: Record<string, string[]> = {
    'software-engineer': [
      'Innovative Software Engineer with {years} years of experience developing scalable web applications and robust backend systems.',
      'Results-driven Software Engineer specializing in full-stack development with expertise in modern frameworks and cloud technologies.',
      'Passionate Software Engineer with a proven track record of delivering high-quality code and leading cross-functional teams.'
    ],
    'data-scientist': [
      'Data-driven professional with {years} years of experience in machine learning, statistical analysis, and predictive modeling.',
      'Experienced Data Scientist skilled in extracting actionable insights from complex datasets using advanced analytics.',
      'Results-oriented Data Scientist with expertise in Python, R, and cloud-based data platforms.'
    ],
    'marketing-manager': [
      'Strategic Marketing Manager with {years} years of experience driving brand growth and customer acquisition.',
      'Creative Marketing Manager specializing in digital campaigns, content strategy, and performance analytics.',
      'Results-focused Marketing Manager with proven success in increasing revenue and market share.'
    ]
  };

  private static readonly SKILL_KEYWORDS: Record<string, string[]> = {
    'software-engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'Agile', 'REST APIs', 'Database Design'],
    'data-scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'Tableau', 'Statistics', 'Data Visualization', 'Big Data'],
    'marketing-manager': ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'Campaign Management', 'A/B Testing', 'CRM', 'Brand Management', 'Lead Generation']
  };

  static generateProfessionalSummary(request: AIGenerationRequest): string {
    const jobKey = this.normalizeJobTitle(request.jobTitle || '');
    const templates = this.PROFESSIONAL_SUMMARIES[jobKey] || this.PROFESSIONAL_SUMMARIES['software-engineer'];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const years = this.extractYearsFromExperience(request.experience || '');
    return template.replace('{years}', years.toString());
  }

  static generateJobDescription(company: string, position: string, achievements: string[]): string {
    const baseDescriptions = [
      `Led key initiatives at ${company} as ${position}, driving innovation and operational excellence.`,
      `Contributed to ${company}'s success through strategic ${position} responsibilities and cross-team collaboration.`,
      `Delivered exceptional results at ${company} in the ${position} role, focusing on quality and efficiency.`
    ];

    const base = baseDescriptions[Math.floor(Math.random() * baseDescriptions.length)];
    
    if (achievements.length > 0) {
      const achievementText = achievements.slice(0, 3).map(achievement => 
        achievement.startsWith('•') ? achievement : `• ${achievement}`
      ).join(' ');
      return `${base} ${achievementText}`;
    }

    return base;
  }

  static suggestSkills(jobTitle: string, industry?: string): string[] {
    const jobKey = this.normalizeJobTitle(jobTitle);
    const baseSkills = this.SKILL_KEYWORDS[jobKey] || this.SKILL_KEYWORDS['software-engineer'];
    
    // Add industry-specific skills
    const industrySkills = industry ? this.getIndustrySkills(industry) : [];
    
    return [...baseSkills, ...industrySkills].slice(0, 12);
  }

  static optimizeForATS(content: string, jobDescription?: string): string {
    if (!jobDescription) return content;

    // Extract keywords from job description
    const keywords = this.extractKeywords(jobDescription);
    
    // Simple keyword integration (in production, use more sophisticated NLP)
    let optimized = content;
    keywords.slice(0, 5).forEach(keyword => {
      if (!optimized.toLowerCase().includes(keyword.toLowerCase())) {
        optimized += ` Experienced with ${keyword}.`;
      }
    });

    return optimized;
  }

  static generateAchievements(position: string, _company: string): string[] {
    const achievementTemplates = [
      `Improved system performance by 30% through optimization initiatives`,
      `Led a team of 5+ developers on critical project deliverables`,
      `Reduced processing time by 25% through innovative solutions`,
      `Collaborated with cross-functional teams to deliver projects on time`,
      `Implemented best practices that increased code quality and maintainability`
    ];

    return achievementTemplates.slice(0, 3).map(template => 
      template.replace('system', position.toLowerCase().includes('manager') ? 'team' : 'system')
    );
  }

  private static normalizeJobTitle(jobTitle: string): keyof typeof AIService.PROFESSIONAL_SUMMARIES {
    const normalized = jobTitle.toLowerCase().replace(/[^a-z\s]/g, '');
    
    if (normalized.includes('software') || normalized.includes('developer') || normalized.includes('engineer')) {
      return 'software-engineer';
    }
    if (normalized.includes('data') || normalized.includes('scientist') || normalized.includes('analyst')) {
      return 'data-scientist';
    }
    if (normalized.includes('marketing') || normalized.includes('manager')) {
      return 'marketing-manager';
    }
    
    return 'software-engineer';
  }

  private static extractYearsFromExperience(experience: string): number {
    const yearMatch = experience.match(/(\d+)\s*year/i);
    return yearMatch ? parseInt(yearMatch[1]) : 3;
  }

  private static getIndustrySkills(industry: string): string[] {
    const industryMap: Record<string, string[]> = {
      'fintech': ['Blockchain', 'Cryptocurrency', 'Financial Modeling', 'Compliance'],
      'healthcare': ['HIPAA', 'Medical Software', 'Healthcare Analytics', 'Telemedicine'],
      'ecommerce': ['E-commerce Platforms', 'Payment Processing', 'Inventory Management', 'Customer Analytics']
    };

    return industryMap[industry.toLowerCase()] || [];
  }

  private static extractKeywords(jobDescription: string): string[] {
    // Simple keyword extraction (in production, use NLP libraries)
    const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an']);
    const words = jobDescription.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word));

    // Count frequency and return top keywords
    const frequency: Record<string, number> = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }
}