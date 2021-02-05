// Firebase importing
import firebase from 'firebase/app';
import 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDUgLIPgcApRGlV0HC7cM0KvPXR-cXXxU4',
  authDomain: 'aluraquiz-leaderboard.firebaseapp.com',
  databaseURL: 'https://aluraquiz-leaderboard-default-rtdb.firebaseio.com',
  projectId: 'aluraquiz-leaderboard',
  storageBucket: 'aluraquiz-leaderboard.appspot.com',
  messagingSenderId: '1028155996640',
  appId: '1:1028155996640:web:8ab827dae892fd26b65385',
  measurementId: 'G-HG6L0ERNM4',
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.error('Firebase initialization error', err.stack);
}

// Call Firebase Database
const fire = firebase;

export { fire as default };
