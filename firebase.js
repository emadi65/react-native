// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBhv6FLhdp-QIZ50XB-v6K7_RKkPegQrGg",
  authDomain: "emi-next.firebaseapp.com",
  databaseURL: "https://emi-next.firebaseio.com",
  projectId: "emi-next",
  storageBucket: "emi-next.appspot.com",
  messagingSenderId: "366579965168",
  appId: "1:366579965168:web:464b05310b411e3777b635",
  measurementId: "G-ZXYNJSSZNS",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// "[DEFAULT]"

export var auth = firebase.auth;
export var storage = firebase.storage();
export default firebase;

// Option 1: Access Firebase services via the defaultProject variable
