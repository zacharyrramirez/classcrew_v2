# 🔒 Firebase Security & GitHub Guide

## ⚠️ IMPORTANT: Protecting Your Firebase Credentials

Your Firebase API keys and configuration **MUST NOT** be committed to GitHub. Here's how to keep them secure:

## Setup Instructions

### 1. Create Your Local Config File

```bash
# Copy the template
cp firebase-config.template.js firebase-config.js

# Add your actual Firebase credentials to firebase-config.js
```

### 2. Verify .gitignore

The `.gitignore` file already includes:
```
firebase-config.js
.env
.env.local
```

This prevents your credentials from being committed.

### 3. Check What's Being Committed

Before committing to GitHub:
```bash
git status
git diff
```

Make sure `firebase-config.js` is NOT listed!

## What Gets Committed to GitHub

✅ **Safe to commit:**
- `firebase-config.template.js` (template with placeholders)
- `.gitignore` (protects your secrets)
- `firebase-helpers.js` (no credentials)
- All HTML, CSS, and other code files

❌ **NEVER commit:**
- `firebase-config.js` (contains your actual API keys)
- `.env` files
- Any file with real credentials

## For Team Members / Other Developers

When someone clones your repo, they should:

1. Copy the template:
   ```bash
   cp firebase-config.template.js firebase-config.js
   ```

2. Create their own Firebase project

3. Add their credentials to `firebase-config.js`

## Common Security Questions

### Q: Can people see my Firebase API keys in the browser?
**A:** Yes, Firebase API keys are public by design. Security is handled by:
- Firestore Security Rules
- Firebase Authentication
- Domain restrictions in Firebase Console

### Q: What if I accidentally committed my config?
**A:** If you already committed `firebase-config.js`:

```bash
# Remove from git but keep locally
git rm --cached firebase-config.js

# Commit the removal
git commit -m "Remove firebase config from repo"

# Rotate your API keys in Firebase Console (recommended)
```

### Q: Should I rotate my keys if they were exposed?
**A:** Yes! Go to Firebase Console > Project Settings > Service accounts and regenerate your keys.

## Additional Security Best Practices

### 1. Set Up Firebase Security Rules

In Firestore Database > Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /assignments/{assignmentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 2. Restrict API Keys by Domain

In Firebase Console > Project Settings > API Keys:
- Add your production domain (e.g., `classcrew.com`)
- Add `localhost` for development
- Remove wildcard (`*`) restrictions

### 3. Enable App Check (Production)

Firebase App Check protects your backend resources from abuse:
```javascript
// Add to firebase-config.js (after Firebase is initialized)
const appCheck = firebase.appCheck();
appCheck.activate('YOUR_RECAPTCHA_SITE_KEY');
```

### 4. Use Environment Variables for Build Tools

If using a build tool (Vite, Webpack, etc.), use environment variables:

**.env.local** (gitignored):
```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
# ... etc
```

**vite.config.js**:
```javascript
export default defineConfig({
  define: {
    'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY)
  }
})
```

## Verifying Your Setup

### Check if config is ignored:
```bash
git check-ignore firebase-config.js
# Should output: firebase-config.js

git status
# Should NOT show firebase-config.js as changed/untracked
```

### Test adding to git:
```bash
git add firebase-config.js
# Should output: The following paths are ignored by one of your .gitignore files
```

## Emergency: Credentials Were Exposed

If you accidentally pushed credentials to GitHub:

1. **Immediately rotate all keys** in Firebase Console
2. Remove from git history:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch firebase-config.js' \
   --prune-empty --tag-name-filter cat -- --all
   
   git push origin --force --all
   ```
3. Consider the old keys compromised
4. Review Firebase usage logs for suspicious activity
5. Consider using GitHub's secret scanning (automatic for public repos)

## Deployment Considerations

### GitHub Pages
- Firebase config will be exposed in your deployed JS
- **This is OK** if you have proper security rules
- Users can see the config but can't misuse it with proper rules

### Netlify/Vercel
- Use environment variables in build settings
- Keep firebase-config.js out of the repo
- Generate config dynamically at build time

### Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

## Summary Checklist

- [ ] `.gitignore` includes `firebase-config.js`
- [ ] `firebase-config.template.js` exists with placeholders
- [ ] Real credentials are only in local `firebase-config.js`
- [ ] Firestore security rules are properly configured
- [ ] API keys are restricted to your domain(s)
- [ ] Tested that git won't commit the config file
- [ ] Team members know to use the template

## Need Help?

- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)
- [Securing Client-Side API Keys](https://firebase.google.com/docs/projects/api-keys)
- [GitHub .gitignore Templates](https://github.com/github/gitignore)
