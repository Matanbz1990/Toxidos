import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import classes from "./Signup.module.css";

function Signup(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bandName, setBandName] = useState("");

  const { signup, getUserData } = useAuth();

  let emailRef = useRef();
  let passwordRef = useRef();
  let validatePasswordRef = useRef();
  const submitSignUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setError(
        "the password is not stong enougth( at least 6 charcters)"
      );
    }
    if (passwordRef.current.value !== validatePasswordRef.current.value) {
      return setError("the passwords are not the same,try again");
    }

    try {
      setError("");
      console.log(bandName);
      await getUserData(bandName);
      await signup(emailRef.current.value, passwordRef.current.value);
      closeSignUp();
    } catch {
      setError("failed to create an account");
    }

    setLoading(false);
  };

  const closeSignUp = () => {
    props.handleSignUpIsOpen();
  };
  const changeToLogin = () => {
    closeSignUp();
    props.handleLoginIsOpen();
  };
  const onChangeBandName = (e) => {
    setBandName(e.target.value);
  };

  // currentUser.band = bandName;

  // console.log(currentUser.band);
  return (
    <Modal
      open={props.signUpIsOpen}
      onClose={closeSignUp}
      className={classes.modal}
    >
      <form onSubmit={submitSignUp}>
        <h1>Sign Up</h1>
        <div className={classes.inputsGroup}>
          <div className={classes.inputlabel}>
            <label>Band name:</label>
            <input
              type="text"
              onChange={onChangeBandName}
              value={bandName}
              required
            />
          </div>
          <div className={classes.inputlabel}>
            <label>Email:</label>
            <input type="email" ref={emailRef} required />
          </div>

          <div className={classes.inputlabel}>
            <label>password:</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <div className={classes.inputlabel}>
            <label>password (confirm):</label>
            <input type="password" ref={validatePasswordRef} required />
          </div>
        </div>
        {error && <p>{error}</p>}
        {loading && <p>Loading</p>}
        <button disabled={loading} type="submit">
          Sign up
        </button>
        <p>do you already have an account?</p>
        <button className={classes.littleButton} onClick={changeToLogin}>
          Login
        </button>
      </form>
    </Modal>
  );
}
export default Signup;
