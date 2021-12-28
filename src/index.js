import { initializeApp } from "firebase/app";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

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
const colRef = collection(db, "books");

// query 
const q = query(colRef,where("author","==","minji"));
const orderQ = query(colRef,orderBy("createdAt","desc"));

// get collection Data

// const data = async () => {
//   let books = [];
//   const doc = await getDocs(colRef);
//   doc.docs.map((item) => {
//     books.push({ ...item.data(), id: item.id });
//   });
//   console.log(books, "books@@@");
// };
// data();

const addForm = document.querySelector(".add");
const deleteForm = document.querySelector(".delete");
const box = document.querySelector(".box");
// on snap shot!@


onSnapshot(orderQ,(snapshot)=>{
  let books = [];
  console.log(snapshot.docChanges(),"##")
  snapshot.docs.map((item) => {
    books.push({ ...item.data(), id: item.id });
  });
  console.log(books, "books@@@");

  box.innerHTML=books.map(item=>{
    return `
      <div>
        <h5>Title : ${item.title}</h5>
        <h6>ID : ${item.id}</h6>
        <p>${item.createdAt.toDate()}</p>
      </div>
    `;
  }).join("");

})

// html add / delete form query

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addDoc(colRef, {
    title: addForm.title.value,
    author: addForm.author.value,
    createdAt:serverTimestamp(),
  });
  addForm.reset();
});

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // delete 하려는 item 을 doc() 으로 ref 잡고 
  const docRef = doc(db, "books", deleteForm.id.value);

  // deleteDoc () 이용해서 삭제
  await deleteDoc(docRef);
  deleteForm.reset();
});


// get single item 
const singleRef = doc(colRef,"nA62IVeQ0mp0rRGmWqts");

const singleData =async()=>{
  const data = await getDoc(singleRef);
  console.log(data.data(),"###")
} 

singleData();
