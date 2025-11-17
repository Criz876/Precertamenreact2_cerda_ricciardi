import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Pega aquí tu configuración de Firebase
  apiKey: "AIzaSyC54TVMb6vYqBsU0jobEqUk5GPGwYVxaZg",
  authDomain: "precertamenreact.firebaseapp.com",
  projectId: "precertamenreact",
  storageBucket: "precertamenreact.firebasestorage.app",
  messagingSenderId: "749815291528",
  appId: "1:749815291528:web:1ced9e24482d10ebfb093d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);