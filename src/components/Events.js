import { useState, useEffect } from "react";
import Month from "./Month";
import EventFilter from "./EventFilter";
import classes from "./Events.module.css";
import { useAuth } from "../contexts/AuthContext";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [eventRemoved, setEventRemoved] = useState(false);
  const [eventHasEditted, setEventHasEditted] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  // const today = new Date();
  const [eventYear, setEventYear] = useState("2023");
  const [eventDisplayed, setEventsDisplayed] = useState("2023");
  const eventsCollectionRef = collection(db, "events");
  const { currentUser } = useAuth();

  const [q, setQ] = useState(
    query(eventsCollectionRef, where("userId", "==", currentUser.uid))
  );
  // const q = query(eventsCollectionRef, where("userId", "==", currentUser.uid));

  const months = [];
  const emptyMessage = "No matching documents.";

  useEffect(() => {
    const getData = async () => {
      let array = [];
      let arrOfID = [];
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(emptyMessage);
        setQ(""); //just becouse i have to use q as a state!
        return;
      }
      querySnapshot.forEach((doc) => {
        arrOfID.push(doc.id);
        array.push(doc.data());
      });

      for (let i = 0; i < arrOfID.length; i++) {
        array[i].id = arrOfID[i];
      }
      setEvents(array);
    };
    getData();
  }, [q, eventHasEditted]);

  const filteredYearArrayEvent = events.filter((event) => {
    return event.date.slice(0, 4) === eventYear;
  });
  useEffect(() => {
    if (filteredYearArrayEvent.length === 0) setEventsDisplayed(true);
    else setEventsDisplayed(false);
  }, [setEventsDisplayed, eventYear, events, filteredYearArrayEvent]);

  //recieved chosen year from EventFilter component
  const selectedEventYear = (year) => {
    setEventYear(year);
  };

  filteredYearArrayEvent.map((eventItem) => {
    let eventMonth = eventItem.date.slice(5).slice(0, 2);
    eventMonth = +eventMonth - 1;
    if (months[eventMonth] === undefined) {
      months[eventMonth] = [];
      months[eventMonth].push(eventItem);
    } else months[eventMonth].push(eventItem);
    return months;
  });

  const eventIsEdittedHandler = () => {
    setEventHasEditted(true);
    setTimeout(() => {
      setEventHasEditted(false);
    }, 3000);
  };

  async function deleteEvent(id) {
    const docToUpdate = doc(db, "events", id);

    await deleteDoc(docToUpdate).then(() => {
      if (events.length <= 1) {
        setShowEvents(true);
      }
      setEventRemoved(true);
      setTimeout(() => {
        setEventRemoved(false);
      }, 2000);
      if (events.length <= 1) {
        setShowEvents(false);
      }
    });
  }
  function randomStr() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className={classes.messages}>
      <div>
        {props.eventAdded && <h2>Event Added!</h2>}
        {eventRemoved && <h2>Event Removed!</h2>}
        {eventHasEditted && <h2>Event has edited!</h2>}
      </div>
      <EventFilter selectedYearData={selectedEventYear} />
      {eventDisplayed && (
        <div>
          <h2>there is no events this year yet</h2>
          {/* <h2>{emptyMessage}</h2> */}
        </div>
      )}
      {showEvents &&
        months.map((currentMonth, index) => {
          if (currentMonth !== undefined)
            return (
              <div key={randomStr()}>
                <Month
                  monthItem={currentMonth}
                  index={index}
                  deleteHandler={deleteEvent}
                  closeTheCreateEvent={props.closeTheCreateEvent}
                  eventIsEdittedHandler={eventIsEdittedHandler}
                />
              </div>
            );
          else return 1;
        })}
      ;
    </div>
  );
};
export default Events;
