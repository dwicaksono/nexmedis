import { defineStore } from 'pinia';
import { AuthService } from '../services/AuthService';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
  
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await AuthService.login({ email, password });
        
        this.token = response.token;
        localStorage.setItem('token', response.token);
        
        // Fetch user data after successful login
        await this.fetchUserData();
        
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async register(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await AuthService.register({ email, password });
        
        this.token = response.token;
        localStorage.setItem('token', response.token);
        
        // Fetch user data after successful registration
        await this.fetchUserData();
        
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUserData() {
      if (!this.token) return;
      
      this.loading = true;
      
      try {
        this.user = await AuthService.fetchUserData();
      } catch (error: any) {
        this.error = 'Failed to fetch user data';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
