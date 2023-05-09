import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar key={i} className="mr-2 " color="#F6BA00" size={20} />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf key={i} className="mr-2 " color="#F6BA00" size={17} />
      );
    } else {
      stars.push(
        <AiOutlineStar key={i} className="mr-2 " color="#F6BA00" size={20} />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Ratings;
