import { useToast } from "@chakra-ui/react"; // Importing Chakra UI toast hook for notifications
import { uuidv4 } from "@firebase/util"; // Importing UUID generation function
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"; // Importing Firestore methods
import { db } from "lib/firebase"; // Importing Firebase database instance
import { useState } from "react"; // Importing React hook for managing state
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore"; // Importing React Firebase hooks for Firestore

// Function to add a new post
export function useAddPost() {
  const [isLoading, setLoading] = useState(false); // State for loading status
  const toast = useToast(); // Toast notification hook

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4(); // Generate a unique ID
    await setDoc(doc(db, "posts", id), { ...post, id, date: Date.now(), likes: [] }); // Add post document to Firestore
    toast({
      title: "Post added successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    }); // Display success toast
    setLoading(false);
  }

  return { addPost, isLoading };
}

// Function to toggle like on a post
export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false); // State for loading status

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, { likes: isLiked ? arrayRemove(uid) : arrayUnion(uid) }); // Update likes array in post document
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

// Function to delete a post
export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false); // State for loading status
  const toast = useToast(); // Toast notification hook

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      // Delete associated comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      }); // Display info toast
      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

// Function to retrieve a single post
export function usePost(id) {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q); // Get post data from Firestore document

  return { post, isLoading };
}

// Function to retrieve posts
export function usePosts(uid = null) {
  const q = uid
    ? query(collection(db, "posts"), orderBy("date", "desc"), where("uid", "==", uid))
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q); // Get posts data from Firestore collection
  if (error) throw error;

  return { posts, isLoading };
}