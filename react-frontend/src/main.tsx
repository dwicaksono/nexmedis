import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext/provider'

// Initialize dark mode based on user preference
const initializeDarkMode = () => {
  // Check if user has previously set a preference
  const savedMode = localStorage.getItem("darkMode");
  
  // Check system preference if no saved preference
  if (savedMode === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  } else if (savedMode === "true") {
    document.documentElement.classList.add("dark");
  }
};

// Initialize dark mode
initializeDarkMode();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 w-full">
        <App />
      </div>
    </AuthProvider>
  </StrictMode>,
)
