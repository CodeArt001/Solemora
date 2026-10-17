import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import searchicon from "../assets/search.svg";
import carts from "../assets/cart.svg";
import profile from "../assets/avatar.svg";
import { useCartStore } from "../Cart/useCartStore";
import AnnouncementBar from "../pages/AnnouncementBar";
import {
  bestSellers,
  kidsProducts,
  menProducts,
  womenProducts,
} from "../data/productCatalog";

const searchableProducts = [
  ...bestSellers.map((product) => ({ ...product, category: "Featured" })),
  ...menProducts.map((product) => ({ ...product, category: "Men" })),
  ...womenProducts.map((product) => ({ ...product, category: "Women" })),
  ...kidsProducts.map((product) => ({ ...product, category: "Kids" })),
];

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, fetchCart, removeItem, getTotalItems } = useCartStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const navlinks = [
    { name: "HOME", href: "/" },
    { name: "MAN", href: "/man" },
    { name: "WOMAN", href: "/woman" },
    { name: "KIDS", href: "/kids" },
  ];

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };
  const totalItems = getTotalItems();
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? searchableProducts.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearch),
      )
    : [];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const product = searchResults[0];
    if (!product) return;

    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div>
      <AnnouncementBar
        isMenuOpen={isMobileMenuOpen}
        onMenuClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
      />
      <div className="relative z-10 bg-[#0d0d0d] xl:border-b xl:border-gray-400/10">
        <div className="flex justify-between items-center xl:px-10 px-4 py-3">
          <Link to="/">
            <div className="flex gap-4 text-white">
              <img src={Logo} alt="" />
              <div className="flex flex-col items-center justify-center">
                <p className="font-heading font-bold xl:text-3xl">SOLEMORA</p>
                <p className="text-[0.60rem] font-bold font-heading">
                  FOOTWEAR
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden xl:flex gap-16">
            {navlinks.map((links) => (
              <NavLink
                key={links.href}
                to={links.href}
                end
                className="text-[#E5E5E5] font-heading font-bold relative"
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
            <button
              type="button"
              aria-label="Search products"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
            >
              <img src={searchicon} alt="" />
            </button>

            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <img src={carts} alt="Cart" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            <Link to="/register">
              <img src={profile} alt="Profile" />
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div
            role="dialog"
            aria-label="Search products"
            className="absolute right-4 top-full z-40 w-[min(24rem,calc(100vw-2rem))] rounded-b-lg border border-white/10 bg-[#121212] p-4 text-white shadow-xl"
          >
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search shoes"
                aria-label="Search shoes"
                className="min-w-0 flex-1 rounded border border-white bg-[#1a1a1a] px-3 py-2 outline-none focus:border-white"
              />
              <button
                type="submit"
                disabled={searchResults.length === 0}
                className="rounded bg-white px-4 py-2 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                Search
              </button>
            </form>

            {normalizedSearch && (
              <div className="mt-3 max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={`${product.category}-${product.id}-${product.name}`}
                      to={`/products/${product.id}`}
                      state={{ product }}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 border-b border-white/10 px-2 py-3 last:border-0 hover:bg-white/5"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-12 w-12 rounded bg-white/5 object-contain"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {product.category}
                        </span>
                      </span>
                      <span className="text-sm text-amber-300">
                        ${product.price}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-2 py-4 text-sm text-gray-400">
                    No matching shoes found.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-white/10 px-4 py-2 xl:hidden"
          >
            {navlinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 font-heading font-bold ${
                    isActive ? "text-amber-300" : "text-[#E5E5E5]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Slide-over Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#121212] text-white p-6 h-full flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
                  <h2 className="text-xl font-bold font-heading">
                    YOUR CART ({totalItems})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">
                    Your cart is currently empty.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {cartItems.map((item) => {
                      const name =
                        item.productName ||
                        item.product?.name ||
                        item.name ||
                        "Product";
                      const image =
                        item.productImageUrl ||
                        item.imageUrl ||
                        item.product?.imageUrl ||
                        item.image;
                      const price =
                        item.unitPrice ??
                        item.price ??
                        item.product?.price ??
                        0;
                      const cartItemId =
                        item.id ||
                        item.cartItemId ||
                        item.productId ||
                        item.product?.id;

                      return (
                        <div
                          key={cartItemId}
                          className="flex gap-4 items-center bg-[#1a1a1a] p-3 rounded-lg"
                        >
                          <img
                            src={image || "https://via.placeholder.com/150"}
                            alt={name}
                            className="w-16 h-16 object-cover rounded bg-neutral-800"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-bold text-sm text-white">
                              {name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-amber-400 font-bold text-sm">
                              ${price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(cartItemId)}
                            className="text-red-400 text-xs hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-800 pt-4">
                  <button
                    className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-300 transition"
                    onClick={handleCheckout}
                  >
                    CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
