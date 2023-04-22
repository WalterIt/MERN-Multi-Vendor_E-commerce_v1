import styles from "../styles/styles";
import CountDown from "./CountDown";

const EventCard = ({ active, allEvents }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto px-6 py-6 ">
        <img src={allEvents?.images} alt={allEvents.name} loading="lazy" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center mr-6 ">
        <h2 className={`${styles.productTitle}`}>
          {allEvents && allEvents?.name}
        </h2>
        <p>{allEvents && allEvents?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ">
              {allEvents &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(allEvents.originalPrice)}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
              {allEvents &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(allEvents.discountPrice)}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]  ">
            {allEvents && allEvents.soldOut} sold
          </span>
        </div>
        <CountDown allEvents={allEvents} />
      </div>
    </div>
  );
};

export default EventCard;
