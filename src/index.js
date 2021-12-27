import { initializeApp } from "firebase/app";

import { collection,  getDocs, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB2qgRYtp7RhPX24cPp4mH4LarOGm_2J2k",
  authDomain: "fir-version9.firebaseapp.com",
  projectId: "fir-version9",
  storageBucket: "fir-version9.appspot.com",
  messagingSenderId: "510107876990",
  appId: "1:510107876990:web:37792a8a7fc6e2eb80e22f",
};

initializeApp(firebaseConfig);

// init service
const db = getFirestore();

// collection ref
const colRef = collection(db,"books");

// get collection Data
const data = async()=>{
    let books = [];
    const doc = await getDocs(colRef);
    doc.docs.map(item=>{
        books.push({...item.data(),id:item.id})
    });
    console.log(books,"books@@@")
}
data();