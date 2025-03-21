<script setup lang="ts">
import { ref, inject } from 'vue';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline';

// Get theme from provider
const theme = inject('theme', ref('system'));

// Get setTheme function from parent component
const props = defineProps({
  setTheme: {
    type: Function,
    required: true
  }
});

// Toggle between themes
const toggleTheme = () => {
  if (theme.value === 'light') {
    props.setTheme('dark');
  } else if (theme.value === 'dark') {
    props.setTheme('system');
  } else {
    props.setTheme('light');
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 dark:hover:bg-gray-700"
    title="Toggle theme"
  >
    <SunIcon v-if="theme === 'light'" class="h-5 w-5" />
    <MoonIcon v-else-if="theme === 'dark'" class="h-5 w-5" />
    <ComputerDesktopIcon v-else class="h-5 w-5" />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
