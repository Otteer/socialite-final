import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"; // Importing Chakra UI components
import PostsList from "components/post/PostsList"; // Importing PostsList component
import { usePosts } from "hooks/posts"; // Importing custom posts hook
import { useUser } from "hooks/users"; // Importing custom user hook
import { useParams } from "react-router-dom"; // Importing useParams from React Router
import Avatar from "./Avatar"; // Importing Avatar component
import { format } from "date-fns"; // Importing date-fns for date formatting
import EditProfile from "./EditProfile"; // Importing EditProfile component
import { useAuth } from "hooks/auth"; // Importing custom auth hook

// Profile component definition
export default function Profile() {
  const { id } = useParams(); // Get user ID from URL params
  const { posts, isLoading: postsLoading } = usePosts(id); // Fetch user's posts using custom hook
  const { user, isLoading: userLoading } = useUser(id); // Fetch user data using custom hook
  const { user: authUser, isLoading: authLoading } = useAuth(); // Get authenticated user data using custom hook
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal open/close state

  if (userLoading) return "Loading..."; // Display loading message while fetching user data

  return (
    <Stack spacing="5"> 
      <Flex p={["4", "6"]} pos="relative" align="center"> 
        <Avatar size="2xl" user={user} /> 
        
        {!authLoading && authUser.id === user.id && ( // Show change avatar button for authenticated user */
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="pink"
            onClick={onOpen}
          >
            Change avatar
          </Button>
        )}

        <Stack ml="10"> 
          <Text fontSize="2xl">{user.username}</Text> 
          <HStack spacing="10"> 
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Posts: {posts.length} 
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined: {format(user.date, "MMMM YYY")} 
            </Text>
          </HStack>
        </Stack>

        <EditProfile isOpen={isOpen} onClose={onClose} /> 
      </Flex>
      <Divider /> 

      {postsLoading ? ( // Check if posts are still loading
        <Text>Posts are loading...</Text> 
      ) : (
        <PostsList posts={posts} /> 
      )}
    </Stack>
  );
}