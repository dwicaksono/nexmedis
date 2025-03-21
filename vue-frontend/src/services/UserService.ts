import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserCreateData {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserUpdateData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export class UserService {
  static async fetchUsers(page: number = 1, perPage: number = 10): Promise<UsersResponse> {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`);
    return response.data;
  }
  
  static async createUser(userData: UserCreateData): Promise<User> {
    const response = await axios.post('https://reqres.in/api/users', userData);
    return response.data;
  }
  
  static async updateUser(userId: number, userData: UserUpdateData): Promise<User> {
    const response = await axios.put(`https://reqres.in/api/users/${userId}`, userData);
    return response.data;
  }
  
  static async deleteUser(userId: number): Promise<void> {
    await axios.delete(`https://reqres.in/api/users/${userId}`);
  }
}
