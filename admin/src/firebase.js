// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {logOut} from "./redux/userRedux";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmVO8lMPCvar7R95U_hVFz3AZZ7kmUhKw",
    authDomain: "myparty2-83bd6.firebaseapp.com",
    projectId: "myparty2-83bd6",
    storageBucket: "myparty2-83bd6.appspot.com",
    messagingSenderId: "164935886360",
    appId: "1:164935886360:web:ac12ce0cbeb5adf760456d",
    measurementId: "G-EHE21KT3E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth(app)
export default app

auth.onAuthStateChanged(()=>{
    logOut()
})