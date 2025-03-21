import { createContext } from 'react';
import { AuthContextType } from '@/contexts/AuthContext/types';

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
