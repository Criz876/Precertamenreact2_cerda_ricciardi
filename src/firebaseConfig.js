// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC54TVMb6vYqBsU0jobEqUk5GPGwYVxaZg",
  authDomain: "precertamenreact.firebaseapp.com",
  projectId: "precertamenreact",
  storageBucket: "precertamenreact.firebasestorage.app",
  messagingSenderId: "749815291528",
  appId: "1:749815291528:web:1ced9e24482d10ebfb093d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);