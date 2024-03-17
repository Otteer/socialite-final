import { Box } from "@chakra-ui/react"; // Importing Chakra UI components
import { useComments } from "hooks/comments"; // Custom hook for fetching comments
import Comment from "./Comment"; // Importing Comment component

// CommentList component definition
export default function CommentList({ post }) {
  const { id } = post; // Destructuring post object to get post ID
  const { comments, isLoading } = useComments(id); // Fetching comments for the post

  if (isLoading) return "Loading..."; // Display loading message while comments are being fetched

  return (
    <Box>
      {comments.map((comment) => ( // Mapping through comments array
        <Comment key={comment.id} comment={comment} /> // Rendering individual Comment components
      ))}
    </Box>
  );
}