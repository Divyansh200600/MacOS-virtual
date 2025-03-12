"use client";

import { create } from 'zustand';
import { User, Window, DockItem } from '../types';

interface Store {
  isLoggedIn: boolean;
  currentUser: User | null;
  windows: Window[];
  dockItems: DockItem[];
  login: (username: string, password: string) => void;
  logout: () => void;
  addWindow: (window: Omit<Window, 'zIndex'>) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;
  bringToFront: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  isLoggedIn: false,
  currentUser: null,
  windows: [],
  dockItems: [],
  
  login: (username) => {
    // In a real app, this would validate credentials
    set({
      isLoggedIn: true,
      currentUser: {
        username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=random`
      }
    });
  },
  
  logout: () => {
    set({ isLoggedIn: false, currentUser: null, windows: [] });
  },
  
  addWindow: (window) => {
    set((state) => ({
      windows: [...state.windows, { ...window, zIndex: state.windows.length }]
    }));
  },
  
  removeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id)
    }));
  },
  
  updateWindow: (id, updates) => {
    set((state) => ({
      windows: state.windows.map((w) => 
        w.id === id ? { ...w, ...updates } : w
      )
    }));
  },
  
  bringToFront: (id) => {
    set((state) => {
      const maxZ = Math.max(...state.windows.map((w) => w.zIndex));
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1 } : w
        )
      };
    });
  }
}));