import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post('https://reqres.in/api/login', credentials);
    return response.data;
  }
  
  static async register(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post('https://reqres.in/api/register', credentials);
    return response.data;
  }
  
  static async fetchUserData(): Promise<UserData> {
    const response = await axios.get('https://reqres.in/api/users/2');
    return response.data.data;
  }
}
