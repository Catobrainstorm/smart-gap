// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 1. MUST import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCRgFzJ0plUyAKyxMsgeqCDaMHcl-71qR4",
  authDomain: "smartgap-waitlist.firebaseapp.com",
  projectId: "smartgap-waitlist",
  storageBucket: "smartgap-waitlist.firebasestorage.app",
  messagingSenderId: "466706644194",
  appId: "1:466706644194:web:a34cdf3599175457ef32bb",
  measurementId: "G-QD3HFL7PQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Initialize Firestore and EXPORT it as 'db'
export const db = getFirestore(app);