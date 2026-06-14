import { create } from 'zustand';
import axios from 'axios';

/**
 * Auth Store (Zustand)
 * Manages authentication state with persistence in sessionStorage
 */

export interface User {
  id: string;
  name: string;
  email: string;
  preferred_language: 'en' | 'hi' | 'ta' | 'te' | 'bn';
  daily_sugar_goal_tsp?: number;
  diabetes_type?: string;
  weight_kg?: number;
  height_cm?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth?: string;
    preferredLanguage?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    if (user) {
      // Persist to sessionStorage
      sessionStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('auth_user');
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      get().setUser(response.data.user);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth: data.dateOfBirth,
        preferredLanguage: data.preferredLanguage || 'en',
      });

      get().setUser(response.data.user);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/auth/logout`);
      get().setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      get().setUser(response.data.user);
    } catch (error) {
      // User not authenticated
      get().setUser(null);
    }
  },
}));

export default useAuthStore;
