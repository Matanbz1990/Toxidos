import React from "react";
import classes from "./CreateEventButton";
export default function CreateEventButton(props) {
  return (
    <div className={classes.buttonContainer}>
      <button
        className={classes.button1}
        onClick={() => {
          props.changeTheCreateEvent();
        }}
      >
        צור ארוע
      </button>
    </div>
  );
}
