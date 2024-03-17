import { Box, Flex, Text } from "@chakra-ui/react"; // Importing Chakra UI components
import Avatar from "components/profile/Avatar"; // Importing Avatar component
import { useUser } from "hooks/users"; // Custom hook for fetching user data
import { formatDistanceToNow } from "date-fns"; // Function for formatting date to relative time
import UsernameButton from "components/profile/UsernameButton"; // UsernameButton component

// Header component definition
export default function Header({ post }) {
  const { uid, date } = post; // Destructuring post data to get user id and date
  const { user, isLoading } = useUser(uid); // Fetching user data based on user id

  if (isLoading) return "Loading..."; // Display loading message while user data is being fetched

  return (
    <Flex
      alignItems="center"
      borderBottom="2px solid"
      borderColor="pink.100"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="md" /> 

      <Box ml="4">
        <UsernameButton user={user} /> 
        <Text fontSize="sm" color="gray.500">
          {formatDistanceToNow(date)} ago 
        </Text>
      </Box>
    </Flex>
  );
}