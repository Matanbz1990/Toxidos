import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import classes from "./EditEvent.module.css";

const EditEvent = (props) => {
  const [event, setCurrentEvent] = useState({
    date: props.currentEvent.date,
    location: props.currentEvent.location,
    costumerName: props.currentEvent.costumerName,
    balanceHour: props.currentEvent.balanceHour,
    brideChairHour: props.currentEvent.brideChairHour,
    hinumaCoverSong: props.currentEvent.hinumaCoverSong,
    brideBlessSong: props.currentEvent.breakinGglassSong,
    isDj: props.currentEvent.isDj,
    dressCode: props.currentEvent.dressCode,
    imEshkachech: props.currentEvent.imEshkachech,
    breakinGglassSong: props.currentEvent.breakinGglassSong,
    givenPrice: props.currentEvent.givenPrice,
    remarks: props.currentEvent.remarks,
    managerRemarks: props.currentEvent.managerRemarks,
    id: props.currentEvent.id,
  });

  let isDj;
  if (event.isDj === "yes") isDj = true;
  else isDj = false;

  const [checked, setChecked] = useState(isDj);
  const [shwekiChecked, setShwekiChecked] = useState(false);
  const [karlibachChecked, setKarlibachChecked] = useState(false);
  useEffect(() => {
    if (event.imEshkachech === "shweki") setShwekiChecked(true);
    if (event.imEshkachech === "karlibach") setKarlibachChecked(true);
  }, [event.imEshkachech]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setChecked(checked);
    }
    if (value === "shweki") {
      setShwekiChecked(true);
      setKarlibachChecked(false);
    }
    if (value === "karlibach") {
      setKarlibachChecked(true);
      setShwekiChecked(false);
    }

    setCurrentEvent((prevEvent) => {
      return {
        ...prevEvent,
        [name]: value,
      };
    });
  }

  function submitEvent(e) {
    fetch(
      "https://toxidos-24688-default-rtdb.firebaseio.com/events/" +
        event.id +
        ".json",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: event,
        }),
      }
    );

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
          <h3>Edit Event</h3>
          <div className={classes.container}>
            <div className={classes.column1}>
              <div className={classes.wrap}>
                <label htmlFor="date">Date:</label>

                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={event.date}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  name="location"
                  onChange={handleChange}
                  value={event.location}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="costumerName">Bride & Groom names:</label>

                <input
                  type="text"
                  name="costumerName"
                  onChange={handleChange}
                  value={event.costumerName}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="balanceHour">Balance hour:</label>

                <input
                  type="time"
                  name="balanceHour"
                  onChange={handleChange}
                  value={event.balanceHour}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="brideChairHour">Bride chair hour:</label>

                <input
                  type="time"
                  name="brideChairHour"
                  onChange={handleChange}
                  value={event.brideChairHour}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="hinumaCoverSong">Hinuma cover song:</label>

                <input
                  type="text"
                  name="hinumaCoverSong"
                  onChange={handleChange}
                  value={event.hinumaCoverSong}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="brideBlessSong">Bride bless song:</label>

                <input
                  type="text"
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
                  type="checkbox"
                  checked={checked}
                  name="isDj"
                  onChange={handleChange}
                  value={checked ? "no" : "yes"}
                />
              </div>
              <div className={classes.wrap}>
                <label htmlFor="dressCode">Dress code:</label>

                <input
                  type="text"
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
                      checked={karlibachChecked}
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
                  name="breakinGglassSong"
                  onChange={handleChange}
                  value={event.breakinGglassSong}
                />
              </div>

              <div className={classes.wrap}>
                <label> Any remarks:</label>
                <textarea
                  name="remarks"
                  onChange={handleChange}
                  value={event.remarks}
                />
              </div>
              <div className={classes.wrap}>
                <label>Price in Shekels:</label>
                <input
                  name="givenPrice"
                  onChange={handleChange}
                  value={event.givenPrice}
                />
              </div>
              <div className={classes.wrap}>
                <label> Manager remarks:</label>
                <textarea
                  name="managerRemarks"
                  onChange={handleChange}
                  value={event.managerRemarks}
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
