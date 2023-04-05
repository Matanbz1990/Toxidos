import React, { useEffect, useState } from "react";
import Events from "./components/Events";
import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import CreateEvent from "./components/CreateEvent";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Home from "./components/Home";

function App() {
  const [eventAdded, setEventAdded] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [forgetPasswordIsOpen, setForgetPasswordIsOpen] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const { currentUser } = useAuth();

  const eventsCollectionRef = collection(db, "events");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    getDocs(usersCollectionRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {});
    });
  }, [currentUser, usersCollectionRef]);

  function addEvent(newEvent) {
    addDoc(eventsCollectionRef, newEvent)
      .then(() => {
        setEventAdded(true);
        setTimeout(() => {
          setEventAdded(false);
        }, 1000);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  const changeTheCreateEvent = () => {
    setShowCreateEvent(!showCreateEvent);
  };
  const handleSignUpIsOpen = () => {
    setSignUpIsOpen(!signUpIsOpen);
  };
  const handleLoginIsOpen = () => {
    setLoginIsOpen(!loginIsOpen);
  };
  const handleForgetPasswordIsOpen = () => {
    setForgetPasswordIsOpen(!forgetPasswordIsOpen);
  };

  return (
    <div className={classes.appContainer}>
      <Header
        handleSignUpIsOpen={handleSignUpIsOpen}
        handleLoginIsOpen={handleLoginIsOpen}
        setLoginIsOpen={setLoginIsOpen}
      />

      {currentUser ? (
        <>
          {showCreateEvent ? (
            <CreateEvent
              onAdd={addEvent}
              closeCreateEvent={changeTheCreateEvent}
              openTheCreateEvent={changeTheCreateEvent}
            />
          ) : (
            <div className={classes.buttonContainer}>
              <button
                className={classes.button1}
                onClick={() => {
                  changeTheCreateEvent();
                }}
              >
                צור ארוע
              </button>
            </div>
          )}
          <Events eventAdded={eventAdded} />
        </>
      ) : (
        <Home handleSignUpIsOpen={handleSignUpIsOpen} />
      )}
      {signUpIsOpen && (
        <Signup
          signUpIsOpen={signUpIsOpen}
          handleSignUpIsOpen={handleSignUpIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
        />
      )}
      {loginIsOpen && (
        <Login
          loginIsOpen={loginIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
          handleSignUpIsOpen={handleSignUpIsOpen}
          handleForgetPasswordIsOpen={handleForgetPasswordIsOpen}
        />
      )}
      {forgetPasswordIsOpen && (
        <ForgetPassword
          handleForgetPasswordIsOpen={handleForgetPasswordIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
          forgetPasswordIsOpen={forgetPasswordIsOpen}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
