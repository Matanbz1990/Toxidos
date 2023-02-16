import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import classes from "./CreateEvent.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function CreateEvent(props) {
  const [event, setEvent] = useState({
    date: "",
    location: "",
    costumerName: "",
    balanceHour: "",
    hinumaCoverSong: "",
    brideBlessSong: "",
    isDj: "",
    dressCode: "",
    imEshkachech: "",
    breakinGglassSong: "",
    givenPrice: "",
    remarks: "",
  });
  const [isDjChecked, setIsDjChecked] = useState(true);
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
  useEffect(() => {
    if (event.date.length !== 0) setIsSubmitAllowed(true);
    else setIsSubmitAllowed(false);
  }, [event]);

  function handleChange(e) {
    const { name, value, type, id } = e.target;
    // console.log(name, value, type);
    if (type === "checkbox") {
      if (name === "isDj") setIsDjChecked(!isDjChecked);
    }
    if (type === "radio") {
      setEvent((prevEvent) => {
        return {
          ...prevEvent,
          [name]: id,
        };
      });
    } else {
      setEvent((prevEvent) => {
        return {
          ...prevEvent,
          [name]: value,
        };
      });
    }
  }

  function submitEvent(e) {
    props.onAdd(event);
    setEvent({
      date: "",
      location: "",
      costumerName: "",
      balanceHour: "",
      hinumaCoverSong: "",
      brideBlessSong: "",
      isDj: "",
      dressCode: "",
      imEshkachech: "",
      breakinGglassSong: "",
      givenPrice: "",
      remarks: "",
    });
    props.closeCreateEvent();
    e.preventDefault();
  }

  return (
    <div>
      <form className={classes.createEvent}>
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
                name="isDj"
                onChange={handleChange}
                value={isDjChecked ? "yes" : "no"}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="dressCode">Dress code:</label>

              <input
                type="text"
                id="input"
                name="dressCode"
                onChange={handleChange}
                value={event.dressCode}
              />
            </div>
            <div className={classes.wrap}>
              <label> Im Eshkachech:</label>

              <div>
                <label htmlFor="shweki">
                  {" "}
                  Shweki
                  <input
                    type="radio"
                    id="shweki"
                    name="imEshkachech"
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
                    type="radio"
                    id="karlibach"
                    name="imEshkachech"
                    value="karlibach"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className={classes.wrap}>
              <label>Breaking glass song:</label>
              <input
                type="text"
                id="input"
                name="breakinGglassSong"
                onChange={handleChange}
                value={event.breakinGglassSong}
              />
            </div>
            <div className={classes.wrap}>
              <label>Given Price:</label>
              <input
                type="number"
                id="input"
                name="givenPrice"
                onChange={handleChange}
                value={event.givenPrice}
              />
            </div>
            <div className={classes.wrap}>
              <label> Any remarks</label>
              <input
                type="text"
                id="input"
                name="remarks"
                onChange={handleChange}
                value={event.remarks}
              />
            </div>
          </div>
        </div>

        {
          <div>
            <Fab
              onClick={submitEvent}
              disabled={!isSubmitAllowed}
              sx={{
                border: "3px solid orange",
                ":hover": {
                  background: "rgb(127, 182, 127)",
                },
              }}
            >
              <AddIcon />
            </Fab>
            <HighlightOffIcon
              className={classes.x}
              onClick={props.closeCreateEvent}
            />
          </div>
        }
      </form>
    </div>
  );
}

export default CreateEvent;
