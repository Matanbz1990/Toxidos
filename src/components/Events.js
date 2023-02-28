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
  const [eventYear, setEventYear] = useState("2023");
  const [eventDisplayed, setEventsDisplayed] = useState("2023");
  const { currentUser } = useAuth();
  const months = [];
  const eventsCollectionRef = collection(db, "events");
  const q = query(eventsCollectionRef, where("userId", "==", currentUser.uid));

  useEffect(() => {
    let array = [];
    let arrOfID = [];
    const getData = async () => {
      console.log(currentUser.uid);
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        arrOfID.push(doc.id);
        array.push(doc.data());
      });

      for (let i = 0; i < arrOfID.length; i++) {
        array[i].id = arrOfID[i];
      }
      setEvents(array);
    };
    getData();
  }, [props.eventAdded, eventRemoved, eventHasEditted, currentUser]);

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
      {eventDisplayed && <h2>there is no events this year yet</h2>}
      {showEvents &&
        months.map((currentMonth, index) => {
          if (currentMonth !== undefined)
            return (
              <Month
                monthItem={currentMonth}
                index={index}
                deleteHandler={deleteEvent}
                key={randomStr()}
                isAuthenticated={props.isAuthenticated}
                closeTheCreateEvent={props.closeTheCreateEvent}
                eventIsEdittedHandler={eventIsEdittedHandler}
              />
            );
          else return 1;
        })}
      ;
    </div>
  );
};
export default Events;
