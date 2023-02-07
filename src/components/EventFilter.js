import React from "react";
import classes from "./EventFilter.module.css";

const EventFilter = (props) => {
  //send the select year upward
  const SelectedYear = (e) => {
    props.selectedYearData(e.target.value);
  };

  return (
    <div className={classes.eventFilter}>
      <div className={classes.eventFilterControl}>
        <label>Filter by year</label>
        <select onChange={SelectedYear}>
          <option value="">Choose a year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>
  );
};
export default EventFilter;
