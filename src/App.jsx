import React, { useState } from "react";
import Events from "./components/Events";
import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
function App() {
  const [eventAdded, setEventAdded] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { currentUser } = useAuth();
  // console.log(currentUser);
  function addEvent(newEvent) {
    console.log(newEvent);
    fetch("https://toxidos-24688-default-rtdb.firebaseio.com/events.json", {
      method: "POST",
      body: JSON.stringify({
        event: newEvent,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setEventAdded(true);
        setTimeout(() => {
          setEventAdded(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
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

  return (
    <AuthProvider>
      <div className={classes.appContainer}>
        <Header
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          key={Math.random()}
          handleSignUpIsOpen={handleSignUpIsOpen}
          handleLoginIsOpen={handleLoginIsOpen}
          setLoginIsOpen={setLoginIsOpen}
        />
        {/* <div className={classes.icons}>
        <AdditionalContent />
      </div> */}
        {!isAuthenticated && <Home handleSignUpIsOpen={handleSignUpIsOpen} />}
        {!showCreateEvent && isAuthenticated && (
          <div className={classes.buttonContainer}>
            <button
              className={classes.button1}
              onClick={() => {
                setShowCreateEvent(true);
              }}
              // disabled={!isAuthenticated}
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
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
        {showCreateEvent && (
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
    </AuthProvider>
  );
}

export default App;
