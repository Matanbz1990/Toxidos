import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./Event.module.css";
import { useState } from "react";
import EditEvent from "./EditEvent";
import ShareIcon from "@mui/icons-material/Share";

function Event(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsShowen, setEditIsShowen] = useState(false);
  const onCloseEditEvent = () => {
    setEditIsShowen(false);
  };

  const prevContainerClasses = `${classes.prevContainer} ${
    props.isClosed === "reserved" ? classes.reserved : ""
  }`;
  const shareData = () => {};

  const day = props.date.slice(8, 10);
  const month = props.date.slice(5, 7);
  const year = props.date.slice(0, 4);
  const israeliDate = day + "." + month + "." + year;
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
        <div className={prevContainerClasses}>
          <h3>{israeliDate}</h3>
          <h3>{props.location}</h3>
          <h3>{props.isClosed}</h3>
          <button
            className={classes.button1}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            open
          </button>
        </div>
      )}

      {isOpen && (
        <div className={classes.container}>
          <div className={classes.column1}>
            <div className={classes.wrap}>
              <label>Date:</label>
              <p>
                <strong>{israeliDate}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Location:</label>
              <p>
                <strong>{props.location}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Bride & Groom names:</label>
              <p>
                <strong>{props.costumerName}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>is event close?</label>
              <p>
                <strong>{props.isClosed}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Amount invited:</label>
              <p>
                <strong>{props.amountInvited}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Reception music hour:</label>
              <p>
                <strong>{props.receptionMusicHour}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Reception music type:</label>
              <p>
                <strong>{props.receptionMusicType}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Chupa hour:</label>
              <p>
                <strong>{props.chupaHour}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label> Bride enterance song to chupa:</label>
              <p>
                <strong>{props.chupaEnteranceSong}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label> Bride friends character:</label>
              <p>
                <strong>{props.brideFriendsCharacter}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label> Groom friends character:</label>
              <p>
                <strong>{props.groomFriendsCharacter}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Balance hour:</label>
              <p>
                <strong>{props.balanceHour}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Bride chair hour:</label>
              <p>
                <strong>{props.brideChairHour}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Hinuma cover song:</label>
              <p>
                <strong>{props.hinumaCoverSong}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Bride bless song:</label>
              <p>
                <strong>{props.brideBlessSong}</strong>
              </p>
            </div>
          </div>
          <div className={classes.column2}>
            <div className={classes.wrap}>
              <label>there is Dj?</label>
              <p>
                <strong>{props.isDj}</strong>
              </p>
            </div>

            <div className={classes.wrap}>
              <label>Dress code:</label>
              <p>
                <strong>{props.dressCode}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Im Eshkachech:</label>
              <p>
                <strong>{props.imEshkachech}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Breaking Glass timing:</label>
              <p>
                <strong>{props.breakingGlassTiming}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>First dancing round duration:</label>
              <p>
                <strong>{props.firstDancingRoundDuration}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>First dancing round MusicType:</label>
              <p>
                <strong>{props.firstDancingRoundMusicType}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Second dancing round duration:</label>
              <p>
                <strong>{props.secondDancingRoundDuration}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Second dancing round MusicType:</label>
              <p>
                <strong>{props.SecondDancingRoundMusicType}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Contact man name:</label>
              <p>
                <strong>{props.contactManName}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Contact man phone:</label>
              <p>
                <strong>{props.contactManPhone}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label>Breaking glass song:</label>
              <p>
                <strong>{props.breakingGlassSong}</strong>
              </p>
            </div>

            <div className={classes.wrap}>
              <label>Price in Shekels:</label>
              <p>
                <strong>{props.givenPrice}</strong>
              </p>
            </div>
            <div className={classes.wrap}>
              <label> Manager remarks:</label>
              <p>
                <strong>{props.managerRemarks}</strong>
              </p>
            </div>

            <div className={classes.closeAndDelete}>
              <button
                className={classes.button1}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                close
              </button>
              {props.isAuthenticated && (
                <div>
                  <button
                    className={classes.button1}
                    onClick={() => {
                      setEditIsShowen(true);
                      props.onCloseTheCreateEvent();
                      console.log();
                    }}
                  >
                    edit
                  </button>
                </div>
              )}
              <div className={classes.button1} onClick={shareData}>
                <ShareIcon className={classes.share} />
              </div>
              {props.isAuthenticated && (
                <button
                  className={classes.button1}
                  onClick={() => {
                    props.onDelete(props.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
