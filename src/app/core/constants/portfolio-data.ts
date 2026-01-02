// ======================
// TYPES
// ======================

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'ai'
  | 'devops'
  | 'tools'
  | 'methodologies';
export type SkillLevel = 'intermediate' | 'advanced' | 'expert';
export type ProjectCategory = 'web' | 'mobile' | 'ai' | 'automation' | 'other';

export interface PersonalInfo {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  bio: {
    short: string;
    long: string[];
  };
  social: {
    github: string;
    linkedin: string;
  };
  resumeUrl?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
  links?: {
    github?: string;
    live?: string;
  };
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  technologies: string[];
  icon?: 'briefcase' | 'code';
}

export interface NavLink {
  label: string;
  href: string;
  translationKey: string;
}

// ======================
// DATA
// ======================

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Paul Guerrero Linares',
  initials: 'PGL',
  role: 'Software Engineer',
  location: 'Spain',
  email: 'pguerrerolinares@gmail.com',
  bio: {
    short:
      'Software Engineer specializing in full-stack development with expertise in Angular, Spring Boot, and AI/ML pipelines.',
    long: [
      'Computer engineer with a solid foundation in both backend and frontend development. I enjoy building scalable applications and exploring the intersection of software engineering and artificial intelligence.',
      'Currently focused on digital banking solutions and intelligent document processing pipelines. Passionate about clean code, modern architectures, and continuous learning.',
      'When not coding, I explore new technologies, contribute to open source, and experiment with AI models for document understanding.',
    ],
  },
  social: {
    github: 'https://github.com/pguerrerolinares',
    linkedin:
      'https://www.linkedin.com/in/paul-guerrero-linares-584759134',
  },
  resumeUrl: '/resume.pdf',
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'Angular', category: 'frontend', level: 'expert' },
  { name: 'React', category: 'frontend', level: 'advanced' },
  { name: 'Next.js', category: 'frontend', level: 'advanced' },
  { name: 'TypeScript', category: 'frontend', level: 'expert' },
  { name: 'Ionic', category: 'frontend', level: 'expert' },
  { name: 'Capacitor', category: 'frontend', level: 'expert' },

  // Backend
  { name: 'Java', category: 'backend', level: 'expert' },
  { name: 'Spring Boot', category: 'backend', level: 'expert' },
  { name: 'Node.js', category: 'backend', level: 'advanced' },
  { name: 'Python', category: 'backend', level: 'expert' },
  { name: 'FastAPI', category: 'backend', level: 'advanced' },
  { name: 'Django', category: 'backend', level: 'intermediate' },

  // AI/ML
  { name: 'OCR Pipelines', category: 'ai', level: 'expert' },
  { name: 'Computer Vision', category: 'ai', level: 'advanced' },
  { name: 'LLMs/VLMs', category: 'ai', level: 'advanced' },
  { name: 'docTR', category: 'ai', level: 'expert' },
  { name: 'PaddleOCR', category: 'ai', level: 'expert' },
  { name: 'LayoutLMv3', category: 'ai', level: 'advanced' },

  // DevOps
  { name: 'Docker', category: 'devops', level: 'expert' },
  { name: 'Kubernetes', category: 'devops', level: 'advanced' },
  { name: 'GitLab CI/CD', category: 'devops', level: 'expert' },
  { name: 'AWS', category: 'devops', level: 'advanced' },
  { name: 'JBoss EAP', category: 'devops', level: 'advanced' },

  // Tools
  { name: 'Git', category: 'tools', level: 'expert' },
  { name: 'Maven', category: 'tools', level: 'expert' },
  { name: 'Veracode', category: 'tools', level: 'advanced' },

  // Methodologies
  { name: 'Scrum', category: 'methodologies', level: 'expert' },
  { name: 'Agile', category: 'methodologies', level: 'expert' },
];

export const PROJECTS: Project[] = [
  {
    id: 'ocr-pipeline',
    title: '', // Translated via i18n
    description: '', // Translated via i18n
    category: 'ai',
    technologies: [
      'Python',
      'docTR',
      'PaddleOCR',
      'LayoutLMv3',
      'Docker',
      'Kubernetes',
    ],
    featured: true,
    links: {
      github: 'https://github.com/pguerrerolinares',
    },
  },
  {
    id: 'finnk-onboarding',
    title: '',
    description: '',
    category: 'web',
    technologies: ['Angular', 'Ionic', 'Java', 'Spring', 'Kubernetes'],
    featured: true,
  },
  {
    id: 'iot-dashboard',
    title: '',
    description: '',
    category: 'web',
    technologies: [
      'Angular',
      'Spring Boot',
      'AWS IoT',
      'Lambda',
      'WebSockets',
    ],
    featured: true,
  },
  {
    id: 'automation-toolkit',
    title: '',
    description: '',
    category: 'automation',
    technologies: ['Python', 'Selenium', 'BeautifulSoup', 'Docker'],
    featured: false,
    links: {
      github: 'https://github.com/pguerrerolinares',
    },
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'finnk',
    company: '', // Translated via i18n
    role: '', // Translated via i18n
    location: 'Spain',
    startDate: '2024-09',
    current: true,
    highlights: ['0', '1', '2', '3'], // Indices for translation keys
    technologies: [
      'Angular',
      'Ionic',
      'Capacitor',
      'Java',
      'Spring',
      'Kubernetes',
      'GitLab CI',
    ],
    icon: 'briefcase',
  },
  {
    id: 'onnera',
    company: '',
    role: '',
    location: 'Spain',
    startDate: '2022-01',
    endDate: '2024-06',
    current: false,
    highlights: ['0', '1', '2'],
    technologies: [
      'Angular',
      'Spring Boot',
      'AWS Lambda',
      'AWS IoT',
      'SQS',
      'SNS',
      'Scrum',
    ],
    icon: 'briefcase',
  },
  {
    id: 'personal',
    company: '',
    role: '',
    startDate: '2021-01',
    current: true,
    highlights: ['0', '1', '2'],
    technologies: [
      'Python',
      'Docker',
      'OCR',
      'docTR',
      'PaddleOCR',
      'LayoutLMv3',
      'Qwen3-VL',
    ],
    icon: 'code',
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about', translationKey: 'nav.about' },
  { label: 'Projects', href: '#projects', translationKey: 'nav.projects' },
  {
    label: 'Experience',
    href: '#experience',
    translationKey: 'nav.experience',
  },
  { label: 'Contact', href: '#contact', translationKey: 'nav.contact' },
];

export const STATS = {
  yearsExperience: 4,
  technologies: 30,
  projects: 10,
};

// ======================
// HELPERS
// ======================

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return SKILLS.filter((skill) => skill.category === category);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getProjectCategoryColor(
  category: ProjectCategory
): string {
  const colors: Record<ProjectCategory, string> = {
    web: 'var(--category-web)',
    mobile: 'var(--category-mobile)',
    ai: 'var(--category-ai)',
    automation: 'var(--category-automation)',
    other: 'var(--category-other)',
  };
  return colors[category];
}
