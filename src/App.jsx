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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bandName, setbandName] = useState("");
  const { currentUser } = useAuth();

  const eventsCollectionRef = collection(db, "events");
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    if (!currentUser) {
      closeTheCreateEvent();
    }

    getDocs(usersCollectionRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // if (currentUser)
      });
    });
  }, [currentUser]);

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

  const closeTheCreateEvent = () => {
    setShowCreateEvent(false);
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
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        key={Math.random()}
        handleSignUpIsOpen={handleSignUpIsOpen}
        handleLoginIsOpen={handleLoginIsOpen}
        setLoginIsOpen={setLoginIsOpen}
      />

      {!isAuthenticated && <Home handleSignUpIsOpen={handleSignUpIsOpen} />}
      {!showCreateEvent && isAuthenticated && (
        <div className={classes.buttonContainer}>
          <button
            className={classes.button1}
            onClick={() => {
              setShowCreateEvent(true);
            }}
          >
            Create event
          </button>
        </div>
      )}
      {signUpIsOpen && (
        <Signup
          signUpIsOpen={signUpIsOpen}
          handleSignUpIsOpen={handleSignUpIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {loginIsOpen && (
        <Login
          loginIsOpen={loginIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
          handleSignUpIsOpen={handleSignUpIsOpen}
          handleForgetPasswordIsOpen={handleForgetPasswordIsOpen}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {forgetPasswordIsOpen && (
        <ForgetPassword
          handleForgetPasswordIsOpen={handleForgetPasswordIsOpen}
          setIsAuthenticated={setIsAuthenticated}
          handleLoginIsOpen={handleLoginIsOpen}
          forgetPasswordIsOpen={forgetPasswordIsOpen}
        />
      )}
      {isAuthenticated && showCreateEvent && (
        <CreateEvent
          onAdd={addEvent}
          closeCreateEvent={closeTheCreateEvent}
          // eventIsAdded={eventAdded}
          key={Math.random()}
        />
      )}
      {isAuthenticated && (
        <Events
          eventAdded={eventAdded}
          closeTheCreateEvent={closeTheCreateEvent}
          isAuthenticated={isAuthenticated}
          key={Math.random()}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
