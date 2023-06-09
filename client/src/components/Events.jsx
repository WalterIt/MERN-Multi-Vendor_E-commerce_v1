import { useEffect, useState } from "react";
import styles from "../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents } = useSelector((state) => state.events);

  return (
    <div>
      <div className={`${styles.section} `}>
        <div className={`${styles.heading} `}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          <EventCard allEvents={allEvents && allEvents[0]} />
        </div>
      </div>
    </div>
  );
};

export default Events;
