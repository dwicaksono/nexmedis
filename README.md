# NexMedis Healthcare Management System

NexMedis is a comprehensive healthcare management solution designed to streamline healthcare operations, improve patient care, and enhance administrative efficiency.

## 🏥 Project Overview

This monorepo contains multiple frontend implementations of the NexMedis healthcare management system:

- **React Frontend**: Modern implementation using React, TypeScript, and the MVVM architectural pattern
- **Vue Frontend**: Implementation using Vue.js framework

Both frontends connect to the same RESTful API and provide similar functionality with different technology stacks.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **User Management**: Create, read, update, and delete user profiles
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Profile Management**: Users can update their profile information

## 🛠️ Technology Stack

### React Frontend
- React 19 with TypeScript
- React Router v7
- Axios for HTTP requests
- Tailwind CSS for styling
- MVVM architectural pattern

### Vue Frontend
- Vue.js with TypeScript
- Vue Router
- Axios for HTTP requests
- Tailwind CSS for styling

## 📁 Project Structure

```
nexmedis/
├── .gitignore              # Git ignore file
├── README.md               # This file
├── react-frontend/         # React implementation
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable components
│   │   ├── constants/      # Application constants
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Application pages
│   │   ├── router/         # Routing configuration
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── viewModels/     # ViewModels (MVVM)
│   └── package.json        # Dependencies and scripts
└── vue-frontend/           # Vue implementation
    ├── public/             # Public assets
    └── src/                # Source code
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Running the React Frontend

```bash
# Navigate to React frontend
cd react-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running the Vue Frontend

```bash
# Navigate to Vue frontend
cd vue-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📚 API Integration

Both frontends connect to the [ReqRes](https://reqres.in/) API for demonstration purposes. In a production environment, you would replace this with your actual backend API.

## 🔐 Authentication

The application uses token-based authentication. Upon successful login, a JWT token is stored in localStorage and included in subsequent API requests.

## 🧪 Testing

Each frontend has its own testing setup. Refer to the individual README files in each frontend directory for specific testing instructions.

## 🔍 Future Plans

- Add a backend implementation with Node.js and Express
- Implement a mobile application using React Native
- Add comprehensive test coverage
- Implement internationalization (i18n) support
- Add more healthcare-specific features

## 📄 License

[MIT License](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
