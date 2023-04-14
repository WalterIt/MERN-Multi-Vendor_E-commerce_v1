import React from "react";
import Header from "../components/layout/Header";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  window.scrollTo(0, 0);

  return (
    <div className="800px:mt-0 mt-[8%]">
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
};

export default EventsPage;
