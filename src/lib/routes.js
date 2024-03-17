// Import necessary components from React Router DOM
import { createBrowserRouter } from "react-router-dom";

// Import components for different routes
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";
import Dashboard from "components/dashboard";
import Comments from "components/comments";
import Profile from "components/profile";
import Users from "components/users";

// Define route paths
export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

// Create the router configuration
export const router = createBrowserRouter([
  { path: ROOT, element: <Login /> }, // Route for the root path
  { path: LOGIN, element: <Login /> }, // Route for the login page
  { path: REGISTER, element: <Register /> }, // Route for the registration page
  {
    path: PROTECTED, // Protected route
    element: <Layout />, // Layout component for protected routes
    children: [ // Child routes under the protected route
      {
        path: DASHBOARD, // Dashboard route
        element: <Dashboard />, // Dashboard component
      },
      {
        path: USERS, // Users route
        element: <Users />, // Users component
      },
      {
        path: PROFILE, // Profile route with dynamic ID
        element: <Profile />, // Profile component
      },
      {
        path: COMMENTS, // Comments route with dynamic ID
        element: <Comments />, // Comments component
      },
    ],
  },
]);