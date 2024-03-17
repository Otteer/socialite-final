import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react"; // Importing Chakra UI components
import PostsLists from "components/post/PostsList"; // Importing PostsList component
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import { useAddPost, usePosts } from "hooks/posts"; // Custom hooks for adding posts and fetching posts
import { useForm } from "react-hook-form"; // Form handling hook
import TextareaAutosize from "react-textarea-autosize"; // Textarea component with autosize feature

// NewPost component for creating a new post
function NewPost() {
  const { register, handleSubmit, reset } = useForm(); // Form handling using react-hook-form
  const { addPost, isLoading: addingPost } = useAddPost(); // Functionality for adding a new post
  const { user, isLoading: authLoading } = useAuth(); // Fetching authenticated user data

  // Function to handle adding a new post
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset(); // Reset form after adding post
  }

  return (
    <Box maxW="600px" mx="auto" py="10"> 
      <form onSubmit={handleSubmit(handleAddPost)}> 
        <HStack justify="space-between"> 
          <Heading size="lg">New Post</Heading> 
          <Button
            colorScheme="pink"
            type="submit"
            isLoading={authLoading || addingPost} // Show loading state while adding post or fetching user data
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize} // Using TextareaAutosize for resizable textarea
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })} // Registering post text input with validation
        />
      </form>
    </Box>
  );
}

// Dashboard component to display posts
export default function Dashboard() {
  const { posts, isLoading } = usePosts(); // Fetching posts data

  if (isLoading) return "Loading posts..."; // Display loading message while posts are being fetched

  return (
    <>
      <NewPost /> 
      <PostsLists posts={posts} /> 
    </>
  );
}