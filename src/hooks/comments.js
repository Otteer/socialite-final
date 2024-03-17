import { useToast } from "@chakra-ui/react"; // Importing Chakra UI toast hook for notifications
import { uuidv4 } from "@firebase/util"; // Importing UUID generation function
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore"; // Importing Firestore methods for data operations
import { db } from "lib/firebase"; // Importing Firebase database instance
import { useState } from "react"; // Importing React hook for managing state
import { useCollectionData } from "react-firebase-hooks/firestore"; // Importing Firestore hook for handling collection data

// Custom hook for adding a comment to a post
export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false); // Setting loading state for adding a comment
  const toast = useToast(); // Using Chakra UI toast for notifications

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4(); // Generating a unique ID for the comment
    const date = Date.now(); // Getting the current date
    const docRef = doc(db, "comments", id); // Creating a reference to the comment document
    await setDoc(docRef, { text, id, postID, date, uid }); // Adding the comment to Firestore

    toast({
      title: "Comment added!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);
  }

  return { addComment, isLoading }; // Returning addComment function and loading state
}

// Custom hook for fetching comments for a specific post
export function useComments(postID) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  ); // Creating a query to fetch comments for a specific post ordered by date
  const [comments, isLoading, error] = useCollectionData(q); // Fetching and handling collection data with the query
  if (error) throw error; // Throwing an error if there is an issue

  return { comments, isLoading }; // Returning comments and loading state
}

// Custom hook for deleting a comment
export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false); // Setting loading state for deleting a comment
  const toast = useToast(); // Using Chakra UI toast for notifications

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?"); // Confirming deletion with user

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id); // Creating a reference to the comment document
      await deleteDoc(docRef); // Deleting the comment from Firestore

      toast({
        title: "Comment deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deleteComment, isLoading }; // Returning deleteComment function and loading state
}