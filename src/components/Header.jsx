import React from "react";
import Img from "../assets/toxidos.jpg";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
function Header(props) {
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [code, setCode] = useState(null);
  useEffect(() => {
    fetch(
      "https://toxidos-24688-default-rtdb.firebaseio.com/password.json"
    ).then((promise) => {
      promise.json().then((data) => {
        data = data.toString();
        setCode(data);
      });
    });
  }, []);
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitPassword = (e) => {
    e.preventDefault();

    if (password === code) {
      props.setIsAuthenticated(true);
      setPassword("");
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
    }
    // }
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
          <h1>
            {/* <SentimentSatisfiedOutlinedIcon /> */}
            Toxidos Events Managment
          </h1>
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
            value={password}
          />
          {wrongPassword && <h3>wrong password, try again</h3>}
          {/* {!passwordIsValid && (
            <h4>the password must have at least 6 characters</h4>
          )} */}
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
