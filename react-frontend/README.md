# NexMedis React Frontend

NexMedis is a comprehensive healthcare management solution built with React, TypeScript, and modern web technologies. This frontend application implements the MVVM (Model-View-ViewModel) architectural pattern for better separation of concerns, maintainability, and testability.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **User Management**: Create, read, update, and delete user profiles
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Profile Management**: Users can update their profile information

## 🛠️ Technology Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Build Tool**: Vite
- **State Management**: React Context API with custom hooks
- **Architecture**: MVVM (Model-View-ViewModel)

## 📁 Project Structure

```
src/
├── assets/            # Static assets like images, fonts, etc.
├── components/        # Reusable UI components
│   └── ui/            # Base UI components
├── constants/         # Application constants
├── contexts/          # React context providers
│   └── AuthContext/   # Authentication context
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── pages/             # Application pages/routes
├── router/            # Routing configuration
├── services/          # API services and data fetching
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── viewModels/        # ViewModels for MVVM architecture
```

## 🏗️ Architecture: MVVM Pattern

This project implements the MVVM (Model-View-ViewModel) architectural pattern:

### Model
- Represents the data and business logic
- Located in `services/` directory
- Examples: `user.ts`, `auth.ts`

### ViewModel
- Acts as a mediator between the Model and View
- Handles business logic and state management
- Located in `viewModels/` directory
- Examples: `LoginViewModel.ts`, `UserViewModel.ts`

### View
- Responsible for rendering UI and handling user interactions
- Located in `pages/` and `components/` directories
- Examples: `Login.tsx`, `Home.tsx`

## 🔄 Data Flow

1. **User Interaction**: User interacts with the View
2. **View to ViewModel**: View calls methods on the ViewModel
3. **ViewModel to Model**: ViewModel interacts with the Model to fetch or update data
4. **Model to ViewModel**: Model returns data to the ViewModel
5. **ViewModel to View**: ViewModel updates its state, which the View observes and re-renders accordingly

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nexmedis/react-frontend

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

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

## 🧪 Testing

```bash
# Run tests
npm run test
# or
yarn test
```

## 📚 API Integration

This project uses the [ReqRes](https://reqres.in/) API for demonstration purposes. In a production environment, you would replace this with your actual backend API.

API configuration is centralized in the `constants/api.ts` file.

## 🔐 Authentication

The application uses token-based authentication. Upon successful login, a JWT token is stored in localStorage and included in subsequent API requests.

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom theme configuration. Dark mode is supported and can be toggled by the user.

## 🧩 Component Structure

Components follow a consistent pattern:
- **Container Components**: Handle data fetching and business logic
- **Presentational Components**: Focus on rendering UI based on props
- **Custom Hooks**: Extract and reuse complex logic

## 🔍 Future Improvements

- Add comprehensive test coverage with Jest and React Testing Library
- Implement form validation with a library like Zod or Yup
- Add internationalization (i18n) support
- Implement more advanced state management if needed
- Add PWA (Progressive Web App) capabilities

## 📄 License

[MIT License](LICENSE)
