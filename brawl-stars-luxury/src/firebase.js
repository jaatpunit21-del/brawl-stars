import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  REPLACE THESE VALUES with your real Firebase project credentials.
//     Go to: https://console.firebase.google.com
//     → Create a project → Add a web app → Copy the config object below.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "[GCP_API_KEY]",
  authDomain:        "brawl-stars-luxury.firebaseapp.com",
  projectId:         "brawl-stars-luxury",
  storageBucket:     "brawl-stars-luxury.firebasestorage.app",
  messagingSenderId: "1068020800656",
  appId:             "1:1068020800656:web:6645595459545954595459"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
