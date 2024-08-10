// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBARjlh_0ZEVmS6XCM9-0btMtMzdw9L4Q",
    authDomain: "netflixgpt-f9ce9.firebaseapp.com",
    projectId: "netflixgpt-f9ce9",
    storageBucket: "netflixgpt-f9ce9.appspot.com",
    messagingSenderId: "222422811829",
    appId: "1:222422811829:web:72e4670766113842b02afc",
    measurementId: "G-LYMV3QRMG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();