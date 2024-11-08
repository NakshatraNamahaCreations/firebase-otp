import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

// Create context for user authentication
const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Signup with email and password
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logOut() {
    return signOut(auth);
  }

  // Google Sign-In function
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // Set up reCAPTCHA for phone authentication
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible", // Makes reCAPTCHA invisible
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Provide context values
  return (
    <UserAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

// Custom hook to use the UserAuthContext
export function useUserAuth() {
  return useContext(UserAuthContext);
}
