import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/auth/LoginPage";
import "./App.css";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/HomePage";
import BestSellingPage from "./pages/BestSellingPage";
import ActivationPage from "./pages/ActivationPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import Layout from "./pages/Layout";
import ProfilePage from "./pages/ProfilePage";
import OrderDetails from "./pages/OrderDetails";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import TrackOrderDetails from "./pages/TrackOrderDetails";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import CreateShopPage from "./pages/auth/CreateShopPage";
import LoginShopPage from "./pages/auth/LoginShopPage";
import ShopHomePage from "./pages/shop/ShopHomePage";
import ShopDashboardPage from "./pages/shop/ShopDashboardPage";
import ShopCreateProduct from "./pages/shop/ShopCreateProduct";
import ShopCreateEvents from "./pages/shop/ShopCreateEvents";
import ShopProducts from "./pages/shop/ShopProducts";
import ShopOrders from "./pages/shop/ShopOrders";
import ShopOrderDetails from "./pages/shop/ShopOrderDetails";
import ShopEvents from "./pages/shop/ShopEvents";
import ShopCoupons from "./pages/shop/ShopCoupons";
import ShopPreviewPage from "./pages/shop/ShopPreviewPage";
import ShopRefunds from "./pages/shop/ShopRefunds";
import ShopDashboardHome from "./pages/shop/ShopDashboardHome";
import ShopSettingsPage from "./pages/shop/ShopSettingsPage";
import ShopWithdrawMoney from "./pages/shop/ShopWithdrawMoney";
import ShopInbox from "./pages/shop/ShopInbox";
import axios from "axios";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { useEffect, useState } from "react";
import Store from "./redux/store";
// import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import server from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TrackOrder from "./components/profile/TrackOrder";
axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated, loading } = useSelector(
    (state) => state?.user || {}
  );
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    // Store.dispatch(loadUser());
    // Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
        />
        {/* <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        /> */}

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        {/* SHOP ROUTES  */}
        <Route path="/create-shop" element={<CreateShopPage />} />
        <Route path="/login-shop" element={<LoginShopPage />} />

        <Route
          path="/dashboard/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard/shop/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<ShopDashboardHome />} />
          <Route
            path="/dashboard/create-product"
            element={<ShopCreateProduct />}
          />
          <Route path="/dashboard/products" element={<ShopProducts />} />
          <Route path="/dashboard/orders" element={<ShopOrders />} />
          <Route path="/dashboard/refunds" element={<ShopRefunds />} />
          <Route path="/dashboard/order/:id" element={<ShopOrderDetails />} />
          <Route
            path="/dashboard/create-event"
            element={<ShopCreateEvents />}
          />
          <Route path="/dashboard/events" element={<ShopEvents />} />
          <Route path="/dashboard/coupons" element={<ShopCoupons />} />
          <Route
            path="/dashboard/withdraw-money"
            element={<ShopWithdrawMoney />}
          />
          <Route path="/dashboard/messages" element={<ShopInbox />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
