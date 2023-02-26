import { useContext, useState, useEffect } from "react";
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// console.log(auth);

// const auth = getAuth();
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      return unSubscribe;
    });
  }, []);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    console.log("login");
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    console.log("logout");
    return auth.signOut();
  };
  const resetPassword = (email) => {
    console.log("reset password");
    return auth.sendPasswordResetEmail(email);
  };

  const value = { currentUser, login, signup, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
