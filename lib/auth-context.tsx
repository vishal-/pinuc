"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      throw err;
    }
  };

  const logOut = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during logout"
      );
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during Google sign-in"
      );
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signUp, logIn, logOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
