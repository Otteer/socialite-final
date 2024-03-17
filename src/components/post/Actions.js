import { Flex, IconButton } from "@chakra-ui/react"; // Importing Chakra UI components
import { useAuth } from "hooks/auth"; // Custom hook for authentication
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrash,
} from "react-icons/fa"; // Importing Font Awesome icons
import { useToggleLike, useDeletePost } from "hooks/posts"; // Custom hooks for toggling likes and deleting posts
import { Link } from "react-router-dom"; // Link component from React Router
import { PROTECTED } from "lib/routes"; // Importing route constant
import { useComments } from "hooks/comments"; // Custom hook for fetching comments

// Actions component definition
export default function Actions({ post }) {
  const { id, likes, uid } = post; // Destructuring post data
  const { user, isLoading: userLoading } = useAuth(); // Fetching authenticated user data

  const isLiked = likes.includes(user?.id); // Checking if user has liked the post
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { toggleLike, isLoading: likeLoading } = useToggleLike(config); // Functionality for toggling likes
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id); // Functionality for deleting posts
  const { comments, isLoading: commentsLoading } = useComments(id); // Fetching comments for the post

  return (
    <Flex p="2"> 
      <Flex alignItems="center"> 
        <IconButton
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />} // Display filled heart if liked, outline heart if not
          isRound
        />
        {likes.length} 
      </Flex>
      <Flex alignItems="center" ml="2"> 
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          isLoading={commentsLoading}
          size="md"
          colorScheme="pink"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />} // Display different comment icon based on comment count
          isRound
        />
        {comments?.length}
      </Flex>

      {!userLoading && user.id === uid && ( // Display delete button if user is the post owner
        <IconButton
          ml="auto"
          onClick={deletePost}
          isLoading={deleteLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />} // Trash icon for delete button
          isRound
        />
      )}
    </Flex>
  );
}