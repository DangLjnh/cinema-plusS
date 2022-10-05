import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAqpHg3UtdxFS6WbyoNubRUyLULsApH-JI",
  authDomain: "cinemaplus-ff951.firebaseapp.com",
  projectId: "cinemaplus-ff951",
  storageBucket: "cinemaplus-ff951.appspot.com",
  messagingSenderId: "111247868273",
  appId: "1:111247868273:web:85f51135175aa888f576d0",
  measurementId: "G-VB49V05K45",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
