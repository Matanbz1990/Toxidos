import { useContext, useState, useEffect } from "react";
import React from "react";
import { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      return unSubscribe;
    });
  }, []);
  const value = { currentUser };

  const signUp = (password) => {
    return auth.createUserWithPassword(password);
  };

  return (
    <AuthContext.Provider value={(value, signUp)}>
      {children}
    </AuthContext.Provider>
  );
}
