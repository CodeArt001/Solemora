import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";
import searchicon from "../assets/search.svg";
import carts from "../assets/cart.svg";
import profile from "../assets/avatar.svg";

const Navbar = () => {
  const navlinks = [
    { name: "HOME", href: "/" },
    { name: "MAN", href: "man" },
    { name: "WOMAM", href: "woman" },
    { name: "KIDS", href: "kids" },
  ];

  return (
    <div className="relative z-10 bg-[#0d0d0d] xl:border-b xl:border-gray-400/10">
      <div className="flex justify-between items-center xl:px-10 px-4 py-3">
        <Link to="/">
          <div className="flex gap-4 text-white">
            <img src={Logo} alt="" />
            <div className="flex flex-col items-center justify-center">
              <p className="font-heading font-bold xl:text-3xl">SOLEMORA</p>
              <p className="text-[0.60rem] font-bold font-heading">FOOTWEAR</p>
            </div>
          </div>
        </Link>

        <div className="flex gap-16 hidden xl:flex">
          {navlinks.map((links) => (
            <NavLink
              key={links.href}
              to={links.href}
              className="text-white font-heading font-bold relative"
            >
              {({ isActive }) => (
                <>
                  {links.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-amber-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center xl:gap-6 gap-4 justify-center">
          <img src={searchicon} alt="" />
          <img src={carts} alt="" />
          <Link to="/register">
            <img src={profile} alt="" />
          </Link>
        </div>
      </div>

      {/* mobile marquee */}
      <div className="mt-4 xl:hidden overflow-hidden w-full">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          {navlinks.map((links) => (
            <NavLink
              key={links.href}
              to={links.href}
              className="text-white font-heading font-bold relative"
            >
              {({ isActive }) => (
                <>
                  {links.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-amber-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          {navlinks.map((links) => (
            <NavLink
              key={`dup-${links.href}`}
              to={links.href}
              className="text-white font-heading font-bold relative"
            >
              {links.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
