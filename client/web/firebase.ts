// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqAht8yuXJbArj1OrgHE8O3JjcT6cPjUs",
  authDomain: "fundinc-saas.firebaseapp.com",
  databaseURL: "https://fundinc-saas-default-rtdb.firebaseio.com",
  projectId: "fundinc-saas",
  storageBucket: "fundinc-saas.appspot.com",
  messagingSenderId: "307014105663",
  appId: "1:307014105663:web:bbf1f7148c21a146a0568a",
  measurementId: "G-6B3F60JM9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
