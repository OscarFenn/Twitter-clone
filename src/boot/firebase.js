import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAsf1WhGqQcCArwSwm8J2q5Te8r-_opRFY",

  authDomain: "twitterclone-1aea8.firebaseapp.com",

  projectId: "twitterclone-1aea8",

  storageBucket: "twitterclone-1aea8.appspot.com",

  messagingSenderId: "624963630206",

  appId: "1:624963630206:web:1df47dd9fae5081183142f"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


let db = getFirestore(app);

export default db