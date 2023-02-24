import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import classes from "./ForgetPassword.module.css";
export default function ForgetPassword(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  let emailRef = useRef();

  const submitForgetPassword = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      await resetPassword(emailRef.current.value);
      //   props.setIsAuthenticated(true);
      //   handleForgetPassword();
      setMessage("check your inbox for further instructions");
    } catch {
      setError("failed to reset password");
    }

    setLoading(false);
  };

  const handleForgetPassword = () => {
    props.handleForgetPasswordIsOpen();
  };
  const changeToLogin = () => {
    handleForgetPassword();
    props.handleLoginIsOpen();
  };

  return (
    <Modal
      open={props.forgetPasswordIsOpen}
      onClose={handleForgetPassword}
      className={classes.modal}
    >
      <form onSubmit={submitForgetPassword}>
        <h1>Password recovery</h1>
        {message && <p className={classes.goodMessage}>{message}</p>}
        <div className={classes.inputsGroup}>
          <div className={classes.inputlabelforget}>
            <label>Email:</label>
            <input type="email" ref={emailRef} required />
          </div>
        </div>
        {error && <p>{error}</p>}
        {loading && <p>Loading</p>}
        <div className={classes.buttons}>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
          <br></br>
          <button className={classes.littleButton} onClick={changeToLogin}>
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
}
