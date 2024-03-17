import { Box } from "@chakra-ui/react"; // Importing Chakra UI components
import Post from "components/post"; // Importing Post component
import { usePost } from "hooks/posts"; // Custom hook for fetching a single post
import { useParams } from "react-router-dom"; // Hook for accessing URL parameters
import NewComment from "./NewComment"; // Importing NewComment component
import CommentList from "./CommentList"; // Importing CommentList component

// Comments component definition
export default function Comments() {
  const { id } = useParams(); // Extracting post ID from URL parameters
  const { post, isLoading } = usePost(id); // Fetching post data based on ID

  if (isLoading) return "Loading..."; // Display loading message while post data is being fetched

  return (
    <Box align="center" pt="50"> 
      <Post post={post} /> 
      <NewComment post={post} /> 
      <CommentList post={post} />
    </Box>
  );
}