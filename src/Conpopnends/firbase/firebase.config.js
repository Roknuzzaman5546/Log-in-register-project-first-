// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAGJt2i_aDAY8HNpEN_S6a68wbcKM7PAs",
  authDomain: "login-register-project-f93c9.firebaseapp.com",
  projectId: "login-register-project-f93c9",
  storageBucket: "login-register-project-f93c9.appspot.com",
  messagingSenderId: "778216683917",
  appId: "1:778216683917:web:62c373ccadb5a93dbc65c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;