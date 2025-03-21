# MVVM Architecture Implementation in Vue.js

This document outlines how the MVVM (Model-View-ViewModel) architectural pattern has been implemented in this Vue.js application.

## Overview

The MVVM pattern separates an application into three main components:

1. **Model**: Represents the data and business logic of the application
2. **View**: Represents the UI components that display data to the user
3. **ViewModel**: Acts as a mediator between the Model and View, handling data binding and user interactions

## Implementation Details

### Model Layer

The Model layer is implemented through service classes that handle API interactions and data operations:

- **`/services/AuthService.ts`**: Handles authentication-related API calls
  - Login
  - Registration
  - User data retrieval

- **`/services/UserService.ts`**: Manages user data operations
  - Fetching users
  - Creating users
  - Updating users
  - Deleting users

These service classes encapsulate the business logic and API interactions, providing a clean interface for the ViewModel layer.

### ViewModel Layer

The ViewModel layer is implemented through Vue composables, which act as mediators between the Model and View:

- **`/composables/useAuth.ts`**: Manages authentication state and operations
  - Exposes authentication state (user, isAuthenticated)
  - Provides methods for login and registration
  - Handles token management

- **`/composables/useUserManagement.ts`**: Handles user data management
  - Exposes user data and state (users, loading, pagination)
  - Provides methods for CRUD operations
  - Manages UI state for modals and forms

- **`/composables/useTheme.ts`**: Controls dark mode functionality
  - Exposes theme state
  - Provides methods for toggling and initializing theme

These composables abstract away the complexity of state management and business logic, providing a clean API for the View layer.

### View Layer

The View layer consists of Vue components that focus on presentation and user interaction:

- **`/views/Login.vue`**: Handles user authentication
  - Uses `useAuth` composable for authentication logic
  - Uses `useTheme` composable for dark mode

- **`/views/Home.vue`**: Displays and manages user data
  - Uses `useUserManagement` composable for user operations
  - Provides UI for viewing, creating, updating, and deleting users

The View components are kept simple and focused on presentation, delegating complex logic to the ViewModel layer.

## Data Flow

1. **User Interaction**: User interacts with the View (e.g., clicks a button)
2. **View to ViewModel**: The View calls methods provided by the ViewModel
3. **ViewModel to Model**: The ViewModel calls methods on the Model to perform data operations
4. **Model to ViewModel**: The Model returns data to the ViewModel
5. **ViewModel to View**: The ViewModel updates its state, which is automatically reflected in the View through Vue's reactivity system

## Benefits of MVVM

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes to one layer have minimal impact on other layers
- **Reusability**: ViewModels and Models can be reused across different Views
- **Scalability**: The application can grow without becoming unwieldy

## Example: User Management Flow

1. **View**: User clicks "Add User" button in `Home.vue`
2. **ViewModel**: `useUserManagement` composable opens the add user modal and prepares the form
3. **View**: User fills out the form and submits
4. **ViewModel**: `useUserManagement` calls `createUser` method, which uses `UserService`
5. **Model**: `UserService` makes an API call to create the user
6. **Model to ViewModel**: API response is returned to `useUserManagement`
7. **ViewModel to View**: `useUserManagement` updates the users list, which is automatically reflected in `Home.vue`

## Future Improvements

- Implement more comprehensive error handling in the service layer
- Add unit tests for each layer
- Consider using a more robust state management solution for larger applications
- Implement more advanced data validation in the ViewModel layer
