// Define the shape of our AuthUser
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// Define the shape of our context
export interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  error: string | null;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => void;
  fetchCurrentUser: (userId?: number) => Promise<void>;
}
