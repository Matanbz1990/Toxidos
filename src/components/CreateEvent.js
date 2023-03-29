import React, { useState, useEffect } from "react";
// import AddIcon from "@mui/icons-material/Add";

import classes from "./CreateEvent.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAuth } from "../contexts/AuthContext";
function CreateEvent(props) {
  const { currentUser } = useAuth();

  const [event, setEvent] = useState({
    date: "",
    location: "",
    costumerName: "",
    amountInvited: "",
    receptionMusicHour: "",
    receptionMusicType: "",
    balanceHour: "",
    brideChairHour: "",
    chupaHour: "",
    hinumaCoverSong: "",
    brideBlessSong: "",
    chupaEnteranceSong: "",
    brideFriendsCharacter: "",
    groomFriendsCharacter: "",
    isDj: "no",
    isClosed: "",
    dressCode: "",
    imEshkachech: "",
    breakingGlassTiming: "",
    breakingGlassSong: "",
    firstDancingRoundDuration: "",
    firstDancingRoundMusicType: "",
    secondDancingRoundDuration: "",
    secondDancingRoundMusicType: "",
    contactManName: "",
    contactManPhone: "",
    givenPrice: "",
    managerRemarks: "",
    band: "",
    userId: currentUser.uid,
  });

  const [isDjChecked, setIsDjChecked] = useState(true);
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    if (event.date.length !== 0) setIsSubmitAllowed(true);
    else setIsSubmitAllowed(false);
  }, [event]);

  function handleChange(e) {
    const { name, value, type, id } = e.target;
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
      amountInvited: "",
      receptionMusicHour: "",
      receptionMusicType: "",
      balanceHour: "",
      brideChairHour: "",
      chupaHour: "",
      hinumaCoverSong: "",
      brideBlessSong: "",
      chupaEnteranceSong: "",
      brideFriendsCharacter: "",
      groomFriendsCharacter: "",
      isDj: "no",
      isClosed: "",
      dressCode: "",
      imEshkachech: "",
      breakingGlassTiming: "",
      breakingGlassSong: "",
      firstDancingRoundDuration: "",
      firstDancingRoundMusicType: "",
      secondDancingRoundDuration: "",
      secondDancingRoundMusicType: "",
      contactManName: "",
      contactManPhone: "",
      givenPrice: "",
      managerRemarks: "",
    });
    props.closeCreateEvent();
    e.preventDefault();
  }
  // onClick={props.closeCreateEvent}
  return (
    // <Modal
    //   open={props.openTheCreateEvent}
    //   onClose={props.closeCreateEvent}
    //   className={classes.createmodal}
    // >
    <div>
      <form className={classes.createEvent}>
        <h2>create event</h2>
        <div className={classes.container}>
          <div className={classes.column1}>
            <div className={classes.wrap}>
              <label htmlFor="date">Date:</label>
              <input
                min={getCurrentDate()}
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
              <label htmlFor="amountInvited">Amount Invited:</label>

              <input
                type="number"
                id="input"
                name="amountInvited"
                onChange={handleChange}
                value={event.amountInvited}
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
              <label htmlFor="receptionMusicHour">
                Reception Music start hour:
              </label>

              <input
                type="time"
                id="input"
                name="receptionMusicHour"
                onChange={handleChange}
                value={event.receptionMusicHour}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="receptionMusicType">Reception music type:</label>

              <input
                type="text"
                id="input"
                name="receptionMusicType"
                onChange={handleChange}
                value={event.receptionMusicType}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="brideChairHour">Bride chair hour:</label>

              <input
                type="time"
                id="input"
                name="brideChairHour"
                onChange={handleChange}
                value={event.brideChairHour}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="chupaHour">Chupa Hour:</label>

              <input
                type="time"
                id="input"
                name="chupaHour"
                onChange={handleChange}
                value={event.chupaHour}
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
              <label htmlFor="firstDancingRoundDuration">
                First dancing round duration(minutes):
              </label>

              <input
                type="number"
                id="input"
                name="firstDancingRoundDuration"
                onChange={handleChange}
                value={event.firstDancingRoundDuration}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="firstDancingRoundMusicType">
                First dancing round music type:
              </label>

              <input
                type="text"
                id="input"
                name="firstDancingRoundMusicType"
                onChange={handleChange}
                value={event.firstDancingRoundMusicType}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="secondDancingRoundDuration">
                Second dancing round duration(minutes):
              </label>

              <input
                type="number"
                id="input"
                name="secondDancingRoundDuration"
                onChange={handleChange}
                value={event.secondDancingRoundDuration}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="secondDancingRoundMusicType">
                Second dancing round music type:
              </label>

              <input
                type="text"
                id="input"
                name="secondDancingRoundMusicType"
                onChange={handleChange}
                value={event.secondDancingRoundMusicType}
              />
            </div>
          </div>

          <div className={classes.column2}>
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
            <div className={classes.wrap}>
              <label htmlFor="chupaEnteranceSong">
                Chupa Bride enterance song:
              </label>

              <input
                type="text"
                id="input"
                name="chupaEnteranceSong"
                onChange={handleChange}
                value={event.chupaEnteranceSong}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="breakingGlassTiming">
                Breaking glass timing:
              </label>

              <input
                type="text"
                id="input"
                name="breakingGlassTiming"
                onChange={handleChange}
                value={event.breakingGlassTiming}
              />
            </div>

            <div className={classes.wrap}>
              <label htmlFor="breakingGlassSong">Breaking glass song:</label>
              <input
                type="text"
                id="input"
                name="breakingGlassSong"
                onChange={handleChange}
                value={event.breakingGlassSong}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="brideFriendsCharacter">
                Bride friends character:
              </label>
              <input
                type="text"
                id="input"
                name="brideFriendsCharacter"
                onChange={handleChange}
                value={event.brideFriendsCharacter}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="groomFriendsCharacter">
                Groom friends character:
              </label>
              <input
                type="text"
                id="input"
                name="groomFriendsCharacter"
                onChange={handleChange}
                value={event.groomFriendsCharacter}
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
              <label htmlFor="contactManName">Contact man name:</label>

              <input
                type="text"
                id="input"
                name="contactManName"
                onChange={handleChange}
                value={event.contactManName}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="contactManPhone">Contact man phone number:</label>

              <input
                type="number"
                id="input"
                name="contactManPhone"
                onChange={handleChange}
                value={event.contactManPhone}
              />
            </div>

            <div className={classes.wrap}>
              <label> the event is closed?:</label>
              <div className={classes.radioDiv}>
                <div className={classes.radioInput}>
                  <label htmlFor="closed">closed</label>
                  <input
                    type="radio"
                    id="closed"
                    name="isClosed"
                    value="closed"
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.radioInput}>
                  <label htmlFor="reserved">reserved</label>
                  <input
                    type="radio"
                    id="reserved"
                    name="isClosed"
                    value="reserved"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.wrap}>
              <label> Im Eshkachech:</label>
              <div className={classes.radioDiv}>
                <div className={classes.radioInput}>
                  <label htmlFor="shweki"> Shweki</label>
                  <input
                    type="radio"
                    id="shweki"
                    name="imEshkachech"
                    value="shweki"
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.radioInput}>
                  <label htmlFor="karlibach"> Karlibach</label>
                  <input
                    type="radio"
                    id="karlibach"
                    name="imEshkachech"
                    value="karlibach"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.wrap}>
              <label htmlFor="isDj">there is Dj?</label>

              <input
                className={classes.isDj}
                id="input"
                type="checkbox"
                name="isDj"
                onChange={handleChange}
                value={isDjChecked ? "yes" : "no"}
              />
            </div>
            <div className={classes.wrap}>
              <label>Price in Shekels:</label>
              <input
                type="number"
                id="input"
                name="givenPrice"
                onChange={handleChange}
                value={event.givenPrice}
              />
            </div>
            <div className={classes.wrap}>
              <label> Manager remarks :</label>
              <textarea
                name="managerRemarks"
                cols="40"
                rows="2"
                onChange={handleChange}
                value={event.managerRemarks}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={classes.createEventsButtons}>
          <div>
            <HighlightOffIcon
              fontSize="large"
              className={classes.x}
              onClick={props.closeCreateEvent}
            ></HighlightOffIcon>
          </div>
          <button
            fontSize="large"
            disabled={!isSubmitAllowed}
            className={classes.addButton}
            onClick={submitEvent}
          >
            <strong>Add</strong>
          </button>
        </div>
      </form>
    </div>
    // </Modal>
  );
}

export default CreateEvent;
