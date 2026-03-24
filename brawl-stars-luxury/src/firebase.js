import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  REPLACE THESE VALUES with your real Firebase project credentials.
//     Go to: https://console.firebase.google.com
//     → Create a project → Add a web app → Copy the config object below.
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
