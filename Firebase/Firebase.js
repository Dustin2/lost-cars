
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
 
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
