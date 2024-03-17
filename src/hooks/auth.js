import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Importing authentication methods from Firebase
import { useAuthState, useSignOut } from "react-firebase-hooks/auth"; // Importing authentication state and sign out hooks
import { auth, db } from "lib/firebase"; // Importing Firebase authentication and database instances
import { useEffect, useState } from "react"; // Importing React hooks
import { DASHBOARD, LOGIN } from "lib/routes"; // Importing route constants
import { useToast } from "@chakra-ui/react"; // Importing Chakra UI toast hook
import { useNavigate } from "react-router-dom"; // Importing navigation hook
import { setDoc, doc, getDoc } from "firebase/firestore"; // Importing Firestore document methods
import isUsernameExists from "utils/isUsernameExists"; // Importing utility function to check username existence

// Custom hook for handling authentication state
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth); // Getting authentication state
  const [isLoading, setLoading] = useState(true); // Setting loading state
  const [user, setUser] = useState(null); // Initializing user state

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error }; // Returning user data, loading state, and error
}

// Custom hook for handling user login
export function useLogin() {
  const [isLoading, setLoading] = useState(false); // Setting loading state for login process
  const toast = useToast(); // Using Chakra UI toast for notifications
  const navigate = useNavigate(); // Using navigation hook

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password); // Signing in with email and password
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo); // Redirecting to specified page after successful login
    } catch (error) {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading }; // Returning login function and loading state
}

// Custom hook for handling user registration
export function useRegister() {
  const [isLoading, setLoading] = useState(false); // Setting loading state for registration process
  const toast = useToast(); // Using Chakra UI toast for notifications
  const navigate = useNavigate(); // Using navigation hook

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username); // Checking if username already exists

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password); // Creating user with email and password

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo); // Redirecting to specified page after successful registration
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading }; // Returning registration function and loading state
}

// Custom hook for handling user logout
export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth); // Handling sign out process with loading and error states
  const toast = useToast(); // Using Chakra UI toast for notifications
  const navigate = useNavigate(); // Using navigation hook

  async function logout() {
    if (await signOut()) { 
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(LOGIN); // Redirecting to login page after successful logout
    } 
    /* else - show error [signOut() returns false if failed] */
  }

  return { logout, isLoading }; // Returning logout function and loading state
}