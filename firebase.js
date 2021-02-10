// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCMFsb4bukzRxo_GfHuPZlWU2v3oRKhIFM",
  authDomain: "react-native-app-cda09.firebaseapp.com",
  databaseURL: "https://react-native-app-cda09-default-rtdb.firebaseio.com",
  projectId: "react-native-app-cda09",
  storageBucket: "react-native-app-cda09.appspot.com",
  messagingSenderId: "821459637103",
  appId: "1:821459637103:web:2e0aaa55eb5ab90b528e9a",
  measurementId: "G-YP2SK12CHN"
};
      // Initialize Firebase
     
     
      firebase.initializeApp(firebaseConfig);
     
      // "[DEFAULT]"
      export default firebase
      
      // Option 1: Access Firebase services via the defaultProject variable
    

