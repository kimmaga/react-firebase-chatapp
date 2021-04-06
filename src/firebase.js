import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCtdeBqjp0PI3ZNmiiYaYbJfQGICK7gns0",
    authDomain: "react-firebase-chat-app-a205c.firebaseapp.com",
    projectId: "react-firebase-chat-app-a205c",
    storageBucket: "react-firebase-chat-app-a205c.appspot.com",
    messagingSenderId: "368884786298",
    appId: "1:368884786298:web:75b91dbf27938684efc7c3",
    measurementId: "G-GGLPX031B5"
  };
  // Initialize Firebase
  //export default firebase.initializeApp(firebaseConfig);
 firebase.initializeApp(firebaseConfig);
export default firebase;
  //firebase.analytics();
