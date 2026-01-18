import { Application, Notification, Role, User, ActorProfile } from './types';

export const mockUser: User = {
  id: 'user-1',
  role: 'actor',
  name: 'Riya Kapoor',
  email: 'riya@lumina.com'
};

export const mockDirector: User = {
  id: 'director-1',
  role: 'director',
  name: 'Arjun Mehta',
  email: 'arjun@lumina.com'
};

export const mockActorProfile: ActorProfile = {
  id: 'actor-1',
  name: 'Riya Kapoor',
  age: 26,
  gender: 'Female',
  city: 'Mumbai',
  languages: ['Hindi', 'English', 'Marathi'],
  skills: ['drama', 'dance', 'comedy', 'improvisation'],
  experienceLevel: 'Intermediate'
};

export const mockRoles: Role[] = [
  {
    id: 'role-1',
    directorId: 'director-1',
    projectName: 'Neon City',
    projectType: 'web series',
    title: 'Lead Detective',
    description: 'Intense lead role for a cyberpunk thriller with layered emotional beats.',
    gender: 'Any',
    ageMin: 25,
    ageMax: 35,
    location: 'Mumbai',
    dates: 'Aug 12 - Sep 20',
    duration: '4 weeks',
    payType: 'range',
    payMin: 80000,
    payMax: 120000,
    tags: ['thriller', 'action', 'drama'],
    requirements: ['portfolio', 'self-tape'],
    status: 'open',
    createdAt: '2024-07-02'
  },
  {
    id: 'role-2',
    directorId: 'director-1',
    projectName: 'Aurora',
    projectType: 'music video',
    title: 'Lead Dancer',
    description: 'High-energy dancer with strong stage presence and fluid freestyle skills.',
    gender: 'Female',
    ageMin: 20,
    ageMax: 28,
    location: 'Delhi',
    dates: 'Aug 18 - Aug 22',
    duration: '5 days',
    payType: 'fixed',
    payMin: 45000,
    payMax: 45000,
    tags: ['dance', 'performance', 'music'],
    requirements: ['portfolio'],
    status: 'casting soon',
    createdAt: '2024-07-10'
  },
  {
    id: 'role-3',
    directorId: 'director-1',
    projectName: 'Midnight Signal',
    projectType: 'film',
    title: 'Supporting Hacker',
    description: 'Supporting role with witty banter, quick pacing, and tech-forward flair.',
    gender: 'Any',
    ageMin: 22,
    ageMax: 32,
    location: 'Bengaluru',
    dates: 'Sep 05 - Oct 01',
    duration: '3 weeks',
    payType: 'range',
    payMin: 60000,
    payMax: 90000,
    tags: ['comedy', 'tech', 'supporting'],
    requirements: ['portfolio'],
    status: 'open',
    createdAt: '2024-07-15'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    roleId: 'role-1',
    actorId: 'actor-1',
    message: 'Excited to bring intensity and nuance to this lead role.',
    portfolioLinks: ['https://reel.com/riya'],
    availability: 'Full availability in August and September',
    status: 'applied',
    createdAt: '2024-07-20'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'note-1',
    userId: 'actor-1',
    type: 'role',
    title: 'New role matches your skills',
    body: 'Lead Detective in Neon City matches drama + action.',
    createdAt: '2024-07-20T10:20:00Z',
    read: false
  },
  {
    id: 'note-2',
    userId: 'actor-1',
    type: 'message',
    title: 'Director sent a message',
    body: 'We loved your reel, let’s schedule a callback.',
    createdAt: '2024-07-18T12:00:00Z',
    read: true
  }
];
