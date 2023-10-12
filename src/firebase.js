import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// add your firebase config here.
const firebaseConfig = {
  apiKey: "AIzaSyDnpfrLICUEDlEQIjr0cfnIs3nJkRv3Zak",
  authDomain: "online-shopping-44f6d.firebaseapp.com",
  projectId: "online-shopping-44f6d",
  storageBucket: "online-shopping-44f6d.appspot.com",
  messagingSenderId: "651749024645",
  appId: "1:651749024645:web:5a47ee9cd29032051f1aec",
  measurementId: "G-MZL82FWS8E",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };
