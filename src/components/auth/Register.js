import {
  Box, // Container component
  Button, // Action button component
  Center, // Centering container component
  FormControl, // Form control component
  FormErrorMessage, // Error message component for forms
  FormLabel, // Label component for forms
  Heading, // Heading component
  Input, // Input field component
  Link, // Link component
  Text, // Text component
} from "@chakra-ui/react";

import { DASHBOARD, LOGIN } from "lib/routes"; // Route constants
import { Link as RouterLink } from "react-router-dom"; // Router link alias
import { useRegister } from "hooks/auth"; // Custom hook for user registration
import { useForm } from "react-hook-form"; // Form handling hook
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "utils/form-validate"; // Form validation functions

// Register component definition
export default function Register() {
  const { register: signup, isLoading } = useRegister(); // Destructuring registration function and loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Form handling using react-hook-form

  // Function to handle user registration
  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Socialite
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="pink"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            Register
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="pink.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "pink.100" }}
          >
            Log In
          </Link>{" "}
          instead!
        </Text>
      </Box>
    </Center>
  );
}