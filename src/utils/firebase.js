/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3ueZdJMw39IHKpmIm7PAYgyaH45fGCnE",
  authDomain: "netflixgpt-ecb74.firebaseapp.com",
  projectId: "netflixgpt-ecb74",
  storageBucket: "netflixgpt-ecb74.appspot.com",
  messagingSenderId: "117706743920",
  appId: "1:117706743920:web:cdcd4649395e5140c094b5",
  measurementId: "G-5JRYYE9WYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
