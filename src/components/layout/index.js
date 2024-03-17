import { LOGIN } from "lib/routes"; // Importing route constants
import { useEffect } from "react"; // Hook for side effects in functional components
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Hooks for navigation and location in React Router
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import Navbar from "components/layout/Navbar"; // Importing Navbar component
import Sidebar from "components/layout/Sidebar"; // Importing Sidebar component
import { Box, Flex } from "@chakra-ui/react"; // Importing Chakra UI components

// Layout component definition
export default function Layout() {
  const { pathname } = useLocation(); // Getting the current pathname from location
  const navigate = useNavigate(); // Navigation function from React Router
  const { user, isLoading } = useAuth(); // Fetching authenticated user data

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN); // Redirect to login page if user is not authenticated and accessing protected routes
    }
  }, [pathname, user, isLoading]); // Dependency array for useEffect

  if (isLoading) return "Loading auth user..."; // Display loading message while user data is being fetched

  return (
    <>
      <Navbar /> 
      <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px"> 
        <Box w="900px"> 
          <Outlet />
        </Box>
        <Sidebar /> 
      </Flex>
    </>
  );
}