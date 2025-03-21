import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "@/services/auth";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthViewModel {
  formData: LoginFormData;
  error: string;
  loading: boolean;
  darkMode: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  toggleDarkMode: () => void;
}

export function useAuthViewModel(): AuthViewModel {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has previously set a preference
    const savedMode = localStorage.getItem("darkMode");
    // Check system preference if no saved preference
    if (savedMode === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return savedMode === "true";
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = formData;
      await login({ email, password });
      navigate("/");
    } catch (err: unknown) {
      // Type guard to safely access properties
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { 
          response?: { 
            data?: { 
              message?: string 
            } 
          };
          message?: string;
        };
        setError(apiError.response?.data?.message || apiError.message || "An error occurred during login");
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = formData;
      await register({ email, password });
      navigate("/login");
    } catch (err: unknown) {
      // Type guard to safely access properties
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { 
          response?: { 
            data?: { 
              message?: string 
            } 
          };
          message?: string;
        };
        setError(apiError.response?.data?.message || apiError.message || "An error occurred during registration");
      } else {
        setError("An error occurred during registration");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    darkMode,
    handleChange,
    handleLogin,
    handleRegister,
    toggleDarkMode,
  };
}
