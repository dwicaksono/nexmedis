<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';

// Define theme options
type Theme = 'dark' | 'light' | 'system';

// Create reactive state
const theme = ref<Theme>('system');
const resolvedTheme = ref<'dark' | 'light'>('light');

// Provide theme context to child components
provide('theme', theme);
provide('resolvedTheme', resolvedTheme);

// Function to get system theme preference
const getSystemTheme = (): 'dark' | 'light' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Function to set theme
const setTheme = (newTheme: Theme) => {
  theme.value = newTheme;
  
  // Save to localStorage
  localStorage.setItem('theme', newTheme);
  
  // Apply theme
  applyTheme();
};

// Function to apply theme to document
const applyTheme = () => {
  const root = document.documentElement;
  const isDark = 
    theme.value === 'dark' || 
    (theme.value === 'system' && getSystemTheme() === 'dark');
  
  // Update resolved theme
  resolvedTheme.value = isDark ? 'dark' : 'light';
  
  // Apply or remove dark class
  if (isDark) {
    root.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    document.body.classList.remove('dark');
  }
};

// Watch for system theme changes
onMounted(() => {
  // Get theme from localStorage or default to system
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) {
    theme.value = savedTheme;
  }
  
  // Apply initial theme
  applyTheme();
  
  // Watch for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
});

// Expose functions
defineExpose({
  setTheme,
  theme,
  resolvedTheme
});
</script>

<template>
  <slot></slot>
</template>
