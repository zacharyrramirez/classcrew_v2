# What to Commit to GitHub

## ✅ Safe to Commit

These files contain NO sensitive information and should be committed:

### Code Files
- ✅ `index.html`, `pricing.html`, `auth.html`, `dashboard.html`
- ✅ `style.css`
- ✅ `pricing.json`
- ✅ `firebase-helpers.js` (no credentials, just helper functions)
- ✅ `firebase-config.template.js` (template with placeholders only)

### Documentation
- ✅ `README.md`, `FIREBASE_SETUP.md`, `README_FIREBASE.md`
- ✅ `SECURITY.md` (security guidelines)
- ✅ `GITHUB_GUIDE.md` (this file)

### Configuration
- ✅ `.gitignore` (protects your secrets!)
- ✅ `package.json` (if you add one)
- ✅ Other config files (tsconfig, eslint, etc.)

## ❌ NEVER Commit

These files contain sensitive credentials:

- ❌ `firebase-config.js` - **YOUR ACTUAL FIREBASE CREDENTIALS**
- ❌ `.env`, `.env.local`, `.env.production`
- ❌ `node_modules/` (if you install npm packages)
- ❌ Any file with API keys, passwords, or tokens

## How .gitignore Protects You

The `.gitignore` file tells git to ignore certain files:

```gitignore
# This line prevents firebase-config.js from being committed
firebase-config.js

# These prevent environment files from being committed
.env
.env.local
.env.production
```

## Before Your First Commit

Run these commands to verify everything is safe:

```bash
# Check what will be committed
git status

# Verify firebase-config.js is ignored
git check-ignore firebase-config.js
# Should output: firebase-config.js

# See what changes will be committed
git diff --staged

# If firebase-config.js appears, something is wrong!
```

## First Time Setup for New Team Members

When someone clones your repository, they need to:

1. Clone the repo:
   ```bash
   git clone https://github.com/zacharyrramirez/classcrew_v2.git
   cd classcrew_v2
   ```

2. Create their own config from template:
   ```bash
   copy firebase-config.template.js firebase-config.js
   ```

3. Add their Firebase credentials to `firebase-config.js`

4. The file will automatically be ignored by git (thanks to .gitignore)

## Typical Git Workflow

```bash
# 1. Check status
git status

# 2. Add files (firebase-config.js will be automatically skipped)
git add .

# 3. Review what will be committed
git status
git diff --staged

# 4. Commit (only safe files will be included)
git commit -m "Your commit message"

# 5. Push to GitHub
git push origin main
```

## If You Accidentally Committed Secrets

**DON'T PANIC!** But act quickly:

1. **Remove from git** (keeps file locally):
   ```bash
   git rm --cached firebase-config.js
   git commit -m "Remove firebase config"
   git push origin main
   ```

2. **Rotate your Firebase keys**:
   - Go to Firebase Console > Project Settings
   - Regenerate your API keys and update locally

3. **Consider the old keys compromised**

For more details, see `SECURITY.md`

## GitHub Repository Settings

### Make Repository Private (Recommended for Development)
1. Go to your repo on GitHub
2. Settings > General > Danger Zone
3. Change repository visibility to "Private"

### Or Keep Public with Proper Security
If your repo is public:
- ✅ .gitignore is configured correctly
- ✅ Firebase security rules are strict
- ✅ API keys are restricted to your domain
- ✅ No other secrets in the codebase

## Quick Security Checklist

Before pushing to GitHub:

- [ ] `firebase-config.js` is in `.gitignore`
- [ ] Run `git status` - firebase-config.js should NOT appear
- [ ] Run `git check-ignore firebase-config.js` - should return the filename
- [ ] Review `git diff --staged` - no API keys visible
- [ ] Firebase security rules are configured (not in test mode)
- [ ] No hardcoded passwords or secrets anywhere

## Need Help?

- **Security concerns?** Read `SECURITY.md`
- **Firebase setup?** Read `FIREBASE_SETUP.md`
- **Git basics?** https://docs.github.com/en/get-started

## Summary

**The golden rule:** 
- Template goes to GitHub ✅
- Your actual config stays local ❌

Your `.gitignore` is already configured correctly. Just follow normal git workflows and your secrets will stay safe!
