// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm7ByR4lvqEVIu1jU-ZgD-y4o7R9QT4Pc",
  authDomain: "fir-nida.firebaseapp.com",
  projectId: "fir-nida",
  storageBucket: "fir-nida.firebasestorage.app",
  messagingSenderId: "36021624876",
  appId: "1:36021624876:web:2d25b329eaf7d6d4b43189",
  measurementId: "G-00L4RD7K25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// User roles
const USER_ROLES = {
  USER: 'user',
  EDITOR: 'editor', 
  ADMIN: 'admin'
};

// Register Function
window.register = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Speichere nur Basis-User-Daten - ROLLE WIRD MANUELL IN FIREBASE GESETZT
      return set(ref(database, 'users/' + user.uid), {
        email: email,
        role: USER_ROLES.USER, // Standard-Rolle, wird manuell geändert
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'pending' // Status bis Admin Rolle zuweist
      });
    })
    .then(() => {
      alert("Registration successful! Please wait for role assignment by admin.");
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
      console.error("Registration error:", error);
    });
};

// Login Function
window.login = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Update last login
      set(ref(database, 'users/' + user.uid + '/lastLogin'), new Date().toISOString());
      
      alert("Login successful!");
      // Weiterleitung wird durch onAuthStateChanged gehandhabt
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    });
};

// Auth State Change Listener - Automatische Weiterleitung
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User ist eingeloggt - hole Rolle und leite weiter
    getUserRoleAndRedirect(user.uid);
  } else {
    // User ist nicht eingeloggt - bleibe auf Login-Seite
    console.log("User logged out");
  }
});

// Funktion um User-Rolle zu holen und weiterzuleiten
async function getUserRoleAndRedirect(userId) {
  try {
    const userRef = ref(database, 'users/' + userId);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userRole = userData.role;
      const userStatus = userData.status;
      
      console.log("User role:", userRole, "Status:", userStatus);
      
      // Prüfe ob User noch auf Rollenzuweisung wartet
      if (userStatus === 'pending' && userRole === 'user') {
        window.location.href = 'pending.html';
        return;
      }
      
      // Weiterleitung basierend auf Rolle
      switch(userRole) {
        case USER_ROLES.ADMIN:
          window.location.href = 'admin.html';
          break;
        case USER_ROLES.EDITOR:
          window.location.href = 'editor.html';
          break;
        case USER_ROLES.USER:
        default:
          window.location.href = 'user.html';
          break;
      }
    } else {
      console.error("No user data found");
      alert("User data not found. Please contact admin.");
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    alert("Error loading user data");
  }
}

// Funktion um aktuelle User-Rolle zu holen (für andere Seiten)
window.getCurrentUserRole = async function() {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const userRef = ref(database, 'users/' + user.uid);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return snapshot.val().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

// Logout Funktion (für andere Seiten)
window.logout = function() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error("Logout error:", error);
  });
};