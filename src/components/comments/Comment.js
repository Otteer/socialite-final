import { Box, Flex, IconButton, Text } from "@chakra-ui/react"; // Importing Chakra UI components
import Avatar from "components/profile/Avatar"; // Importing Avatar component
import UsernameButton from "components/profile/UsernameButton"; // Importing UsernameButton component
import { formatDistanceToNow } from "date-fns"; // Importing date-fns function for date formatting
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import { useDeleteComment } from "hooks/comments"; // Custom hook for deleting comments
import { useUser } from "hooks/users"; // Custom hook for fetching user data
import { FaTrash } from "react-icons/fa"; // Importing trash icon from react-icons/fa

// Comment component definition
export default function Comment({ comment }) {
  const { text, uid, date, id } = comment; // Destructuring comment object
  const { user, isLoading: userLoading } = useUser(uid); // Fetching user data based on user ID
  const { user: authUser, isLoading: authLoading } = useAuth(); // Fetching authenticated user data
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id); // Deleting comment functionality

  if (userLoading) return "Loading..."; // Display loading message while user data is being fetched

  return (
    <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left"> 
      <Flex pb="2">
        <Avatar user={user} size="sm" />
        <Box flex="1" ml="4"> 
          <Flex borderBottom="1px solid" borderColor="pink.100" pb="2"> 
            <Box> 
              <UsernameButton user={user} />
              <Text fontSize="xs" color="gray.500">
                {formatDistanceToNow(date)} ago
              </Text>
            </Box>
            {!authLoading && authUser.id === uid && ( // Display delete button for authenticated user who owns the comment
              <IconButton
                size="sm"
                ml="auto"
                icon={<FaTrash />} // Trash icon for delete action
                colorScheme="red"
                variant="ghost"
                isRound
                onClick={deleteComment} // Trigger delete action on click
                isLoading={deleteLoading} // Show loading state while deleting
              />
            )}
          </Flex>
          <Box pt="2" fontSize="sm"> 
            <Text>{text}</Text> 
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}