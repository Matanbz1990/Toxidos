import Event from "./Event";
import classes from "./Month.module.css";
import { useState } from "react";

const Month = (props) => {
  const [monthIsOpen, setMonthIsOpen] = useState(false);
  let monthItem = props.monthItem;
  // console.log(monthItem);

  const switchMonth = (month) => {
    month = +month;
    switch (month) {
      case 1:
        return "January";

      case 2:
        return "Februar";

      case 3:
        return "March";

      case 4:
        return "April";

      case 5:
        return "May";

      case 6:
        return "June";

      case 7:
        return "July";

      case 8:
        return "Aogust";

      case 9:
        return "September";

      case 10:
        return "October";

      case 11:
        return "November";

      case 12:
        return "December";

      default:
        return "December";
    }
  };

  function randomStr() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div>
      <div className={classes.monthContainer}>
        <h3
          className={classes.nameOfMonth}
          onClick={() => {
            setMonthIsOpen(!monthIsOpen);
          }}
        >
          {switchMonth(monthItem[0].date.slice(5).slice(0, 2))}
        </h3>

        <div className={classes.displayEvents}>
          {monthItem.map((eventItem) => (
            <div key={eventItem.id}>
              {monthIsOpen && (
                <Event
                  id={eventItem.id}
                  date={eventItem.date}
                  location={eventItem.location}
                  costumerName={eventItem.costumerName}
                  balanceHour={eventItem.balanceHour}
                  hinumaCoverSong={eventItem.hinumaCoverSong}
                  brideBlessSong={eventItem.brideBlessSong}
                  isDj={eventItem.isDj}
                  dressCode={eventItem.dressCode}
                  // finishTime={eventItem.finishTime}
                  imEshkachech={eventItem.imEshkachech}
                  breakinGglassSong={eventItem.breakinGglassSong}
                  givenPrice={eventItem.givenPrice}
                  remarks={eventItem.remarks}
                  onDelete={props.deleteHandler}
                  eventIsEdittedHandler={props.eventIsEdittedHandler}
                  isAuthenticated={props.isAuthenticated}
                  onCloseTheCreateEvent={props.closeTheCreateEvent}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Month;
