import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSy_MOCK_API_KEY",
  authDomain: "echoes-mock.firebaseapp.com",
  projectId: "echoes-mock",
  storageBucket: "echoes-mock.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:mock123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
