import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import classes from "./EditEvent.module.css";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

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
  const [closedChecked, setClosedChecked] = useState(false);
  const [reservedChecked, setReservedChecked] = useState(false);
  useEffect(() => {
    if (event.imEshkachech === "shweki") setShwekiChecked(true);
    if (event.imEshkachech === "karlibach") setKarlibachChecked(true);
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
    if (id === "closed") {
      setClosedChecked(true);
      setReservedChecked(false);
    }
    if (id === "reserved") {
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
      className={classes.modal}
    >
      <div>
        <form className={classes.editEvent}>
          <h2>Edit Event</h2>
          <div className={classes.container}>
            <div className={classes.column1}>
              <div className={classes.wrap}>
                <label htmlFor="date">Date:</label>
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
                <label htmlFor="receptionMusicType">
                  Reception music type:
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
                <label htmlFor="contactManPhone">
                  Contact man phone number:
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
                <label> the event is closed?:</label>

                <div>
                  <label htmlFor="closed">
                    closed
                    <input
                      type="radio"
                      id="closed"
                      name="isClosed"
                      onChange={handleChange}
                      value={closedChecked}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="reserved">
                    reserved
                    <input
                      type="radio"
                      id="reserved"
                      name="isClosed"
                      onChange={handleChange}
                      value={reservedChecked}
                    />
                  </label>
                </div>
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
                      onChange={handleChange}
                      value={shwekiChecked}
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
                      onChange={handleChange}
                      value={karlibachChecked}
                    />
                  </label>
                </div>
              </div>
              <div className={classes.wrap}>
                <label htmlFor="isDj">there is Dj?</label>

                <input
                  id="input"
                  type="checkbox"
                  name="isDj"
                  onChange={handleChange}
                  value={checked ? "no" : "yes"}
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
          <div className={classes.editButtons}>
            <HighlightOffIcon
              className={classes.x}
              onClick={props.onCloseEdit}
            />
            <button onClick={submitEvent}>save changes</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditEvent;
