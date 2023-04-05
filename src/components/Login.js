import React from "react";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import classes from "./Login.module.css";
export default function Login(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let emailRef = useRef();
  let passwordRef = useRef();
  const { login } = useAuth();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      closeLogin();
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  const closeLogin = () => {
    props.handleLoginIsOpen();
  };
  const changeToSignup = () => {
    props.handleLoginIsOpen();
    props.handleSignUpIsOpen();
  };
  const changeToForgetPassword = () => {
    props.handleLoginIsOpen();
    props.handleForgetPasswordIsOpen();
  };

  return (
    <Modal
      open={props.loginIsOpen}
      onClose={closeLogin}
      className={classes.loginmodal}
    >
      <form onSubmit={submitLogin}>
        <h1>Login</h1>
        <div className={classes.inputsGroup}>
          <div className={classes.inputlabel}>
            <label>אימייל:</label>
            <input ref={emailRef} />
          </div>
          <div className={classes.inputlabel}>
            <label>סיסמא:</label>
            <input type="password" ref={passwordRef} />
          </div>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        <p>
          שכחת את הסיסמא? לחץ
          <span onClick={changeToForgetPassword}>כאן</span>{" "}
        </p>
        <p>עדיין אין לך חשבון?</p>
        <button
          onClick={changeToSignup}
          disabled={loading}
          className={classes.littleButton}
        >
          Sign up
        </button>
      </form>
    </Modal>
  );
}
