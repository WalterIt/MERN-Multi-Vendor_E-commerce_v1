// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../components/layout/Loader";

// const SellerProtectedRoute = ({ children }) => {
//   const { isLoading, isSellerAuthenticated } = useSelector(
//     (state) => state.seller
//   );

//   if (isLoading) {
//     return <Loader />;
//   } else {
//     if (!isSellerAuthenticated) {
//       return <Navigate to={"/login-shop"} replace />;
//     }
//     return children;
//   }
// };

// export default SellerProtectedRoute;
