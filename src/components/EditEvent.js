import Modal from "./Modal";
import { useState, useRef, useEffect } from "react";
import Fab from "@mui/material/Fab";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import classes from "./EditEvent.module.css";

//אולי להשתמש ביוז רף במקום יוז סטייט
const EditEvent = (props) => {
  const [event, setCurrentEvent] = useState({
    date: props.currentEvent.date,
    location: props.currentEvent.location,
    costumerName: props.currentEvent.costumerName,
    balanceHour: props.currentEvent.balanceHour,
    hinumaCoverSong: props.currentEvent.hinumaCoverSong,
    brideBlessSong: props.currentEvent.breakinGglassSong,
    isDj: props.currentEvent.isDj,
    dressCode: props.currentEvent.dressCode,
    imEshkachech: props.currentEvent.imEshkachech,
    breakinGglassSong: props.currentEvent.breakinGglassSong,
    remarks: props.currentEvent.remarks,
    id: props.currentEvent.id,
  });
  const [checked, setChecked] = useState(false);
  const [shwekiChecked, setShwekiChecked] = useState(false);
  const [karlibachChecked, setKarlibachChecked] = useState(false);

  const locationRef = useRef(null);
  const namesRef = useRef(null);
  const hinumaRef = useRef(null);
  const brideSongRef = useRef(null);
  const dressRef = useRef(null);
  const breakingRef = useRef(null);
  const remarksRef = useRef(null);
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   // inputRef.current.focus();
  // }, [event]);

  function handleChange(e) {
    // e.preventDefault();
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);

    if (type === "checkbox") setChecked(checked);

    if (value === "shweki") {
      setShwekiChecked(checked);
      setKarlibachChecked(!checked);
    }
    if (value === "karlibach") {
      setKarlibachChecked(checked);
      setShwekiChecked(!checked);
    }

    setCurrentEvent((prevEvent) => {
      return {
        ...prevEvent,
        [name]: value,
      };
    });
  }

  function submitEvent(e) {
    console.log("event has edited!");
    console.log(event);
    fetch(
      "https://toxidos-24688-default-rtdb.firebaseio.com/events/" + event.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: event.date,
          location: event.location,
          costumerName: event.costumerName,
          balanceHour: event.balanceHour,
          hinumaCoverSong: event.hinumaCoverSong,
          brideBlessSong: event.breakinGglassSong,
          isDj: event.isDj,
          dressCode: event.dressCode,
          imEshkachech: event.imEshkachech,
          breakinGglassSong: event.breakinGglassSong,
          remarks: event.remarks,
          id: event.id,
        }),
      }
    ).then((data) => {
      console.log(data);
    });
    // props.onAdd(event);
    // setEvent({
    //   date: "",
    //   location: "",
    //   costumerName: "",
    //   balanceHour: "",
    //   hinumaCoverSong: "",
    //   brideBlessSong: "",
    //   isDj: "",
    //   dressCode: "",
    //   imEshkachech: "",
    //   breakinGglassSong: "",
    //   remarks: "",
    // });
    props.eventIsEdittedHandler();
    props.onCloseEdit();
  }

  return (
    <Modal onClose={props.onCloseEdit}>
      <div>
        <form className={classes.editEvent}>
          <h3>Edit Event</h3>
          <div className={classes.container}>
            <div className={classes.column1}>
              <div className={classes.wrap}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="input"
                  name="date"
                  onChange={handleChange}
                  value={event.date}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="location">Location:</label>
                <input
                  ref={locationRef}
                  type="text"
                  id="input"
                  name="location"
                  onChange={handleChange}
                  value={event.location}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="costumerName">Bride & Groom names:</label>

                <input
                  ref={namesRef}
                  type="text"
                  id="input"
                  name="costumerName"
                  onChange={handleChange}
                  value={event.costumerName}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="balanceHour">Balance hour:</label>

                <input
                  type="time"
                  id="input"
                  name="balanceHour"
                  onChange={handleChange}
                  value={event.balanceHour}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="hinumaCoverSong">Hinuma cover song:</label>

                <input
                  ref={hinumaRef}
                  type="text"
                  id="input"
                  name="hinumaCoverSong"
                  onChange={handleChange}
                  value={event.hinumaCoverSong}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="brideBlessSong">Bride bless song:</label>

                <input
                  ref={brideSongRef}
                  type="text"
                  id="input"
                  name="brideBlessSong"
                  onChange={handleChange}
                  value={event.brideBlessSong}
                />
              </div>
            </div>
            <div className={classes.column2}>
              <div className={classes.wrap}>
                <label htmlFor="isDj">there is Dj?</label>

                <input
                  id="input"
                  type="checkbox"
                  checked={checked}
                  name="isDj"
                  onChange={handleChange}
                  // value={isDjChecked ? "yes" : "no"}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="dressCode">Dress code:</label>

                <input
                  ref={dressRef}
                  type="text"
                  id="input"
                  name="dressCode"
                  onChange={handleChange}
                  value={event.dressCode}
                />
              </div>
              <div className={classes.wrap}>
                <label>Im Eshkachech:</label>

                <div>
                  <label htmlFor="shweki">
                    {" "}
                    Shweki
                    <input
                      checked={shwekiChecked}
                      type="radio"
                      id="shweki"
                      name="radio"
                      value="shweki"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="karlibach">
                    {" "}
                    Karlibach
                    <input
                      checked={karlibachChecked}
                      type="radio"
                      id="karlibach"
                      name="radio"
                      value="karlibach"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className={classes.wrap}>
                <label>Breaking glass song:</label>
                <input
                  ref={breakingRef}
                  id="input"
                  name="breakinGglassSong"
                  onChange={handleChange}
                  value={event.breakinGglassSong}
                />
              </div>
              <div className={classes.wrap}>
                <label> Any remarks</label>
                <input
                  ref={remarksRef}
                  id="input"
                  name="remarks"
                  onChange={handleChange}
                  value={event.remarks}
                />
              </div>
            </div>
          </div>

          <div>
            <Fab onClick={submitEvent}>save changes</Fab>
            <HighlightOffIcon
              className={classes.x}
              onClick={props.onCloseEdit}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditEvent;
