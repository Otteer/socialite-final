// Import necessary functions from Firebase Firestore
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

// Function to check if a username already exists in the Firestore database
export default async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username)); // Create a query to check for the existence of the provided username
  const querySnapshot = await getDocs(q); // Get the query snapshot from Firestore
  return querySnapshot.size > 0; // Return true if the username exists, false otherwise
}