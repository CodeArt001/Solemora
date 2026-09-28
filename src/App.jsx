// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";

import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/Features/ProductDetail";
import Home from "./components/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import Checkout from "./Cart/Checkout";
import OrderConfirmation from "./Cart/OrderConfirmation";
import Man from "./pages/Man";
import Footer from "./pages/Footer";
// import Testimonials from "./pages/Testimonials";

function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/register"];
  const showNavbar = !hideNavbar.includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>
      )}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/man" element={<Man />} />
          {/* <Route path="/testimonial" element={<Testimonials />} /> */}
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {showNavbar && (
        <div className={location.pathname === "/" ? "bg-white pt-20" : ""}>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
