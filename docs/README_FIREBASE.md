# Firebase Integration Guide

## What's Been Set Up

Your ClassCrew application now has complete Firebase integration for:
- **User Authentication** (Email/Password, Google, GitHub)
- **Cloud Firestore Database** (User profiles, assignments storage)
- **Helper Functions** (Easy-to-use database operations)

## Files Created

1. **firebase-config.js** - Firebase initialization and configuration
2. **firebase-helpers.js** - Reusable functions for common operations
3. **dashboard.html** - Example authenticated page with CRUD operations
4. **FIREBASE_SETUP.md** - Detailed setup instructions

## Quick Start

### 1. Set Up Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Create a new project called "ClassCrew"
3. Click the web icon (`</>`) to add a web app
4. Copy the config object and paste it into `firebase-config.js`

### 2. Enable Authentication

In Firebase Console > Authentication > Sign-in method, enable:
- ✅ Email/Password
- ✅ Google
- ✅ GitHub (optional, requires OAuth app setup)

### 3. Create Firestore Database

1. Go to Firestore Database
2. Click "Create database"
3. Start in **test mode**
4. Choose your region

### 4. Update Security Rules

Go to Firestore Database > Rules and paste:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /assignments/{assignmentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
\`\`\`

## How It Works

### Authentication Flow

1. **Sign Up**: `auth.html` → Creates Firebase Auth user → Creates Firestore user document
2. **Sign In**: `auth.html` → Authenticates user → Redirects to dashboard
3. **Protected Pages**: Check `firebaseAuth.onAuthStateChanged()` → Redirect if not logged in

### Database Structure

#### Users Collection
\`\`\`
users/{userId}
  ├─ uid: string
  ├─ email: string
  ├─ displayName: string
  ├─ photoURL: string
  ├─ createdAt: timestamp
  ├─ plan: string (basic/pro/enterprise)
  └─ assignmentsGraded: number
\`\`\`

#### Assignments Collection
\`\`\`
assignments/{assignmentId}
  ├─ userId: string (reference to user)
  ├─ title: string
  ├─ description: string
  ├─ createdAt: timestamp
  ├─ status: string (pending/completed)
  ├─ grade: number (nullable)
  └─ feedback: string (nullable)
\`\`\`

## Available Functions (firebase-helpers.js)

### User Management
\`\`\`javascript
// Get current user
const user = getCurrentUser();

// Get user data from Firestore
const userData = await getUserData(userId);

// Update user profile
await updateUserProfile(userId, { plan: 'pro' });

// Sign out
await signOut();

// Check if authenticated
const user = await checkAuth(true); // true = redirect to auth.html if not logged in
\`\`\`

### Assignment Management
\`\`\`javascript
// Create assignment
const assignmentId = await createAssignment(userId, {
    title: 'Essay 1',
    description: 'Climate change essay'
});

// Get user's assignments
const assignments = await getUserAssignments(userId);

// Update assignment
await updateAssignment(assignmentId, {
    status: 'completed',
    grade: 95,
    feedback: 'Excellent work!'
});

// Delete assignment
await deleteAssignment(assignmentId);

// Increment graded counter
await incrementAssignmentsGraded(userId);
\`\`\`

## Example: Protect a Page

Add this to any page that requires authentication:

\`\`\`html
<head>
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="firebase-helpers.js"></script>
</head>

<script>
    firebaseAuth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'auth.html';
        } else {
            // User is authenticated, load page content
            console.log('User:', user);
        }
    });
</script>
\`\`\`

## Example: Display User Info

\`\`\`javascript
firebaseAuth.onAuthStateChanged(async (user) => {
    if (user) {
        const userData = await getUserData(user.uid);
        document.getElementById('userName').textContent = user.displayName;
        document.getElementById('userPlan').textContent = userData.plan;
        document.getElementById('assignmentCount').textContent = userData.assignmentsGraded;
    }
});
\`\`\`

## Testing the Integration

### Test Email/Password Auth
1. Open `auth.html`
2. Click "Create Account"
3. Fill in the form and submit
4. Check Firebase Console > Authentication to see the new user
5. Check Firestore > users collection to see user data

### Test Google Auth
1. Click "Google" button on `auth.html`
2. Sign in with your Google account
3. Verify user created in Firebase Console

### Test Dashboard
1. After signing in, go to `dashboard.html`
2. Create a new assignment
3. Check Firestore > assignments collection
4. Try deleting an assignment

## Common Issues

### "Firebase is not defined"
- Make sure Firebase SDK scripts load **before** firebase-config.js
- Check browser console for script loading errors

### "Permission denied" in Firestore
- Verify security rules are set correctly
- Make sure user is authenticated before accessing data
- Check that userId in security rules matches the logged-in user

### Google/GitHub sign-in not working
- Verify the provider is enabled in Firebase Console
- For GitHub, make sure OAuth app is set up correctly
- Check that redirect URLs are whitelisted

### CORS errors
- Make sure you're serving files from a web server (not file://)
- Use VS Code Live Server or similar
- Firebase hosting is recommended for production

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Test authentication
3. ✅ Verify Firestore data creation
4. Add payment integration for plan upgrades
5. Build grading functionality
6. Deploy to Firebase Hosting

## Production Checklist

Before going live:
- [ ] Update Firestore security rules (remove test mode)
- [ ] Set up proper Firebase billing
- [ ] Enable reCAPTCHA for auth
- [ ] Set up error tracking (Firebase Crashlytics)
- [ ] Configure email templates in Authentication settings
- [ ] Set up backup for Firestore data
- [ ] Review and optimize security rules

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-conditions)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Best Practices](https://firebase.google.com/docs/firestore/best-practices)
