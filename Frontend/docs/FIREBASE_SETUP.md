# Firebase Setup Guide

## 🔒 IMPORTANT: Security First!

**Your Firebase credentials MUST be kept secret!** 

Before you start:
1. ✅ `.gitignore` is already configured to exclude `firebase-config.js`
2. ✅ A template file (`firebase-config.template.js`) is provided
3. ✅ Your actual config file will NOT be committed to GitHub

**READ `SECURITY.md` for complete security guidelines!**

---

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "ClassCrew")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the Web icon (`</>`) to add a web app
2. Register your app with a nickname (e.g., "ClassCrew Web")
3. Copy the Firebase configuration object
4. **IMPORTANT**: Paste it into `firebase-config.js` (NOT the template!)
   - The file `firebase-config.js` should already exist
   - If not, copy `firebase-config.template.js` to `firebase-config.js` first
   - Replace ALL placeholder values with your actual credentials

**Security Check:** Run this command to verify your config won't be committed:
```bash
git check-ignore firebase-config.js
```
Should output: `firebase-config.js` ✅

## Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click Enable, then Save
   - **Google**: Click Enable, add your support email, then Save
   - **GitHub**: 
     - Enable it
     - Follow instructions to create OAuth app on GitHub
     - Add Client ID and Client Secret
     - Add the callback URL to your GitHub OAuth app

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
   - Later, update security rules for production
4. Select a location close to your users
5. Click "Enable"

## Step 5: Configure Firestore Security Rules

In Firestore Database > Rules tab, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Assignments collection - users can only access their own assignments
    match /assignments/{assignmentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 6: Update Your Code

Your `firebase-config.js` should now have your actual Firebase credentials:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123",
    measurementId: "G-ABC123"
};
```

## Step 7: Test Your Setup

1. Open `auth.html` in your browser
2. Try creating a new account with email/password
3. Check Firebase Console > Authentication to see if the user was created
4. Check Firestore Database to see if user data was stored

## Database Structure

### Users Collection (`users/{userId}`)
```javascript
{
  uid: "user_id_from_auth",
  email: "user@example.com",
  displayName: "John Doe",
  createdAt: timestamp,
  plan: "basic",  // or "pro", "enterprise"
  assignmentsGraded: 0
}
```

### Assignments Collection (`assignments/{assignmentId}`)
```javascript
{
  userId: "user_id",
  title: "Assignment 1",
  createdAt: timestamp,
  status: "pending",  // or "completed"
  grade: null,
  feedback: null
}
```

## Useful Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth/web/start)
- [Cloud Firestore Docs](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Troubleshooting

### "Firebase not defined" error
- Make sure Firebase SDK scripts are loaded before `firebase-config.js`

### Authentication not working
- Check Firebase Console > Authentication to see if the method is enabled
- Verify your Firebase config values are correct

### Firestore permission denied
- Check your security rules in Firestore Database > Rules
- Make sure the user is authenticated before trying to access Firestore
