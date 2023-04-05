import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import classes from "./EditEvent.module.css";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const EditEvent = (props) => {
  const [event, setCurrentEvent] = useState({
    date: props.currentEvent.date,
    location: props.currentEvent.location,
    costumerName: props.currentEvent.costumerName,
    balanceHour: props.currentEvent.balanceHour,
    brideChairHour: props.currentEvent.brideChairHour,
    hinumaCoverSong: props.currentEvent.hinumaCoverSong,
    brideBlessSong: props.currentEvent.brideBlessSong,
    isDj: props.currentEvent.isDj,
    dressCode: props.currentEvent.dressCode,
    imEshkachech: props.currentEvent.imEshkachech,
    breakingGlassSong: props.currentEvent.breakingGlassSong,
    givenPrice: props.currentEvent.givenPrice,
    isClosed: props.currentEvent.isClosed,
    managerRemarks: props.currentEvent.managerRemarks,
    id: props.currentEvent.id,
    amountInvited: props.currentEvent.amountInvited,
    receptionMusicHour: props.currentEvent.receptionMusicHour,
    receptionMusicType: props.currentEvent.receptionMusicType,
    chupaHour: props.currentEvent.chupaHour,
    chupaEnteranceSong: props.currentEvent.chupaEnteranceSong,
    brideFriendsCharacter: props.currentEvent.brideFriendsCharacter,
    groomFriendsCharacter: props.currentEvent.groomFriendsCharacter,
    breakingGlassTiming: props.currentEvent.breakingGlassTiming,
    firstDancingRoundDuration: props.currentEvent.firstDancingRoundDuration,
    firstDancingRoundMusicType: props.currentEvent.firstDancingRoundMusicType,
    secondDancingRoundDuration: props.currentEvent.secondDancingRoundDuration,
    secondDancingRoundMusicType: props.currentEvent.secondDancingRoundMusicType,
    contactManName: props.currentEvent.contactManName,
    contactManPhone: props.currentEvent.contactManPhone,
  });
  let isDj;
  if (event.isDj === "yes") isDj = true;
  else isDj = false;

  const [checked, setChecked] = useState(isDj);
  const [shwekiChecked, setShwekiChecked] = useState(false);
  const [karlibachChecked, setKarlibachChecked] = useState(false);
  const [otherChecked, setOtherChecked] = useState(false);
  const [closedChecked, setClosedChecked] = useState(false);
  const [reservedChecked, setReservedChecked] = useState(false);
  useEffect(() => {
    if (event.imEshkachech === "shweki") setShwekiChecked(true);
    if (event.imEshkachech === "karlibach") setKarlibachChecked(true);
    if (event.imEshkachech === "other") setOtherChecked(true);
    if (event.isClosed === "closed") setClosedChecked(true);
    if (event.isClosed === "reserved") setReservedChecked(true);
  }, [event.imEshkachech, event.isClosed]);

  function handleChange(e) {
    const { name, value, type, checked, id } = e.target;
    if (type === "checkbox") {
      setChecked(checked);
    }
    if (id === "shweki") {
      setShwekiChecked(true);
      setKarlibachChecked(false);
    }
    if (id === "karlibach") {
      setKarlibachChecked(true);
      setShwekiChecked(false);
    }
    if (id === "סגור") {
      setClosedChecked(true);
      setReservedChecked(false);
    }
    if (id === "משוריין") {
      setReservedChecked(true);
      setClosedChecked(false);
    }
    if (type === "radio") {
      setCurrentEvent((prevEvent) => {
        return {
          ...prevEvent,
          [name]: id,
        };
      });
    } else {
      setCurrentEvent((prevEvent) => {
        return {
          ...prevEvent,
          [name]: value,
        };
      });
    }
  }

  function submitEvent(e) {
    e.preventDefault();
    const docToUpdate = doc(db, "events", event.id);
    updateDoc(docToUpdate, event).then(() => {
      console.log("data updated");
    });

    props.eventIsEdittedHandler();
    props.onCloseEdit();
  }
  return (
    <Modal
      onClose={props.onCloseEdit}
      open={props.editIsShowen}
      center
      styles={{
        modal: {
          width: "80%",
          borderRadius: "10px",
          boxShadow: "0 1px 5px rgb(138, 137, 137)",
          transitionDuration: "0.4s",
          backgroundColor: "rgb(76, 72, 72)",
          color: "rgb(240, 201, 76)",
          border: "1px rgb(240, 201, 76)",
          // "@media (minWidth: 1000px)": {
          //   maxWidth: "1000px",
          //   width: "80%",
          //   display: "flex",
          //   justifyContent: "space-between",
          // },
          // overflow: "scroll",
        },
      }}
    >
      <div>
        <form className={classes.editEvent}>
          <h2>ערוך ארוע</h2>
          <div className={classes.container}>
            <div className={classes.column1}>
              <div className={classes.wrap}>
                <label htmlFor="date">תאריך:</label>
                <input
                  // min={getCurrentDate()}
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

                <div>
                  <label htmlFor="closed">
                    סגור
                    <input
                      type="radio"
                      id="סגור"
                      name="isClosed"
                      onChange={handleChange}
                      value={closedChecked}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="reserved">
                    משוריין
                    <input
                      type="radio"
                      id="משוריין"
                      name="isClosed"
                      onChange={handleChange}
                      value={reservedChecked}
                    />
                  </label>
                </div>
              </div>
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
                <label htmlFor="hinumaCoverSong">שיר בכיסוי הינומה</label>

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
                <label htmlFor="chupaEnteranceSong">שיר כניסת כלה לחופה:</label>

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
                <label htmlFor="brideFriendsCharacter">סגנון חברות הכלה:</label>
                <input
                  type="text"
                  id="input"
                  name="brideFriendsCharacter"
                  onChange={handleChange}
                  value={event.brideFriendsCharacter}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="groomFriendsCharacter">סגנון חברי החתן:</label>
                <input
                  type="text"
                  id="input"
                  name="groomFriendsCharacter"
                  onChange={handleChange}
                  value={event.groomFriendsCharacter}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="dressCode">קוד לבוש להקה:</label>

                <input
                  type="text"
                  id="input"
                  name="dressCode"
                  onChange={handleChange}
                  value={event.dressCode}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="contactManName">איש קשר:</label>

                <input
                  type="text"
                  id="input"
                  name="contactManName"
                  onChange={handleChange}
                  value={event.contactManName}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="contactManPhone">טלפון של איש קשר</label>

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

                <div>
                  <label htmlFor="shweki">
                    {" "}
                    שוואקי
                    <input
                      type="radio"
                      id="shweki"
                      name="imEshkachech"
                      onChange={handleChange}
                      value={shwekiChecked}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="karlibach">
                    קרליבך
                    <input
                      type="radio"
                      id="karlibach"
                      name="imEshkachech"
                      onChange={handleChange}
                      value={karlibachChecked}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="other">
                    אחר
                    <input
                      type="radio"
                      id="other"
                      name="imEshkachech"
                      onChange={handleChange}
                      value={otherChecked}
                    />
                  </label>
                </div>
              </div>
              <div className={classes.wrap}>
                <label htmlFor="isDj">יש דיג'יי?</label>

                <input
                  id="input"
                  type="checkbox"
                  name="isDj"
                  onChange={handleChange}
                  value={checked ? "no" : "yes"}
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
              <div className={classes.wrap}>
                <label> הערות:</label>
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
          <div className={classes.editButtons}>
            <HighlightOffIcon
              fontSize="large"
              className={classes.x}
              onClick={props.onCloseEdit}
            />
            <button onClick={submitEvent}>שמור שינויים</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditEvent;
