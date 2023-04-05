import React, { useCallback, useEffect, useState } from "react";
import Events from "./Events";
import classes from "./App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import CreateEvent from "./CreateEvent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Home from "./Home";

function App() {
  const [events, setEvents] = useState([]);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [forgetPasswordIsOpen, setForgetPasswordIsOpen] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const { currentUser } = useAuth();
  const eventsCollectionRef = collection(db, "events");
  const [q, setQ] = useState(
    query(eventsCollectionRef, where("userId", "==", currentUser.uid))
  );

  //get the events from db
  // useEffect(() => {
  //   let array = [];
  //   let arrOfID = [];
  //   const querySnapshot = getDocs(q);
  //   if (querySnapshot.empty) {
  //     console.log("no");
  //     setQ("");
  //     return;
  //   }
  //   querySnapshot.forEach((doc) => {
  //     arrOfID.push(doc.id);
  //     array.push(doc.data());
  //   });

  //   for (let i = 0; i < arrOfID.length; i++) {
  //     array[i].id = arrOfID[i];
  //   }
  //   setEvents(array);
  //   console.log(events);
  // }, []);

  // useEffect(() => {
  //   getDocs(usersCollectionRef).then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {});
  //   });
  // }, [currentUser, usersCollectionRef]);

  // useEffect(() => {
  //   eventsCollectionRef.onSnapshot((snapshot) => {
  //     if (snapshot.docChanges().any((doc) => doc.type === "added")) {
  //       setEventAdded(true);
  //       setTimeout(() => {
  //         setEventAdded(false);
  //       }, 1000);
  //     }

  //     setEvents(snapshot.docs);
  //   });
  // }, []);

  //add event
  function addEvent(newEvent) {
    try {
      eventsCollectionRef.add(newEvent).then();
      addDoc(eventsCollectionRef, newEvent);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <div className={classes.appContainer}>
      <Header
        handleSignUpIsOpen={setSignUpIsOpen(!signUpIsOpen)}
        handleLoginIsOpen={setLoginIsOpen(!loginIsOpen)}
        setLoginIsOpen={setLoginIsOpen}
      />

      {currentUser ? (
        <>
          {showCreateEvent ? (
            <CreateEvent
              onAdd={addEvent}
              closeCreateEvent={() => setShowCreateEvent(false)}
            />
          ) : (
            <div className={classes.buttonContainer}>
              <button
                className={classes.button1}
                onClick={() => {
                  setShowCreateEvent(true);
                }}
              >
                צור ארוע
              </button>
            </div>
          )}
          <Events events={events} />
        </>
      ) : (
        <Home handleSignUpIsOpen={setSignUpIsOpen(!signUpIsOpen)} />
      )}

      {signUpIsOpen && (
        <Signup
          signUpIsOpen={signUpIsOpen}
          handleSignUpIsOpen={setSignUpIsOpen(!signUpIsOpen)}
          handleLoginIsOpen={setLoginIsOpen(!loginIsOpen)}
        />
      )}
      {loginIsOpen && (
        <Login
          loginIsOpen={loginIsOpen}
          handleLoginIsOpen={setLoginIsOpen(!loginIsOpen)}
          handleSignUpIsOpen={setSignUpIsOpen(!signUpIsOpen)}
          handleForgetPasswordIsOpen={setForgetPasswordIsOpen(
            !forgetPasswordIsOpen
          )}
        />
      )}
      {forgetPasswordIsOpen && (
        <ForgetPassword
          handleForgetPasswordIsOpen={setForgetPasswordIsOpen(
            !forgetPasswordIsOpen
          )}
          handleLoginIsOpen={setLoginIsOpen(!loginIsOpen)}
          forgetPasswordIsOpen={forgetPasswordIsOpen}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
