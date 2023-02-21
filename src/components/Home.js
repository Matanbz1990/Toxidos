import React from "react";
import classes from "./Home.module.css";
import HomeExample from "./HomeExample";
export default function Home(props) {
  const list1 = [
    "Add/Delete and Update events ",
    "Share information about events with your band",
    "Save sensitive information (just for your eyes)",
  ];

  const list2 = [
    "detailed information about the event",
    "Enjoy the convenient experience using Weddiment",
    "Centralize all information in one place",
  ];

  const list3 = ["Supported by Android and ios"];
  return (
    <div className={classes.home}>
      <div className={classes.text1}>
        <h1>Weddiment</h1>

        <h3>weddings and events mangment platform for bands managers </h3>

        <hr></hr>
        <p>
          with Weddiment you can manage, edit, update and track your upcoming
          events and share it with your band members!
        </p>
        <div className={classes.details}>
          <HomeExample text={list1} />
          <div className="vertical"></div>

          <HomeExample text={list2} />
          <div className="vertical"></div>

          <HomeExample text={list3} />
        </div>
        <div className={classes.buttonContainer}>
          <button onClick={props.handleSignUpIsOpen}>Lets start!</button>
        </div>
      </div>
    </div>
  );
}
//  for (let i = 0; i < foodItems.length; i++) {
//    items[i] = foodItems[i].map((item) => (
//      <MealItem
//        id={item.id}
//        key={item.id}
//        description={item.description}
//        name={item.name}
//        price={item.price}
//      />
//    ));
//  }
