
export type Theme = 'light' | 'dark';

export type ViewState = 'home' | 'about' | 'projects' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  technologies: string[];
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  year: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  aboutText: string;
  avatar: string;
  banner: string;
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}
