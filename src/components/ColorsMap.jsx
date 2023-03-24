import React from "react";

import classes from "./ColorsMap.module.css";
export default function ColorsMap() {
  return (
    <div className={classes.colorsMap}>
      <div className={classes.colorCss}>
        <div className={classes.square2}> </div>
        <h4> event is reserved</h4>
      </div>
      <div className={classes.colorCss}>
        <div className={classes.square1}> </div>
        <h4>event is close</h4>
      </div>
      <div className={classes.colorCss}>
        <div className={classes.square3}> </div>
        <h4>event date has passed</h4>
      </div>
    </div>
  );
}
