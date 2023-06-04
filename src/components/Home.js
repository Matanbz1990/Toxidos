import React from "react";
import classes from "./Home.module.css";
import YouTubePlayer from "./YouTubePlayer";

import HomeExample from "./HomeExample";
export default function Home(props) {
  const list1 = [
    "הוספת/מחיקת/עריכת ארועים",
    "שיתוף פרטי הארוע עם חברי הלהקה ",
    "שמירת מידע חשוב ורלבנטי לגבי הארוע",
  ];

  const list2 = [
    "מידע מפורט על הארועים שלך",
    "ממשק נח וקל לשימוש",
    "ריכוז כל המידע במקום אחד",
  ];

  const list3 = ["נתמך על ידי אנדרואיד וIOS ", "חודש ניסיון חינם!"];
  return (
    <div className={classes.home}>
      <div className={classes.text1}>
        <h1>Weddiment</h1>

        <h3>פלטפורמה לניהול חתונות וארועים עבור מנהלי להקות</h3>

        <hr></hr>
        <p>
          עם Weddiment אתה יכול לנהל, לערוך, לעדכן ולעקוב אחרי הארועים שלך ולשתף
          את המידע עם חברי הלהקה שלך
        </p>
        <div className={classes.details}>
          <HomeExample text={list1} className={classes.detail} />
          <div className="vertical"></div>

          <HomeExample text={list2} className={classes.detail} />
          <div className="vertical"></div>

          <HomeExample text={list3} className={classes.detail} />
        </div>
        <div className={classes.buttonContainer}>
          <YouTubePlayer />

          <button onClick={props.handleSignUpIsOpen}>בואו נתחיל!</button>
        </div>
      </div>
    </div>
  );
}
