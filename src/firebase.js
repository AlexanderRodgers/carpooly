import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

var firebaseConfig = {
   apiKey: "AIzaSyDCeb2sXQfWMxH9P68lD_1KNrhTpDAmh1U",
   authDomain: "carpooly-677d4.firebaseapp.com",
   databaseURL: "https://carpooly-677d4.firebaseio.com",
   projectId: "carpooly-677d4",
   storageBucket: "carpooly-677d4.appspot.com",
   messagingSenderId: "231366969334",
   appId: "1:231366969334:web:88f15615440c2400bae9d7",
   measurementId: "G-P6ECJKHKGS"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;