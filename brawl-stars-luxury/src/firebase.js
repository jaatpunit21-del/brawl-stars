
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBq7HL3VqVXnfXMpnn6H9EEuut2dOYX7XM",
  authDomain: "brawl-stars-605b8.firebaseapp.com",
  projectId: "brawl-stars-605b8",
  storageBucket: "brawl-stars-605b8.firebasestorage.app",
  messagingSenderId: "183258385113",
  appId: "1:183258385113:web:a74f9cb5a3e925b9130cc8",
  measurementId: "G-DV58JM13DP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
