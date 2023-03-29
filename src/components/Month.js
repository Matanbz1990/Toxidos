import Event from "./Event";
import classes from "./Month.module.css";
import { useState } from "react";
import ColorsMap from "./ColorsMap";

const Month = (props) => {
  const [monthIsOpen, setMonthIsOpen] = useState(false);
  let monthItem = props.monthItem;

  const switchMonth = (month) => {
    month = +month;
    switch (month) {
      case 1:
        return "January";

      case 2:
        return "February";

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
            <div key={eventItem.id} className={classes.eventUnit}>
              {monthIsOpen && (
                <Event
                  id={eventItem.id}
                  date={eventItem.date}
                  location={eventItem.location}
                  costumerName={eventItem.costumerName}
                  balanceHour={eventItem.balanceHour}
                  hinumaCoverSong={eventItem.hinumaCoverSong}
                  brideBlessSong={eventItem.brideBlessSong}
                  brideChairHour={eventItem.brideChairHour}
                  managerRemarks={eventItem.managerRemarks}
                  isDj={eventItem.isDj}
                  isClosed={eventItem.isClosed}
                  dressCode={eventItem.dressCode}
                  imEshkachech={eventItem.imEshkachech}
                  breakingGlassSong={eventItem.breakingGlassSong}
                  givenPrice={eventItem.givenPrice}
                  onDelete={props.deleteHandler}
                  eventIsEdittedHandler={props.eventIsEdittedHandler}
                  onCloseTheCreateEvent={props.closeTheCreateEvent}
                  amountInvited={eventItem.amountInvited}
                  receptionMusicHour={eventItem.receptionMusicHour}
                  receptionMusicType={eventItem.receptionMusicType}
                  chupaHour={eventItem.chupaHour}
                  chupaEnteranceSong={eventItem.chupaEnteranceSong}
                  brideFriendsCharacter={eventItem.brideFriendsCharacter}
                  groomFriendsCharacter={eventItem.groomFriendsCharacter}
                  breakingGlassTiming={eventItem.breakingGlassTiming}
                  firstDancingRoundDuration={
                    eventItem.firstDancingRoundDuration
                  }
                  firstDancingRoundMusicType={
                    eventItem.firstDancingRoundMusicType
                  }
                  secondDancingRoundDuration={
                    eventItem.secondDancingRoundDuration
                  }
                  secondDancingRoundMusicType={
                    eventItem.secondDancingRoundMusicType
                  }
                  contactManName={eventItem.contactManName}
                  contactManPhone={eventItem.contactManPhone}
                />
              )}
            </div>
          ))}
          {monthIsOpen && <ColorsMap key={Math.random()} />}
        </div>
      </div>
    </div>
  );
};
export default Month;
