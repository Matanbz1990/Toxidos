import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./Event.module.css";
import { useState, useEffect } from "react";
import EditEvent from "./EditEvent";
import ShareIcon from "@mui/icons-material/Share";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Event(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsShowen, setEditIsShowen] = useState(false);
  const [isTheDatePass, setIsTheDatePass] = useState(false);
  const onCloseEditEvent = () => {
    setEditIsShowen(false);
  };

  const shareData = () => {};

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const day = props.date.slice(8, 10);
  const month = props.date.slice(5, 7);
  const year = props.date.slice(0, 4);
  const israeliDate = day + "." + month + "." + year;

  useEffect(() => {
    if (yyyy > +year) setIsTheDatePass(true);
    if (yyyy < +year) setIsTheDatePass(false);
    if (yyyy === +year) {
      if (+mm > +month) setIsTheDatePass(true);
      if (+mm < +month) setIsTheDatePass(false);
      if (+mm === +month) {
        if (+dd > +day) setIsTheDatePass(true);
        if (+dd <= +day) setIsTheDatePass(false);
      }
    }
  }, [isTheDatePass, yyyy, mm, dd, year, month, day]);

  const dateHasPassedClasses = `${isTheDatePass ? classes.dateIsPass : ""}`;
  const prevContainerClasses = `${classes.prevContainer} ${
    !isTheDatePass && props.isClosed === "משוריין" ? classes.reserved : ""
  }`;
  // const arrOfLabels1 = [
  //   "Date:",
  //   "Location:",
  //   "Bride & Groom names:",
  //   "Is event close?",
  //   "Amount invited:",
  //   "Reception music hour:",
  //   "Reception music type:",
  //   "Chupa hour:",
  //   "Bride enterance song to chupa:",
  //   "Bride friends character:",
  //   "Groom friends character:",
  //   "Balance hour:",
  //   "Bride chair hour:",
  //   "Hinuma cover song:",
  //   "Bride chair hour:",
  //   "Bride bless song:",
  // ];
  // const arrOfLabels2 = [
  //   "there is Dj?",
  //   "Dress code:",
  //   "Im Eshkachech:",
  //   "Breaking Glass timing:",
  //   "First dancing round duration:",
  //   "First dancing round MusicType:",
  //   "Second dancing round duration:",
  //   "Seconddancing round MusicType:",
  //   "Contact man name:",
  //   "Contact man phone:",
  //   "Breaking glass song:",
  //   "Price in Shekels:",
  //   " Manager remarks:",
  // ];

  return (
    <div className={classes.event}>
      {editIsShowen && (
        <EditEvent
          currentEvent={props}
          onCloseEdit={onCloseEditEvent}
          eventIsEdittedHandler={props.eventIsEdittedHandler}
          editIsShowen={editIsShowen}
        />
      )}
      {!isOpen && (
        <div className={dateHasPassedClasses}>
          <div
            className={prevContainerClasses}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <h3>{israeliDate}</h3>
            <h3>{props.location}</h3>
            <h3>{props.isClosed}</h3>
            <button
              className={classes.button1}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              פתח
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(!isOpen);
          }}
          center
          styles={{
            modal: {
              width: "70%",
              borderRadius: "10px",
              boxShadow: "0 1px 5px rgb(138, 137, 137)",
              transitionDuration: "0.4s",
              backgroundColor: "rgb(43, 41, 41)",
              color: "rgb(240, 201, 76)",
              border: "1px rgb(240, 201, 76)",
            },
          }}
          // className={classes.eventmodal}
        >
          <div className={classes.eventmodalH3}>
            <h3>
              <strong>פרטי הארוע</strong>
            </h3>
          </div>
          <div className={classes.eventContainer}>
            <div className={classes.column1}>
              {israeliDate && (
                <div className={classes.Ewrap}>
                  <label>תאריך:</label>
                  <p>
                    <strong>{israeliDate}</strong>
                  </p>
                </div>
              )}
              {props.location && (
                <div className={classes.Ewrap}>
                  <label>מיקום:</label>
                  <p>
                    <strong>{props.location}</strong>
                  </p>
                </div>
              )}
              {props.costumerName && (
                <div className={classes.Ewrap}>
                  <label>שמות החתן והכלה:</label>
                  <p>
                    <strong>{props.costumerName}</strong>
                  </p>
                </div>
              )}
              {props.isClosed && (
                <div className={classes.Ewrap}>
                  <label>הארוע סגור/משוריין</label>
                  <p>
                    <strong>{props.isClosed}</strong>
                  </p>
                </div>
              )}
              {props.amountInvited && (
                <div className={classes.Ewrap}>
                  <label>מס' המוזמנים:</label>
                  <p>
                    <strong>{props.amountInvited}</strong>
                  </p>
                </div>
              )}
              {props.receptionMusicHour && (
                <div className={classes.Ewrap}>
                  <label>שעת מוזיקה בקבלת פנים:</label>
                  <p>
                    <strong>{props.receptionMusicHour}</strong>
                  </p>
                </div>
              )}
              {props.receptionMusicType && (
                <div className={classes.Ewrap}>
                  <label>סגנון מוזיקה בקבלת פנים:</label>
                  <p>
                    <strong>{props.receptionMusicType}</strong>
                  </p>
                </div>
              )}
              {props.chupaHour && (
                <div className={classes.Ewrap}>
                  <label>שעת החופה:</label>
                  <p>
                    <strong>{props.chupaHour}</strong>
                  </p>
                </div>
              )}
              {props.chupaEnteranceSong && (
                <div className={classes.Ewrap}>
                  <label> שיר כניסת כלה לחופה:</label>
                  <p>
                    <strong>{props.chupaEnteranceSong}</strong>
                  </p>
                </div>
              )}
              {props.brideFriendsCharacter && (
                <div className={classes.Ewrap}>
                  <label> סגנון חברות הכלה:</label>
                  <p>
                    <strong>{props.brideFriendsCharacter}</strong>
                  </p>
                </div>
              )}
              {props.groomFriendsCharacter && (
                <div className={classes.Ewrap}>
                  <label> סגנון חברי החתן:</label>
                  <p>
                    <strong>{props.groomFriendsCharacter}</strong>
                  </p>
                </div>
              )}
              {props.balanceHour && (
                <div className={classes.Ewrap}>
                  <label>שעת הבאלאנס:</label>
                  <p>
                    <strong>{props.balanceHour}</strong>
                  </p>
                </div>
              )}
              {props.brideChairHour && (
                <div className={classes.Ewrap}>
                  <label>שעת כסא כלה:</label>
                  <p>
                    <strong>{props.brideChairHour}</strong>
                  </p>
                </div>
              )}{" "}
              {props.brideBlessSong && (
                <div className={classes.Ewrap}>
                  <label>:שיר ברכת כלה</label>
                  <p>
                    <strong>{props.brideBlessSong}</strong>
                  </p>
                </div>
              )}
            </div>
            <div className={classes.column2}>
              {props.isDj && (
                <div className={classes.Ewrap}>
                  <label>יש דיג'יי?</label>
                  <p>
                    <strong>{props.isDj}</strong>
                  </p>
                </div>
              )}
              {props.dressCode && (
                <div className={classes.Ewrap}>
                  <label>קוד לבוש ללהקה:</label>
                  <p>
                    <strong>{props.dressCode}</strong>
                  </p>
                </div>
              )}
              {props.imEshkachech && (
                <div className={classes.Ewrap}>
                  <label>אם אשכחך:</label>
                  <p>
                    <strong>{props.imEshkachech}</strong>
                  </p>
                </div>
              )}
              {props.breakingGlassTiming && (
                <div className={classes.Ewrap}>
                  <label>תזמון שבירת כוס:</label>
                  <p>
                    <strong>{props.breakingGlassTiming}</strong>
                  </p>
                </div>
              )}
              {props.firstDancingRoundDuration && (
                <div className={classes.Ewrap}>
                  <label> משך זמן סבב ריקודים ראשון (דקות):</label>
                  <p>
                    <strong>{props.firstDancingRoundDuration}</strong>
                  </p>
                </div>
              )}
              {props.firstDancingRoundMusicType && (
                <div className={classes.Ewrap}>
                  <label>סגנון המוזיקה בסבב ריקודים ראשון:</label>
                  <p>
                    <strong>{props.firstDancingRoundMusicType}</strong>
                  </p>
                </div>
              )}
              {props.secondDancingRoundDuration && (
                <div className={classes.Ewrap}>
                  <label> משך זמן סבב ריקודים שני (דקות):</label>
                  <p>
                    <strong>{props.secondDancingRoundDuration}</strong>
                  </p>
                </div>
              )}
              {props.secondDancingRoundMusicType && (
                <div className={classes.Ewrap}>
                  <label>סגנון המוזיקה בסבב ריקודים שני:</label>
                  <p>
                    <strong>{props.secondDancingRoundMusicType}</strong>
                  </p>
                </div>
              )}
              {props.contactManName && (
                <div className={classes.Ewrap}>
                  <label>איש הקשר:</label>
                  <p>
                    <strong>{props.contactManName}</strong>
                  </p>
                </div>
              )}
              {props.contactManPhone && (
                <div className={classes.Ewrap}>
                  <label>טלפון של איש הקשר:</label>
                  <p>
                    <strong>{props.contactManPhone}</strong>
                  </p>
                </div>
              )}
              {props.breakingGlassSong && (
                <div className={classes.Ewrap}>
                  <label>:שיר שבירת הכוס</label>
                  <p>
                    <strong>{props.breakingGlassSong}</strong>
                  </p>
                </div>
              )}
              {props.givenPrice && (
                <div className={classes.Ewrap}>
                  <label>מחיר בשקלים:</label>
                  <p>
                    <strong>{props.givenPrice}</strong>
                  </p>
                </div>
              )}
              {props.managerRemarks && (
                <div className={classes.Ewrap}>
                  <label>הערות:</label>
                  <p>
                    <strong>{props.managerRemarks}</strong>
                  </p>
                </div>
              )}
              <div className={classes.closeEditAndDelete}>
                <button
                  className={classes.button1}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <p>סגור</p>
                </button>

                <div>
                  <button
                    className={classes.button1}
                    onClick={() => {
                      setEditIsShowen(true);
                      // props.onCloseTheCreateEvent();
                      console.log();
                    }}
                  >
                    <p>ערוך</p>
                  </button>
                </div>

                <div className={classes.button1} onClick={shareData}>
                  <div className={classes.share}>
                    <ShareIcon />
                  </div>
                </div>

                <button
                  className={classes.button1}
                  onClick={() => {
                    props.onDelete(props.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Modal>
      )}
    </div>
  );
}

export default Event;
