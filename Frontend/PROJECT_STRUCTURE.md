# ClassCrew v2 - Project Structure

## 📁 Folder Organization

```
classcrew_v2/
├── 📂 public/              # Public-facing files (HTML, CSS, JSON)
│   ├── index.html          # Homepage
│   ├── pricing.html        # Pricing page
│   ├── auth.html           # Authentication page (login/signup)
│   ├── dashboard.html      # User dashboard (requires auth)
│   ├── style.css           # Custom CSS styles
│   └── pricing.json        # Pricing plan data
│
├── 📂 config/              # Configuration files (SENSITIVE!)
│   ├── firebase-config.js  # ❌ NEVER COMMIT - Your actual Firebase credentials
│   └── firebase-config.template.js  # ✅ Template with placeholders
│
├── 📂 scripts/             # JavaScript helper functions
│   └── firebase-helpers.js # Reusable Firebase database operations
│
├── 📂 docs/                # Documentation
│   ├── README.md           # Main project documentation
│   ├── FIREBASE_SETUP.md   # Firebase setup guide
│   ├── README_FIREBASE.md  # Firebase integration docs
│   ├── SECURITY.md         # Security best practices
│   └── GITHUB_GUIDE.md     # What to commit to GitHub
│
├── 📂 src/                 # Source code (React components - if applicable)
│   └── ...
│
├── 📂 supabase/            # Supabase configuration (if using)
│   └── config.toml
│
├── .gitignore              # Files to exclude from git
├── package.json            # Node.js dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 📄 File Descriptions

### Public Folder (`/public/`)
**Purpose:** Contains all publicly accessible files that make up your website.

- **`index.html`** - Landing page with hero section and features
- **`pricing.html`** - Pricing plans page (loads data from pricing.json)
- **`auth.html`** - User authentication (sign up, login, social auth)
- **`dashboard.html`** - Protected page for logged-in users
- **`style.css`** - Custom CSS (no Tailwind, pure CSS)
- **`pricing.json`** - JSON data for pricing tiers

### Config Folder (`/config/`)
**Purpose:** Configuration files, especially Firebase credentials.

⚠️ **IMPORTANT:** The `firebase-config.js` file is gitignored and should NEVER be committed!

- **`firebase-config.js`** ❌ Your actual Firebase API keys (SECRET!)
- **`firebase-config.template.js`** ✅ Template for other developers

### Scripts Folder (`/scripts/`)
**Purpose:** Reusable JavaScript functions and utilities.

- **`firebase-helpers.js`** - Helper functions for:
  - User management (create, update, get user data)
  - Assignment CRUD operations
  - Authentication helpers
  - Database queries

### Docs Folder (`/docs/`)
**Purpose:** All project documentation and guides.

- **`README.md`** - Main project overview
- **`FIREBASE_SETUP.md`** - Step-by-step Firebase setup
- **`README_FIREBASE.md`** - Complete Firebase integration guide
- **`SECURITY.md`** - Security best practices and credential protection
- **`GITHUB_GUIDE.md`** - What to commit/not commit to GitHub

## 🔗 File References

### How Files Reference Each Other

#### HTML Files in `/public/`
All HTML files reference CSS and scripts using relative paths:

```html
<!-- CSS (same folder) -->
<link rel="stylesheet" href="style.css">

<!-- Firebase config (parent folder -> config) -->
<script src="../config/firebase-config.js"></script>

<!-- Firebase helpers (parent folder -> scripts) -->
<script src="../scripts/firebase-helpers.js"></script>
```

#### Navigation Between Pages
```html
<a href="index.html">Home</a>
<a href="pricing.html">Pricing</a>
<a href="auth.html">Sign In</a>
<a href="dashboard.html">Dashboard</a>
```

## 🚀 Development Workflow

### Setting Up Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/zacharyrramirez/classcrew_v2.git
   cd classcrew_v2
   ```

2. **Create Firebase config**
   ```bash
   copy config/firebase-config.template.js config/firebase-config.js
   ```

3. **Add your Firebase credentials** to `config/firebase-config.js`

4. **Open with a local server**
   - Use VS Code Live Server extension
   - Or: `python -m http.server 8000`
   - Navigate to: `http://localhost:8000/public/`

### File Workflow

```
┌─────────────────────────────────────────┐
│ User visits index.html                  │
└──────────────┬──────────────────────────┘
               │
               ├─→ Loads style.css (same folder)
               │
               └─→ Clicks "Get Started"
                   │
                   ├─→ Goes to auth.html
                   │
                   ├─→ Loads ../config/firebase-config.js
                   │
                   ├─→ User signs in with Firebase
                   │
                   └─→ Redirects to dashboard.html
                       │
                       ├─→ Loads ../scripts/firebase-helpers.js
                       │
                       └─→ Fetches user data from Firestore
```

## 📦 When Deploying

### Option 1: Firebase Hosting (Recommended)
```bash
firebase init hosting
# Select 'public' as your public directory
firebase deploy
```

### Option 2: Netlify/Vercel
- Point build directory to `public/`
- Add environment variables for Firebase config in dashboard
- Deploy!

### Option 3: GitHub Pages
```bash
# Push only the public folder
git subtree push --prefix public origin gh-pages
```

## 🔒 Security Notes

### What's Protected by .gitignore
- ✅ `config/firebase-config.js` - Your actual credentials
- ✅ `.env` files
- ✅ `node_modules/`

### What Gets Committed
- ✅ All files in `public/` (HTML, CSS, JSON)
- ✅ `config/firebase-config.template.js` (template only!)
- ✅ `scripts/firebase-helpers.js` (no credentials)
- ✅ All documentation in `docs/`

## 📚 Quick Reference

### Adding a New Page
1. Create `new-page.html` in `public/`
2. Reference CSS: `<link rel="stylesheet" href="style.css">`
3. Reference Firebase: `<script src="../config/firebase-config.js"></script>`

### Adding a New Script
1. Create `new-script.js` in `scripts/`
2. Reference in HTML: `<script src="../scripts/new-script.js"></script>`

### Adding Documentation
1. Create `NEW_DOC.md` in `docs/`
2. Update this README with a link

## 🎯 Key Paths to Remember

| Type | Path | Description |
|------|------|-------------|
| Homepage | `/public/index.html` | Landing page |
| Styles | `/public/style.css` | All CSS |
| Firebase Config | `/config/firebase-config.js` | ❌ Secret! |
| Config Template | `/config/firebase-config.template.js` | ✅ Safe to share |
| Helpers | `/scripts/firebase-helpers.js` | Database functions |
| Docs | `/docs/*.md` | All documentation |

## 🛠️ Maintenance

### Keeping Organized
- HTML/CSS/JSON → `public/`
- Firebase credentials → `config/`
- Reusable JS → `scripts/`
- Documentation → `docs/`

### Before Committing
```bash
# Check what you're about to commit
git status

# Verify firebase-config.js is NOT listed
# Verify .gitignore is working
git check-ignore config/firebase-config.js
```

## 📞 Need Help?

- **Firebase Setup:** See `docs/FIREBASE_SETUP.md`
- **Security Questions:** See `docs/SECURITY.md`
- **Git/GitHub:** See `docs/GITHUB_GUIDE.md`
- **Firebase Integration:** See `docs/README_FIREBASE.md`

---

**Last Updated:** December 2, 2025
