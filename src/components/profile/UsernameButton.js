import { Button } from "@chakra-ui/react"; // Importing Chakra UI Button component
import { PROTECTED } from "lib/routes"; // Importing protected route constant
import { Link } from "react-router-dom"; // Importing Link component from React Router

// UsernameButton component definition
export default function UsernameButton({ user }) {
  return (
    <Button
      as={Link} // Render Button as a Link component
      to={`${PROTECTED}/profile/${user.id}`} // Link to the user's profile with the user ID
      colorScheme="pink" // Set button color scheme to pink
      variant="link" // Set button variant to link style
    >
      {user.username} {/* Display the user's username as the button text */}
    </Button>
  );
}