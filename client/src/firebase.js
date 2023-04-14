import { initializeApp } from "firebase/app";

const firebaseConfig = {
  authDomain: "multi-vendor-69526.firebaseapp.com",
  projectId: "multi-vendor-69526",
  storageBucket: "multi-vendor-69526.appspot.com",
  messagingSenderId: "594666178867",
};

// Initialize Firebase
const app = initializeApp({
  ...firebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  appId: import.meta.env.VITE_APPID,
});
export default app;
