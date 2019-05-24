import firebase from "firebase/app";
import "firebase/firestore";

// https://firebase.google.com/docs/firestore/quickstart
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH,
  databaseURL: "https://marvel-hooks.firebaseio.com",
  projectId: "marvel-hooks",
  storageBucket: "marvel-hooks.appspot.com",
  messagingSenderId: "778698659422",
  appId: process.env.FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();
