// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";

import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/Features/ProductDetail";
import Home from "./components/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/register"];
  const showNavbar = !hideNavbar.includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <div className="sticky z-50 top-0 ">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/man" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
