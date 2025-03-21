import axios from "axios";
import { API_URL } from "@/constants/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    console.log("Token saved:", response.data.token);
    // Create a mock user object since reqres.in doesn't return user data
    const mockUser = {
      id: 1,
      name: "Test User",
      email: credentials.email,
      avatar: "https://reqres.in/img/faces/1-image.jpg" // Add a default avatar
    };
    
    // Store the mock user in localStorage
    localStorage.setItem("user", JSON.stringify(mockUser));
  }
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  // For reqres.in, we need to adapt our registration data to match their API
  const reqresData = {
    email: data.email,
    password: data.password
  };
  
  const response = await axios.post(`${API_URL}/register`, reqresData);
  if (response.data.token) {
    // We don't auto-login after registration, so we don't store token here
    // This way user needs to explicitly log in after registration
  }
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = (): AuthResponse['user'] | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") !== null;
};
