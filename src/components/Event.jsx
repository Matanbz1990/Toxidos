import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./Event.module.css";
import { useState } from "react";
import EditEvent from "./EditEvent";

function Event(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsShowen, setEditIsShowen] = useState(false);
  const onCloseEditEvent = () => {
    setEditIsShowen(false);
  };
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
        <div className={classes.prevContainer}>
          <h3>{props.date}</h3>
          <h3>{props.location}</h3>
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
              <p>{props.date}</p>
            </div>
            <div className={classes.wrap}>
              <label>Location:</label>
              <p>{props.location}</p>
            </div>
            <div className={classes.wrap}>
              <label>Bride & Groom names:</label>
              <p>{props.costumerName}</p>
            </div>
            <div className={classes.wrap}>
              <label>Balance hour:</label>
              <p>{props.balanceHour}</p>
            </div>
            <div className={classes.wrap}>
              <label>Bride chair hour:</label>
              <p>{props.brideChairHour}</p>
            </div>
            <div className={classes.wrap}>
              <label>Hinuma cover song:</label>
              <p>{props.hinumaCoverSong}</p>
            </div>
            <div className={classes.wrap}>
              <label>Bride bless song:</label>
              <p>{props.brideBlessSong}</p>
            </div>
          </div>
          <div className={classes.column2}>
            <div className={classes.wrap}>
              <label>there is Dj?</label>
              <p>{props.isDj}</p>
            </div>
            <div className={classes.wrap}>
              <label>Dress code:</label>
              <p>{props.dressCode}</p>
            </div>
            <div className={classes.wrap}>
              <label>Im Eshkachech:</label>
              <p>{props.imEshkachech}</p>
            </div>
            <div className={classes.wrap}>
              <label>Breaking glass song:</label>
              <p>{props.breakinGglassSong}</p>
            </div>
            <div className={classes.wrap}>
              <label> Any remarks:</label>
              <p>{props.remarks}</p>
            </div>
            {props.isAuthenticated && (
              <div>
                <p> (* just the manager can see)</p>
                <div className={classes.wrap}>
                  <label>* Price in Shekels:</label>
                  <p>{props.givenPrice}</p>
                </div>
                <div className={classes.wrap}>
                  <label>* Manager remarks:</label>
                  <p>{props.managerRemarks}</p>
                </div>
              </div>
            )}

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
