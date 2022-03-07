// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrLjF7a4VP0mYrva1GTyQEakSBWcSonQ8",
  authDomain: "insta-2-yt-33bb2.firebaseapp.com",
  projectId: "insta-2-yt-33bb2",
  storageBucket: "insta-2-yt-33bb2.appspot.com",
  messagingSenderId: "401589215617",
  appId: "1:401589215617:web:c771adaaa487fcee150880"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();


export {app, db, storage};

