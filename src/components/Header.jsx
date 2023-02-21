import React from "react";
// import Img from "../assets/toxidos.jpg";
// import { useState } from "react";
import classes from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
function Header(props) {
  const [error, setError] = useState("");
  // const realPassword = process.env.REACT_APP_PASSWORD;

  // const submitPassword = (e) => {
  //   e.preventDefault();
  // };
  const { currentUser, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
      props.setIsAuthenticated(false);
      // openLogin();
    } catch {
      setError("Failed to log out");
    }
    props.setIsAuthenticated(false);
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
        {/* <img src={Img} alt="img"></img> */}
        <div className={classes.text}>
          <h1> Weddiment </h1>
          <p className={classes.ptext}>
            {" "}
            weddings and events mangment platform for bands managers
          </p>
        </div>
      </div>
      {!props.isAuthenticated && (
        <div className={classes.container3}>
          <button type="submit" onClick={openLogin}>
            Log in
          </button>
          <button type="submit" onClick={openSignUp}>
            sign up
          </button>
        </div>
      )}
      {props.isAuthenticated && (
        <form className={classes.container3} onSubmit={handleLogout}>
          <h3>{currentUser.email} is connected </h3>
          {error && <p>{error}</p>}
          <button type="submit">Log out</button>
        </form>
      )}
    </header>
  );
}

export default Header;
