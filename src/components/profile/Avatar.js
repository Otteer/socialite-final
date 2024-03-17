import { Avatar as ChakraAvatar } from "@chakra-ui/react"; // Importing Chakra UI Avatar component
import { PROTECTED } from "lib/routes"; // Importing route constants
import { Link } from "react-router-dom"; // Importing Link component from React Router

// Avatar component definition
export default function Avatar({ user, size = "xl", overrideAvatar = null }) {
  return (
    <ChakraAvatar
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`} // Link to the user's profile page
      name={user.username} // Display user's username as the avatar name
      size={size} // Set the size of the avatar
      src={overrideAvatar || user.avatar} // Use overrideAvatar if provided, otherwise use user's avatar
      _hover={{ cursor: "pointer", opacity: "0.8" }} // Styling for hover effect
    />
  );
}