// Dark mode utility functions

/**
 * Check if dark mode is enabled
 */
export function isDarkModeEnabled(): boolean {
  return localStorage.getItem('darkMode') === 'true';
}

/**
 * Enable dark mode
 */
export function enableDarkMode(): void {
  localStorage.setItem('darkMode', 'true');
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
}

/**
 * Disable dark mode
 */
export function disableDarkMode(): void {
  localStorage.setItem('darkMode', 'false');
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('dark');
}

/**
 * Toggle dark mode
 */
export function toggleDarkMode(): boolean {
  const isDark = isDarkModeEnabled();
  if (isDark) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
  document.documentElement.classList.toggle('dark', !isDark);
  return !isDark;
}

/**
 * Initialize dark mode based on localStorage or system preference
 */
export function initDarkMode(): void {
  const savedPreference = localStorage.getItem('darkMode');
  
  if (savedPreference === 'true') {
    enableDarkMode();
  } else if (savedPreference === 'false') {
    disableDarkMode();
  } else {
    // If no preference is saved, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }
}
