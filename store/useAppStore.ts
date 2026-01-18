'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Application, Notification, Role, User, ActorProfile } from '@/lib/types';
import {
  mockActorProfile,
  mockApplications,
  mockNotifications,
  mockRoles,
  mockUser
} from '@/lib/mock-data';

export type ThemeMode = 'dark' | 'light';

interface AppState {
  user: User;
  actorProfile: ActorProfile;
  roles: Role[];
  applications: Application[];
  notifications: Notification[];
  savedRoleIds: string[];
  appliedRoleIds: string[];
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  setUserRole: (role: User['role']) => void;
  addRole: (role: Role) => void;
  addApplication: (application: Application) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  toggleSaveRole: (roleId: string) => void;
  markNotificationRead: (id: string) => void;
  pushNotification: (notification: Notification) => void;
  updateActorProfile: (profile: ActorProfile) => void;
}

// Zustand keeps the app store lightweight and easy to extend with future API calls.
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: mockUser,
      actorProfile: mockActorProfile,
      roles: mockRoles,
      applications: mockApplications,
      notifications: mockNotifications,
      savedRoleIds: [],
      appliedRoleIds: ['role-1'],
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      setUserRole: (role) =>
        set((state) => ({
          user: { ...state.user, role }
        })),
      // TODO: Replace with API call once backend endpoints are available.
      addRole: (role) =>
        set((state) => ({
          roles: [role, ...state.roles]
        })),
      // TODO: Replace with API call once backend endpoints are available.
      addApplication: (application) =>
        set((state) => ({
          applications: [application, ...state.applications],
          appliedRoleIds: Array.from(new Set([application.roleId, ...state.appliedRoleIds]))
        })),
      updateApplicationStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((application) =>
            application.id === id ? { ...application, status } : application
          )
        })),
      toggleSaveRole: (roleId) =>
        set((state) => ({
          savedRoleIds: state.savedRoleIds.includes(roleId)
            ? state.savedRoleIds.filter((id) => id !== roleId)
            : [roleId, ...state.savedRoleIds]
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((note) =>
            note.id === id ? { ...note, read: true } : note
          )
        })),
      pushNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications]
        })),
      updateActorProfile: (profile) => set({ actorProfile: profile })
    }),
    {
      name: 'lumina-store'
    }
  )
);
