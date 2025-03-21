import axios from "axios";
import { API_URL } from "@/constants/api";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
}

export interface UserCreateData {
  name: string;
  job: string;
}

export interface UserUpdateData {
  name?: string;
  job?: string;
}

export interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export const fetchUsers = async (page: number = 1, perPage: number = 6): Promise<UsersResponse> => {
  const response = await axios.get(`${API_URL}/users?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data.data;
};

export const createUser = async (userData: UserCreateData): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (userId: number, userData: UserUpdateData): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${userId}`);
};
