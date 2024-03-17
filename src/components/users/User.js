import { Button, Code, VStack } from "@chakra-ui/react"; // Importing Chakra UI components
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { PROTECTED } from "lib/routes"; // Importing protected route constant
import Avatar from "components/profile/Avatar"; // Importing Avatar component

// User component definition
export default function User({ user }) {
  const { id, username } = user; // Destructuring user object to get id and username

  return (
    <VStack
      bg="gray.100" // Set background color to gray
      shadow="sm" // Add shadow effect
      rounded="md" // Apply rounded corners
      textAlign="center" // Center align text
      p="4" // Add padding
      spacing="3" // Set spacing between children
    >
      <Avatar user={user} /> 
      <Code>@{username}</Code> 
      <Link> 
        <Button
          as={Link} // Render Button as a Link component
          to={`${PROTECTED}/profile/${id}`} // Link to the user's profile with the user ID
          size="sm" // Set button size to small
          variant="link" // Set button variant to link style
          colorScheme="pink" // Set button color scheme to pink
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  );
}