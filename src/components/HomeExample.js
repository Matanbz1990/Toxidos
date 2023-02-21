import React from "react";
import classes from "./HomeExample.module.css";

export default function HomeExample(props) {
  return (
    <div className={classes.container}>
      <ul>
        {props.text.map((sentence) => (
          <li key={sentence}>{sentence}</li>
        ))}
      </ul>
    </div>
  );
}
