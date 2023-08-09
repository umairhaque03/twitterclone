import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
//Firebase AUTH 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  db,
  getFirestore,
  getDoc,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
};
