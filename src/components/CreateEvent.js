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
  const [isDetailsShowen, setIsDetailsShowen] = useState(false);
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
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      if (name === "isDj") setIsDjChecked(!isDjChecked);
    }

    setEvent((prevEvent) => {
      return {
        ...prevEvent,
        [name]: value,
      };
    });
    // }
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
        <h2>צור ארוע</h2>
        <div className={classes.container}>
          <div className={classes.column1}>
            <div className={classes.wrap}>
              <label htmlFor="date">תאריך:</label>
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
              <label htmlFor="location">מיקום:</label>
              <input
                type="text"
                id="input"
                name="location"
                onChange={handleChange}
                value={event.location}
              />
            </div>
            <div className={classes.wrap}>
              <label htmlFor="costumerName">שמות החתן והכלה:</label>

              <input
                type="text"
                id="input"
                name="costumerName"
                onChange={handleChange}
                value={event.costumerName}
              />
            </div>

            <div className={classes.wrap}>
              <label> הארוע סגור/משוריין:</label>
              <div className={classes.radioDiv}>
                <div className={classes.radioInput}>
                  <label htmlFor="closed">סגור</label>
                  <input
                    type="radio"
                    id="closed"
                    name="isClosed"
                    value="סגור"
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.radioInput}>
                  <label htmlFor="reserved">משוריין</label>
                  <input
                    type="radio"
                    id="reserved"
                    name="isClosed"
                    value="משוריין"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.wrap}>
              <label> הערות:</label>
              <textarea
                name="managerRemarks"
                cols="40"
                rows="3"
                onChange={handleChange}
                value={event.managerRemarks}
              ></textarea>
            </div>
            {!isDetailsShowen && (
              <div className={classes.showButtonDiv}>
                <button
                  className={classes.showButton}
                  onClick={() => {
                    setIsDetailsShowen(!isDetailsShowen);
                  }}
                >
                  לפרטים נוספים
                </button>
              </div>
            )}
            {isDetailsShowen && (
              <div>
                <div className={classes.wrap}>
                  <label htmlFor="amountInvited">מס' מוזמנים:</label>

                  <input
                    type="number"
                    id="input"
                    name="amountInvited"
                    onChange={handleChange}
                    value={event.amountInvited}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="balanceHour">שעת הבאלאנס:</label>

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
                    שעת מוזיקה בקבלת פנים:
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
                  <label htmlFor="receptionMusicType">
                    סגנון המוזיקה בקבלת פנים:
                  </label>

                  <input
                    type="text"
                    id="input"
                    name="receptionMusicType"
                    onChange={handleChange}
                    value={event.receptionMusicType}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="brideChairHour">שעת כסא כלה:</label>

                  <input
                    type="time"
                    id="input"
                    name="brideChairHour"
                    onChange={handleChange}
                    value={event.brideChairHour}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="chupaHour">שעת החופה:</label>

                  <input
                    type="time"
                    id="input"
                    name="chupaHour"
                    onChange={handleChange}
                    value={event.chupaHour}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="hinumaCoverSong">שיר בכיסוי הינומה:</label>

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
                    משך זמן סבב ריקודים ראשון (דקות):
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
                    סגנון המוזיקה בסבב ריקודים ראשון:
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
                    משך זמן סבב ריקודים שני (דקות):
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
                    סגנון המוזיקה בסבב ריקודים שני:
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
            )}
          </div>

          {isDetailsShowen && (
            <div>
              <div className={classes.column2}>
                <div className={classes.wrap}>
                  <label htmlFor="brideBlessSong">שיר ברכת כלה:</label>

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
                    שיר כניסת כלה לחופה:
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
                    תזמון שבירת הכוס (אמצע/סוף אם אשכחך)
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
                  <label htmlFor="breakingGlassSong">:שיר שבירת הכוס</label>
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
                    סגנון חברות הכלה:
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
                    סגנון חברי החתן:
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
                  <label htmlFor="dressCode">קוד לבוש ללהקה:</label>

                  <input
                    type="text"
                    id="input"
                    name="dressCode"
                    onChange={handleChange}
                    value={event.dressCode}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="contactManName">איש הקשר:</label>

                  <input
                    type="text"
                    id="input"
                    name="contactManName"
                    onChange={handleChange}
                    value={event.contactManName}
                  />
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="contactManPhone">
                    מס' טלפון של איש הקשר:
                  </label>

                  <input
                    type="number"
                    id="input"
                    name="contactManPhone"
                    onChange={handleChange}
                    value={event.contactManPhone}
                  />
                </div>

                <div className={classes.wrap}>
                  <label> אם אשכחך:</label>
                  <div className={classes.radioDiv}>
                    <div className={classes.radioInput}>
                      <label htmlFor="shweki"> שוואקי</label>
                      <input
                        type="radio"
                        id="shweki"
                        name="imEshkachech"
                        value="shweki"
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.radioInput}>
                      <label htmlFor="karlibach"> קרליבך</label>
                      <input
                        type="radio"
                        id="karlibach"
                        name="imEshkachech"
                        value="karlibach"
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.radioInput}>
                      <label htmlFor="other"> אחר</label>
                      <input
                        type="radio"
                        id="other"
                        name="imEshkachech"
                        value="other"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={classes.wrap}>
                  <label htmlFor="isDj">יש די ג'יי?</label>

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
                  <label>מחיר בשקלים:</label>
                  <input
                    type="number"
                    id="input"
                    name="givenPrice"
                    onChange={handleChange}
                    value={event.givenPrice}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={classes.createEventsButtons}>
          <div>
            <HighlightOffIcon
              fontSize="large"
              className={classes.x}
              onClick={props.closeCreateEvent}
            ></HighlightOffIcon>
          </div>
          {isDetailsShowen && (
            <button
              className={classes.showButton}
              onClick={() => {
                setIsDetailsShowen(!isDetailsShowen);
              }}
            >
              סגור
            </button>
          )}
          <button
            // fontSize="large"
            className={classes.showButton}
            disabled={!isSubmitAllowed}
            onClick={submitEvent}
          >
            <strong>הוסף ארוע</strong>
          </button>
        </div>
      </form>
    </div>
    // </Modal>
  );
}

export default React.memo(CreateEvent);
