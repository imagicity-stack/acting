export type UserRole = 'director' | 'actor';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export interface Role {
  id: string;
  directorId: string;
  projectName: string;
  projectType: 'film' | 'ad' | 'web series' | 'music video';
  title: string;
  description: string;
  gender: string;
  ageMin: number;
  ageMax: number;
  location: string;
  dates: string;
  duration: string;
  payType: 'fixed' | 'range';
  payMin: number;
  payMax: number;
  tags: string[];
  requirements: string[];
  status: 'open' | 'closed' | 'casting soon';
  createdAt: string;
}

export interface Application {
  id: string;
  roleId: string;
  actorId: string;
  message: string;
  portfolioLinks: string[];
  availability: string;
  status: 'applied' | 'shortlisted' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'role' | 'update' | 'message';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface ActorProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  languages: string[];
  skills: string[];
  experienceLevel: string;
}
