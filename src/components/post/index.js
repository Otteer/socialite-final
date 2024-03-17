import { Box, Text } from "@chakra-ui/react"; // Importing Chakra UI components
import Header from "./Header"; // Importing Header component
import Actions from "./Actions"; // Importing Actions component

// Post component definition
export default function Post({ post }) {
  const { text } = post; // Destructuring post data to get text content

  return (
    <Box p="2" maxW="600px" textAlign="left"> 
      <Box border="2px solid" borderColor="gray.100" borderRadius="md"> 
        <Header post={post} /> 

        <Box p="2" minH="100px"> 
          <Text wordBreak="break-word" fontSize="md">
            {text} 
          </Text>
        </Box>

        <Actions post={post} />
      </Box>
    </Box>
  );
}