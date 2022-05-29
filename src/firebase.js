import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage"
import "firebase/storage"

  const firebaseConfig = {
    apiKey: "AIzaSyBtQ5LjBvMytEs-RlG5hXlEPyqC3xeiEN0",
    authDomain: "instagram-cl-36580.firebaseapp.com",
    databaseURL: "https://instagram-cl-36580-default-rtdb.firebaseio.com",
    projectId: "instagram-cl-36580",
    storageBucket: "instagram-cl-36580.appspot.com",
    messagingSenderId: "775485262750",
    appId: "1:775485262750:web:1df10e052a17ad49a2a48f",
    measurementId: "G-NVFQQH5WKK"
  }
  const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage=firebase.storage()
const serverTimestamp= firebase.firestore.FieldValue.serverTimestamp

export { auth, db, storage, serverTimestamp };