// Firebase Configuration Template
// INSTRUCTIONS:
// 1. Copy this file and rename it to 'firebase-config.js'
// 2. Replace the placeholder values with your actual Firebase credentials
// 3. NEVER commit firebase-config.js to git (it's in .gitignore)

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
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
