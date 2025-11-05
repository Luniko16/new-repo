# AI Resume Builder

A modern, AI-powered resume builder that helps users create professional, customized resumes with intelligent content generation and multiple export formats.

## 🚀 Features

### AI Content Generation
- **Smart Professional Summaries**: Generate tailored professional summaries based on job title, industry, and experience level
- **Job Description Enhancement**: AI-powered job descriptions and achievement suggestions
- **Industry-Specific Keywords**: Automatic keyword suggestions for different industries and roles
- **ATS Optimization**: Content optimization for Applicant Tracking Systems

### Multiple Export Options
- **PDF Export**: High-quality PDF generation with professional formatting
- **Word Document**: Export to DOCX format for easy editing
- **HTML Export**: Web-ready HTML files with embedded styling
- **Consistent Formatting**: Maintains professional appearance across all formats

### Professional Templates
- **Modern Professional**: Clean, contemporary design for tech and business roles
- **Creative Designer**: Bold, colorful template for creative professionals  
- **Executive Classic**: Traditional, elegant design for senior positions
- **Customizable**: Adjust colors, fonts, and layout elements

### References Section
- **Professional References**: Add and manage professional references with full contact details
- **Relationship Types**: Former Manager, Colleague, Client, Professor, Mentor options
- **Export Integration**: References included in all export formats (PDF, Word, HTML)
- **Form Validation**: Complete validation for contact information

### Intelligent Assistance
- **Real-time Suggestions**: Smart recommendations as you build your resume
- **Industry Best Practices**: Built-in guidance for resume optimization
- **Skill Recommendations**: AI-suggested skills based on job roles
- **Content Tips**: Contextual advice for each resume section

### User Experience
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile
- **Real-time Preview**: See your resume update as you make changes
- **Step-by-step Builder**: Intuitive form-based resume creation process
- **Local Storage**: Secure local data storage for privacy

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and building
- **Export Libraries**: 
  - jsPDF for PDF generation
  - docx for Word document creation
  - html2canvas for high-quality rendering
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router for navigation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Luniko16/new-repo.git
   cd new-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── forms/           # Form components for each resume section
│   │   ├── PersonalInfoForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── SkillsForm.tsx
│   │   └── ReferencesForm.tsx  # NEW: References management
│   ├── Header.tsx       # Navigation header
│   ├── ResumeBuilder.tsx # Main builder interface
│   ├── ResumePreview.tsx # Live resume preview
│   └── TemplateSelector.tsx # Template selection
├── services/            # Business logic and utilities
│   ├── aiService.ts     # AI content generation
│   ├── exportService.ts # Export functionality (updated with references)
│   └── storageService.ts # Local storage management
├── types/               # TypeScript type definitions
│   └── resume.ts        # Resume data structures (updated with references)
├── data/                # Static data and defaults
│   └── defaults.ts      # Default templates and data
└── App.tsx              # Main application component
```

## 🎯 Usage Guide

### 1. Personal Information
- Enter basic contact details
- Use AI to generate professional summaries
- Customize based on target job title and industry

### 2. Work Experience
- Add multiple positions with detailed descriptions
- Generate AI-powered job descriptions and achievements
- Include quantifiable accomplishments

### 3. Education
- Add degrees, certifications, and relevant coursework
- Include GPA if 3.5 or higher
- Order by most recent first

### 4. Skills
- Use AI suggestions based on job title and industry
- Categorize skills (Technical, Soft Skills, Languages)
- Set proficiency levels for each skill

### 5. References (NEW)
- Add professional references with complete contact information
- Select relationship type (Former Manager, Colleague, etc.)
- Edit and delete references as needed
- References automatically included in exports

### 6. Template Selection
- Choose from professional templates
- Customize colors and fonts
- Preview changes in real-time

### 7. Export Options
- Download as PDF for applications
- Export to Word for further editing
- Generate HTML for web portfolios

## 🤖 AI Features

### Content Generation
The AI service provides intelligent content suggestions:

- **Professional Summaries**: Tailored to job roles and experience levels
- **Job Descriptions**: Industry-appropriate language and terminology
- **Achievement Statements**: Quantifiable accomplishments and impact metrics
- **Skill Recommendations**: Role-specific technical and soft skills

### ATS Optimization
- Keyword integration from job descriptions
- Industry-standard terminology
- Proper formatting for parsing systems
- Content structure optimization

## 🎨 Customization

### Templates
Each template includes:
- Unique visual design and layout
- Customizable color schemes
- Font selection options
- Responsive design elements
- References section styling

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS components for complex layouts
- Consistent design system across templates
- Print-optimized styles for PDF export

## 💾 Data Management

### Local Storage
- Automatic saving of resume data
- Privacy-focused local storage
- Import/export functionality
- No server-side data storage

### Data Structure
- Modular resume sections
- Extensible skill categorization
- Flexible template system
- Version-compatible data formats

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Component-based architecture

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Future Enhancements

- Integration with real AI APIs (OpenAI, Claude)
- Advanced template customization
- Resume analytics and scoring
- Job matching recommendations
- Collaborative editing features
- Cloud storage integration
