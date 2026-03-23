# Firebase Authentication Setup Guide

This app uses Firebase Authentication with Google and Email providers. Follow these steps to set up Firebase for your project.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project" or select an existing project
3. Enter a project name (e.g., "LocalHub")
4. Follow the setup wizard and create the project

## 2. Enable Authentication

1. In the Firebase Console, go to **Authentication** (under Build menu)
2. Click **Get started**
3. Enable the following sign-in providers:
   - **Email/Password** - Enable "Email/Password"
   - **Google** - Click on Google provider, enable it, and add your OAuth consent screen details

## 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Under "Your apps" section, click on the web app icon (or create a new web app)
3. Copy the Firebase configuration object
4. You'll see something like:

```javascript
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

## 4. Set Environment Variables

1. Rename `.env.local.example` to `.env.local`
2. Fill in the values from your Firebase project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Google OAuth Setup (Important for Google Sign-In)

1. In Firebase Console, go to **Authentication > Sign-in method > Google**
2. You'll see a note about configuring OAuth consent screen
3. Click the link to configure the OAuth consent screen:
   - Select "External" for User Type
   - Fill in required fields (App name, User support email, etc.)
   - Add your app domain under "Authorized domains"
4. Save and return to Firebase Authentication

## 6. Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to:
   - **Sign Up**: http://localhost:3000/auth/signup
   - **Sign In**: http://localhost:3000/auth/login

3. Test both email/password and Google sign-in

## Testing with Test Accounts

For development, Firebase allows you to create test user accounts:

1. In Firebase Console > Authentication > Users tab
2. Click "Add user"
3. Enter email and password for testing

## Security Rules (Optional - for Firestore)

If you plan to use Firestore, set up security rules. Example basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## File Structure

The authentication system consists of:

- `lib/firebase.ts` - Firebase initialization
- `lib/auth-context.tsx` - Authentication context and hooks
- `components/LoginForm.tsx` - Login form component
- `components/SignupForm.tsx` - Signup form component
- `app/auth/login/page.tsx` - Login page
- `app/auth/signup/page.tsx` - Signup page
- `components/Navbar.tsx` - Updated navbar with auth links

## Usage in Components

Use the `useAuth()` hook in your components:

```tsx
"use client";

import { useAuth } from "@/lib/auth-context";

export function MyComponent() {
  const { user, loading, logOut, signInWithGoogle } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        Welcome, {user.email}!<button onClick={() => logOut()}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
  );
}
```

## Troubleshooting

### "Invalid configuration found in components.json"

- Make sure `.env.local` file exists with all required Firebase variables
- Restart the development server after adding environment variables

### Google Sign-In popup not opening

- Check that your domain is added to "Authorized domains" in Firebase
- For localhost development, the domain is automatically trusted
- Make sure the OAuth consent screen is configured

### "Auth.currentUser is null"

- The auth state takes a moment to initialize
- Always check the `loading` state before rendering

### CORS errors with Google Sign-In

- This usually means the domain isn't authorized in Firebase
- Add your domain to "Authorized domains" in the Google OAuth consent screen

## Next Steps

1. Extend user profiles by creating a Firestore collection for additional user data
2. Add role-based access control (customer vs. provider)
3. Implement email verification for new signups
4. Add password reset functionality
5. Implement social linking (link multiple auth methods to one account)
