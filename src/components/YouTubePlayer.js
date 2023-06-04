import React from "react";
import classes from "./YouTubePlayer.module.css";
const YouTubePlayer = () => {
  return (
    <div className={classes.player}>
      <iframe
        src={`https://www.youtube.com/embed/8xg04JZGOFU`}
        title="review app"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
