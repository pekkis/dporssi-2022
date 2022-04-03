const config = {
  apiKey: "AIzaSyBjgqcFvWYHqZgv02_6qD8_oRIHh9ZAoIU",
  authDomain: "diktaattoriporssi-66ec9.firebaseapp.com",
  databaseURL: "https://diktaattoriporssi-66ec9.firebaseio.com",
  projectId: "diktaattoriporssi-66ec9",
  storageBucket: "diktaattoriporssi-66ec9.appspot.com",
  messagingSenderId: "655282525100",
  appId: "1:655282525100:web:1c32cf2ac116ba86d9e009",
  measurementId: "G-GQYEWW4MCE"
};

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const app = initializeApp(config);

export const auth = getAuth(app);

// export default firebase;
