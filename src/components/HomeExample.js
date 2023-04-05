import React from "react";
import "./HomeExample.module.css";

export default function HomeExample(props) {
  return (
    <ul>
      {props.text.map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ul>
  );
}
