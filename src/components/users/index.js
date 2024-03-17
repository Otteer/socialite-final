import { SimpleGrid } from "@chakra-ui/react"; // Importing Chakra UI SimpleGrid component
import { useUsers } from "hooks/users"; // Importing custom users hook
import User from "./User"; // Importing User component

// Users component definition
export default function Users() {
  const { users, isLoading } = useUsers(); // Fetch users data using custom hook

  if (isLoading) return "Loading..."; // Display loading message while fetching users data

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {users?.map((user) => ( // Map through users array to render User components */ 
        <User key={user.id} user={user} /> 
      ))}
    </SimpleGrid>
  );
}