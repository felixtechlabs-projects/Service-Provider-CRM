// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhaFUVk_ybNPOdkUwQXISo4BB3PyIJPX4",
  authDomain: "serviceprovidercrm-86a60.firebaseapp.com",
  projectId: "serviceprovidercrm-86a60",
  storageBucket: "serviceprovidercrm-86a60.firebasestorage.app",
  messagingSenderId: "629494829106",
  appId: "1:629494829106:web:1002e598bed4b1a9f1ec2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default app;
export { auth, db };