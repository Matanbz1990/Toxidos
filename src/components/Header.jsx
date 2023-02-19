import React from "react";
import Img from "../assets/toxidos.jpg";
import { useState } from "react";
import classes from "./Header.module.css";
function Header(props) {
  const [userPassword, setUserPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  // const { signUp } = useAuth();
  const realPassword = process.env.REACT_APP_PASSWORD;

  const passwordHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const submitPassword = (e) => {
    e.preventDefault();
    // signUp(userPassword);

    if (userPassword === realPassword) {
      props.setIsAuthenticated(true);
      setUserPassword("");
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    props.setIsAuthenticated(false);
  };
  return (
    <header>
      <div className={classes.container2}>
        <img src={Img} alt="img"></img>
        <div className={classes.text}>
          <h1>Toxidos Events Managment</h1>
        </div>
      </div>
      {!props.isAuthenticated && (
        <form className={classes.container3} onSubmit={submitPassword}>
          <label>Manger Accses</label>
          <input
            type="password"
            id="pass"
            name="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={userPassword}
          />
          {wrongPassword && <h3>wrong password, try again</h3>}

          <button type="submit">Log in</button>
        </form>
      )}
      {props.isAuthenticated && (
        <form className={classes.container3} onSubmit={logOut}>
          <h3>Manging state </h3>
          <button type="submit">Log out</button>
        </form>
      )}
    </header>
  );
}

export default Header;
