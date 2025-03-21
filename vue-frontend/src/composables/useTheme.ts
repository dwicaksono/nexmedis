import { ref } from 'vue';
import { 
  isDarkModeEnabled, 
  enableDarkMode, 
  disableDarkMode, 
  toggleDarkMode, 
  initDarkMode 
} from '../utils/darkMode';

export function useTheme() {
  // Track dark mode state
  const isDark = ref(isDarkModeEnabled());
  
  // Initialize dark mode
  const initialize = () => {
    initDarkMode();
    isDark.value = isDarkModeEnabled();
  };
  
  // Toggle dark mode
  const toggle = () => {
    toggleDarkMode();
    isDark.value = isDarkModeEnabled();
  };
  
  // Set dark mode
  const setDarkMode = (dark: boolean) => {
    if (dark) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
    isDark.value = dark;
  };
  
  return {
    isDark,
    initialize,
    toggle,
    setDarkMode
  };
}
