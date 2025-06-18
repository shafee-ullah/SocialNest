import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("Auth state changed:", user?.email);
      setUser(user);
      setLoading(true);

      if (user) {
        try {
          const token = await user.getIdToken(true);
          // console.log("Got fresh token");

          // Fetch user profile
          try {
            const response = await fetch(
              `http://localhost:5000/users/${user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            // Update user with profile data
            setUser({
              ...user,
              displayName: userData.displayName || user.displayName,
              photoURL: userData.photoURL || user.photoURL,
            });
          } catch (error) {
            console.error("Error fetching user profile:", error);
            // Don't throw the error, just log it and continue
            // The user can still use the app without the profile
          }
        } catch (error) {
          console.error("Error getting token:", error);
          // Handle token refresh error
          if (error.code === "auth/token-expired") {
            // Force reload if token refresh fails
            window.location.href = "/auth/login";
          }
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      // Update local user state
      setUser({
        ...user,
        displayName,
        photoURL,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    createUser,
    logIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
