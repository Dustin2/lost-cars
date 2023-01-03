import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBBRlk-saV-sNMxFcHLNjoTrWyq1JnE6cU",
  authDomain: "lost-cars.firebaseapp.com",
  projectId: "lost-cars",
  storageBucket: "lost-cars.appspot.com",
  messagingSenderId: "943382910706",
  appId: "1:943382910706:web:987af08857bf0204e9e26b",
  measurementId: "G-NTGC49RYV8",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
