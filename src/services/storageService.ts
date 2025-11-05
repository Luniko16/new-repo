import { ResumeData } from '../types/resume';

export class StorageService {
  private static readonly STORAGE_KEY = 'ai-resume-builder-data';
  private static readonly TEMPLATES_KEY = 'ai-resume-builder-templates';

  static saveResumeData(data: ResumeData): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save resume data:', error);
      throw new Error('Failed to save resume data to local storage');
    }
  }

  static loadResumeData(): ResumeData | null {
    try {
      const serialized = localStorage.getItem(this.STORAGE_KEY);
      if (!serialized) return null;
      
      return JSON.parse(serialized) as ResumeData;
    } catch (error) {
      console.error('Failed to load resume data:', error);
      return null;
    }
  }

  static clearResumeData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static saveTemplate(templateId: string, customizations: any): void {
    try {
      const templates = this.loadTemplates();
      templates[templateId] = customizations;
      localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error('Failed to save template customizations:', error);
    }
  }

  static loadTemplates(): Record<string, any> {
    try {
      const serialized = localStorage.getItem(this.TEMPLATES_KEY);
      return serialized ? JSON.parse(serialized) : {};
    } catch (error) {
      console.error('Failed to load template customizations:', error);
      return {};
    }
  }

  static exportData(): string {
    const resumeData = this.loadResumeData();
    const templates = this.loadTemplates();
    
    return JSON.stringify({
      resumeData,
      templates,
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.resumeData) {
        this.saveResumeData(data.resumeData);
      }
      
      if (data.templates) {
        localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(data.templates));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  static getStorageUsage(): { used: number; available: number } {
    let used = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    
    // Approximate localStorage limit (5MB in most browsers)
    const available = 5 * 1024 * 1024;
    
    return { used, available };
  }
}