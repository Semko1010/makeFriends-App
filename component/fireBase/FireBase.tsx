// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM9IX-5a2pKmO2RKa2SoY1I1kGTbxnrOY",
  authDomain: "chat-4cff6.firebaseapp.com",
  projectId: "chat-4cff6",
  storageBucket: "chat-4cff6.appspot.com",
  messagingSenderId: "972324519737",
  appId: "1:972324519737:web:2de0d459ef4dcf176bb2e8",
  measurementId: "G-PLLSVMZH14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);