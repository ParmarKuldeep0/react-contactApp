// Import the functions you need from the SDKs you need
import MyFirebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDsjmLU2N2xbE474BlZuqqcokH3vtiVTdE",
  authDomain: "contactapp-28566.firebaseapp.com",
  projectId: "contactapp-28566",
  storageBucket: "contactapp-28566.appspot.com",
  messagingSenderId: "51961505560",
  appId: "1:51961505560:web:5ab34ee3b2fd1e903ca06d",
  measurementId: "G-52YDHK1783"
};

const app = MyFirebase.initializeApp(firebaseConfig);

export const db = MyFirebase.firestore()