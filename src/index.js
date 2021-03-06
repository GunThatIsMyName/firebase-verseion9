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
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// query
const q = query(colRef, where("author", "==", "minji"));
const orderQ = query(colRef, orderBy("createdAt", "desc"));

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
const editForm = document.querySelector(".edit");
const box = document.querySelector(".box");
const signForm = document.querySelector(".signup");
const loginForm = document.querySelector(".login");
// on snap shot!@

onSnapshot(orderQ, (snapshot) => {
  let books = [];
  console.log(snapshot.docChanges(), "##");
  snapshot.docs.map((item) => {
    books.push({ ...item.data(), id: item.id });
  });

  box.innerHTML = books
    .map((item) => {
      return `
      <div>
        <h5>Title : ${item.title}</h5>
        <h6>ID : ${item.id}</h6>
        <p>${item.createdAt.toDate()}</p>
      </div>
    `;
    })
    .join("");
});

// html add / delete form query

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addDoc(colRef, {
    title: addForm.title.value,
    author: addForm.author.value,
    createdAt: serverTimestamp(),
  });
  addForm.reset();
});

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // delete ????????? item ??? doc() ?????? ref ??????
  const docRef = doc(db, "books", deleteForm.id.value);

  // deleteDoc () ???????????? ??????
  await deleteDoc(docRef);
  deleteForm.reset();
});

// get single item
const singleRef = doc(colRef, "nA62IVeQ0mp0rRGmWqts");

const singleData = async () => {
  const data = await getDoc(singleRef);
};

singleData();

// edit

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", editForm.id.value);

  await updateDoc(docRef, {
    title: "You are Awesome!",
  });
  editForm.reset();
});

// getAuth
signForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signForm.email.value;
  const password = signForm.password.value;

  const pureLogin = await createUserWithEmailAndPassword(auth, email, password);
  console.log(pureLogin, "login");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.user, "??suer ");
  } catch (error) {
    console.log(error, "login fail");
  }
});

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  console.log("??");
});

onAuthStateChanged(auth, (user) => {
  console.log(user, "user change!!");
  if (!user) {
    logoutBtn.textContent = "login";
  }
});

const google = document.querySelector(".google");

google.addEventListener("click", async (e) => {

  const googleProvider = new GoogleAuthProvider()  
  try {
    const googleLogin = await signInWithPopup(auth,googleProvider);
    console.log(googleLogin,"google login")
  } catch {
    console.log("ERROR@@@")
  }
});
