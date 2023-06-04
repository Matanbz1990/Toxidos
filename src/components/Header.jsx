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
  const { currentUser, logout, review } = useAuth();

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
  // console.log(currentUser.name);
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
      <div className={classes.containerImgH}>
        {/* <div className={classes.text}> */}
        <img src={Rings} alt="img"></img>
        <h1> Weddiment </h1>
      </div>

      {/* </div> */}
      {!currentUser && (
        <div className={classes.container3}>
          <button type="submit" onClick={review}>
            Try it
          </button>
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
          <h5>{currentUser.email} מחובר </h5>

          {error && <p>{error}</p>}
          <button type="submit">Log out</button>
        </form>
      )}
    </header>
  );
}

export default Header;
