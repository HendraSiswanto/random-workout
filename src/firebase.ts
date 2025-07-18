import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACAmKZpA-2MvFKrd8prgTMJ4sAi-IrDZU",
  authDomain: "workout-8dee9.firebaseapp.com",
  projectId: "workout-8dee9",
  storageBucket: "workout-8dee9.appspot.com", 
  messagingSenderId: "794255360430",
  appId: "1:794255360430:web:f818241c56e6e03b99083f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();