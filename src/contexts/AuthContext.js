import { useContext, useState, useEffect } from "react";
import React from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// console.log(auth);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("matan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
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
  const logout = (email, password) => {
    console.log("logout");
    return auth.signOut();
  };

  const value = { currentUser, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
