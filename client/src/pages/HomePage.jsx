import Header from "../components/layout/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BestDeals from "../components/BestDeals";
import FeaturedProduct from "../components/FeaturedProduct";
import Events from "../components/Events";
import Sponsored from "../components/Sponsored";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  window.scrollTo(0, 0);

  return (
    <div>
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
    </div>
  );
};

export default HomePage;
