import React from "react";
import { useEffect } from "react";
import Rings from "../assets/rings.png";
import classes from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useState } from "react";

function Header(props) {
  const [error, setError] = useState("");
  const [bandName, setBandName] = useState("");
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const nameOfBand = capitalizeFirstLetter(doc.data().band);
          setBandName(nameOfBand);
        });
    }
  }, [currentUser]);

  function capitalizeFirstLetter(string) {
    const first = string.charAt(0).toUpperCase();
    const rest = string.slice(1);
    return first + rest;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
    setBandName("");
  };

  const openSignUp = () => {
    props.handleSignUpIsOpen();
  };
  const openLogin = () => {
    props.handleLoginIsOpen();
  };
  return (
    <header>
      <div className={classes.container2}>
        <img src={Rings} alt="img"></img>
        <div className={classes.text}>
          <h1> Weddiment </h1>

          <p className={classes.ptext}>
            weddings and events mangment platform for bands managers
          </p>
        </div>
      </div>
      {!currentUser && (
        <div className={classes.container3}>
          <button type="submit" onClick={openLogin}>
            Log in
          </button>
          <button type="submit" onClick={openSignUp}>
            sign up
          </button>
        </div>
      )}
      {currentUser && (
        <form className={classes.container3} onSubmit={handleLogout}>
          <h3>{bandName}</h3>
          <h5>{currentUser.email} is connected </h5>

          {error && <p>{error}</p>}
          <button type="submit">Log out</button>
        </form>
      )}
    </header>
  );
}

export default Header;
