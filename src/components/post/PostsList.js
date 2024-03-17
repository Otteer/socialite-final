import { Box, Text } from "@chakra-ui/react"; // Importing Chakra UI components
import Post from "./index"; // Importing Post component

// PostsList component definition
export default function PostsList({ posts }) {
  return (
    <Box px="4" align="center"> 
      {posts?.length === 0 ? ( // Check if there are no posts
        <Text textAlign="center" fontSize="xl">
          No posts yet... Feeling a little lonely here. 
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />) // Map through posts and display each Post component
      )}
    </Box>
  );
}