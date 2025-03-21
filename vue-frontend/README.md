# Vue 3 + TypeScript + Vite + MVVM Architecture

This application demonstrates a Vue 3 application built with TypeScript and Vite, following the MVVM (Model-View-ViewModel) architectural pattern.

## Project Overview

This project is a user management application that allows users to:
- Login and register
- View a list of users
- Add new users
- Edit existing users
- Delete users
- Toggle between light and dark mode

## MVVM Architecture

This application follows the MVVM architectural pattern:

- **Model**: Service classes in the `/services` directory handle API interactions
- **ViewModel**: Composables in the `/composables` directory manage state and business logic
- **View**: Vue components focus on presentation and user interaction

For a detailed explanation of the MVVM implementation, see [MVVM-ARCHITECTURE.md](./MVVM-ARCHITECTURE.md).

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

## Project Structure

```
/src
  /components        # Reusable UI components
  /composables       # Vue composables (ViewModels)
  /services          # API services (Models)
  /stores            # Pinia stores
  /utils             # Utility functions
  /views             # Page components (Views)
  App.vue            # Root component
  main.ts            # Application entry point
```

## Technologies Used

- Vue 3 with Composition API
- TypeScript
- Vite
- Pinia for state management
- Axios for API requests
- Tailwind CSS for styling

## Learn More

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue 3 `<script setup>` docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup)
