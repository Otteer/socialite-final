import { Box, Button, Flex, Input } from "@chakra-ui/react"; // Importing Chakra UI components
import Avatar from "components/profile/Avatar"; // Importing Avatar component
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import { useAddComment } from "hooks/comments"; // Custom hook for adding comments
import { useForm } from "react-hook-form"; // Form handling hook

// NewComment component definition
export default function NewComment({ post }) {
  const { id: postID } = post; // Destructuring post object to get post ID
  const { user, isLoading: authLoading } = useAuth(); // Fetching authenticated user data
  const { register, handleSubmit, reset } = useForm(); // Form handling using react-hook-form
  const { addComment, isLoading: commentLoading } = useAddComment({ // Adding comment functionality
    postID,
    uid: user?.id,
  });

  function handleAddComment(data) {
    addComment(data.text); // Call addComment function with comment text
    reset(); // Reset form after adding comment
  }

  if (authLoading) return "Loading..."; // Display loading message while user data is being fetched

  return (
    <Box maxW="600px" mx="auto" py="6"> 
      <Flex padding="4"> 
        <Avatar user={user} size="sm" /> 
        <Box flex="1" ml="4"> 
          <form onSubmit={handleSubmit(handleAddComment)}> 
            <Box> 
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register("text", { required: true })} // Registering comment text input with validation
              />
            </Box>
            <Flex pt="2"> 
              <Button
                isLoading={commentLoading || authLoading} // Show loading state while adding comment or fetching user data
                type="submit"
                colorScheme="pink"
                size="xs"
                ml="auto"
              >
                Add Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}