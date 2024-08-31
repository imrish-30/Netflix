// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5GnvRe7KmexCul8zbugCuGVij7bfXtMs",
  authDomain: "netflixgpt-680b5.firebaseapp.com",
  projectId: "netflixgpt-680b5",
  storageBucket: "netflixgpt-680b5.appspot.com",
  messagingSenderId: "800940045513",
  appId: "1:800940045513:web:330cf63afb5d3086f90918",
  measurementId: "G-GJDY0REHE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();