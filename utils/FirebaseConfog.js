import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA4KFq22-zZJamxQW2V0fzKxO7NoqpQIe0",
    authDomain: "appbancaphe.firebaseapp.com",
    databaseURL: "https://appbancaphe-default-rtdb.firebaseio.com",
    projectId: "appbancaphe",
    storageBucket: "appbancaphe.firebasestorage.app",
    messagingSenderId: "221472038391",
    appId: "1:221472038391:web:2133b4b0a84b364807a2f2",
    measurementId: "G-JPK7SBEGMW"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const FirebaseApp = app;
export  default FirebaseApp;