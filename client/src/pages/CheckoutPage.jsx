import Checkout from "../components/checkout/Checkout";
import CheckoutSteps from "../components/checkout/CheckoutSteps";

const CheckoutPage = () => {
  return (
    <div>
      <CheckoutSteps active={1} />

      <Checkout />
    </div>
  );
};

export default CheckoutPage;
