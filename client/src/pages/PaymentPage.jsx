import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Payment from "../components/checkout/Payment";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <CheckoutSteps active={2} />
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
