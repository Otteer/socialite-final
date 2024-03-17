// Import necessary functions and components from Chakra UI, Firebase, React, and React Router DOM
import { useToast } from "@chakra-ui/react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

// Custom hook to fetch a specific user's data based on ID
export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}

// Custom hook to fetch all users' data
export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}

// Custom hook to handle updating user avatar
export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  // Function to update user's avatar
  async function updateAvatar() {
    if (!file) {
      // Display error toast if no file is selected
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);

    // Upload file to storage
    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    // Get download URL of the uploaded file
    const avatarURL = await getDownloadURL(fileRef);

    // Update user's avatar URL in Firestore
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    // Display success toast after profile update
    toast({
      title: "Profile updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);

    // Navigate to a specific route after updating avatar
    navigate(0);
  }

  return {
    setFile, // Function to set the file to be uploaded
    updateAvatar, // Function to trigger the avatar update process
    isLoading, // Loading state of the update process
    fileURL: file && URL.createObjectURL(file), // URL of the selected file for preview
  };
}