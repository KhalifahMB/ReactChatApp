/* eslint-disable no-unused-vars */
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyApF9sapHTsVnr8Vv5YbndnVSU8FmfSin8",
  authDomain: "real-time-chat-applicati-e7c8b.firebaseapp.com",
  databaseURL:
    "https://real-time-chat-applicati-e7c8b-default-rtdb.firebaseio.com",
  projectId: "real-time-chat-applicati-e7c8b",
  storageBucket: "real-time-chat-applicati-e7c8b.appspot.com",
  messagingSenderId: "924736400544",
  appId: "1:924736400544:web:3fbed8e985fb169708edc5",
  measurementId: "G-TK0Y02574N",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
