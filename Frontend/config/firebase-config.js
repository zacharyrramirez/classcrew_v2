// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSyBrsei2OXneDgVte0SUI6jSSRzEIhMBzvU",
  authDomain: "classcrew-45595.firebaseapp.com",
  databaseURL: "https://classcrew-45595-default-rtdb.firebaseio.com",
  projectId: "classcrew-45595",
  storageBucket: "classcrew-45595.firebasestorage.app",
  messagingSenderId: "496661610033",
  appId: "1:496661610033:web:c04d397cd6220e4f775f10",
  measurementId: "G-H84RCQEKHT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// Export for use in other files
window.firebaseAuth = auth;
window.firebaseDb = db;
window.googleProvider = googleProvider;
window.githubProvider = githubProvider;
