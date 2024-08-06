import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFqjWcDj5_oQrb9GUAwx3JnnFi8Tghfzg",
  authDomain: "eventaura-c30ae.firebaseapp.com",
  projectId: "eventaura-c30ae",
  storageBucket: "eventaura-c30ae.appspot.com",
  messagingSenderId: "559360376698",
  appId: "1:559360376698:web:72bb341e5600049801e0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  app,
  auth,
  db,
};