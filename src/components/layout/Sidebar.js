import { Box, Button, Code, Stack } from "@chakra-ui/react"; // Importing Chakra UI components
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import { PROTECTED, USERS } from "lib/routes"; // Importing route constants
import { Link } from "react-router-dom"; // Link component from React Router
import Avatar from "components/profile/Avatar"; // Importing Avatar component

// ActiveUser component definition
function ActiveUser() {
  const { user, isLoading } = useAuth(); // Fetching authenticated user data

  if (isLoading) return "Loading..."; // Display loading message while user data is being fetched

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar user={user} /> 
      <Code>@{user.username}</Code> 
      <Button
        colorScheme="pink"
        w="full"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`} // Link to user profile with pink button
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

// Sidebar component definition
export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="pink.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }} // Responsive display settings
    >
      <ActiveUser /> 
      <Box align="center"> 
        <Box as="ul" borderBottom="2px solid" borderColor="pink.200" /> 
        <Button
          variant="outline"
          colorScheme="pink"
          as={Link}
          to={USERS} // Link to all users page with pink outline button
          mt="4"
          size="sm"
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
}