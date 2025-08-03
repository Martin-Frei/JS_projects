/**
 * Firebase Notes Application
 * This application allows users to register, log in, and manage their notes using Firebase.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  push,
  set, 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5J8OVxFRBU6njw8vhUQPZv2Tl_hYpA_g",
  authDomain: "form-b6850.firebaseapp.com",
  databaseURL: "https://form-b6850-default-rtdb.firebaseio.com", 
  projectId: "form-b6850",
  storageBucket: "form-b6850.firebasestorage.app",
  messagingSenderId: "732747706558",
  appId: "1:732747706558:web:770600e45448ff47b7eeef",
  measurementId: "G-0944GTTWGJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


let notesSection = document.getElementById("notesSection");
let userEmail = document.getElementById("userEmail");
let addNotes = document.getElementById("addNotes"); 
let notesList = document.getElementById("notesList");

window.register = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  
  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }
  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful!");
    
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
};

window.login = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  
  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

window.logout = async function () {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    notesSection.style.display = "block";
    userEmail.innerText = "Welcome, " + user.email;
    loadNotes(); 
  } else {
    notesSection.style.display = "none";
    userEmail.innerText = "";
    notesList.innerHTML = ""; 
  }
});


window.addNote = async function () {
  let user = auth.currentUser; 

  if (!user || addNotes.value.trim() === "") {
    alert("Please log in and enter a note!");
    return;
  }
  
  try {
    let notesRef = ref(db, "notes/" + user.uid);
    let newNoteRef = push(notesRef);
    await set(newNoteRef, {
      content: addNotes.value.trim(), 
      timestamp: Date.now(),
    });
    
    addNotes.value = "";
    
    console.log("Note added successfully!");
  } catch (error) {
    alert("Failed to add note: " + error.message);
  }
};

function loadNotes() {
  let user = auth.currentUser;
  if (!user) {
    console.log("No user logged in");
    return;
  }
  
  let notesRef = ref(db, "notes/" + user.uid);
  onValue(notesRef, (snapshot) => {
    notesList.innerHTML = "";
    
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        let note = childSnapshot.val();
        let li = document.createElement("li");
        li.textContent = note.content; 
        
      
        let timestamp = new Date(note.timestamp).toLocaleString();
        let timeSpan = document.createElement("small");
        timeSpan.textContent = " (" + timestamp + ")";
        timeSpan.style.color = "#666";
        
        li.appendChild(timeSpan);
        notesList.appendChild(li);
      });
    } else {
  let li = document.createElement("li");
  li.textContent = "No notes yet. Add your first note!";
  li.style.fontStyle = "italic";
  li.style.color = "#666";
  notesList.appendChild(li);
}
  }, (error) => {
    console.error("Error loading notes:", error);
    alert("Failed to load notes: " + error.message);
  });
}