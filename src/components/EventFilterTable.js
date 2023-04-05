import React from "react";
import classes from "./EventFilter.module.css";

const EventFilterTable = (props) => {
  //send the select year upward
  const SelectedYear = (e) => {
    props.selectedYearData(e.target.value);
  };

  return (
    <div className={classes.eventFilter}>
      <div className={classes.eventFilterControl}>
        {/* <label>בחר שנה</label> */}
        <select onChange={SelectedYear}>
          <option value="">בחר שנה</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
  );
};
export default EventFilterTable;
