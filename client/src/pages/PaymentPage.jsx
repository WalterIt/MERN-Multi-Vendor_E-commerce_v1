import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Payment from "../components/checkout/Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <CheckoutSteps active={2} />
      <Payment />
    </div>
  );
};

export default PaymentPage;
