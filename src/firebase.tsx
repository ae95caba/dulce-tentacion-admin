// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvRXUWIECDFeLzegBA1of41wjUPCBP8ZE",
  authDomain: "test33-4ff50.firebaseapp.com",
  projectId: "test33-4ff50",
  storageBucket: "test33-4ff50.appspot.com",
  messagingSenderId: "1002619850206",
  appId: "1:1002619850206:web:adf02a9936e3c1a4d0e14f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();

export const db = getFirestore(app);
