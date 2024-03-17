import { Button, Flex, Link } from "@chakra-ui/react"; // Importing Chakra UI components
import { DASHBOARD } from "lib/routes"; // Importing route constant
import { Link as RouterLink } from "react-router-dom"; // Alias for Link component from React Router
import { useLogout } from "hooks/auth"; // Custom hook for user logout

// Navbar component definition
export default function Navbar() {
  const { logout, isLoading } = useLogout(); // Functionality for user logout

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="pink.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex px="4" w="full" align="center" maxW="1200px"> 
        <Link color="pink.500" as={RouterLink} to={DASHBOARD} fontWeight="bold"> 
          Home
        </Link>
        <Button
          ml="auto"
          colorScheme="pink"
          size="sm"
          onClick={logout} // Logout function on button click
          isLoading={isLoading} // Show loading state while logging out
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}