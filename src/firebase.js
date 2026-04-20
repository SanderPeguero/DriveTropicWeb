import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhvVVMgHW8H5cjr6ZUmHYOXqj5oTjvhaU",
  authDomain: "drivetropic.firebaseapp.com",
  projectId: "drivetropic",
  storageBucket: "drivetropic.firebasestorage.app",
  messagingSenderId: "177754470220",
  appId: "1:177754470220:web:515fcf77300b52678f01e9",
  measurementId: "G-YZF27EZ88B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
