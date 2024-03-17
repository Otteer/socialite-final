import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"; // Importing Chakra UI components
import { useAuth } from "hooks/auth"; // Importing custom auth hook
import { useUpdateAvatar } from "hooks/users"; // Importing custom update avatar hook
import Avatar from "./Avatar"; // Importing Avatar component

// EditProfile component definition
export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth(); // Using auth hook to get user data and loading state
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id); // Using update avatar hook to manage avatar updates

  function handleChange(e) {
    setFile(e.target.files[0]); // Update the selected file for avatar change
  }

  if (authLoading) return "Loading..."; // Display loading message while fetching user data

  return (
    <Modal isOpen={isOpen} onClose={onClose}> 
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="5"> 
            <Avatar user={user} overrideAvatar={fileURL} /> 
            <FormControl py="4"> 
              <FormLabel htmlFor="picture">Change avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} /> 
            </FormControl>
          </HStack>
          <Button
            loadingText="Uploading"
            w="full"
            my="6"
            colorScheme="pink"
            onClick={updateAvatar}
            isLoading={fileLoading}
          >
            Save 
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}