import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../../Cart/useCartStore";
import { isAuthenticated } from "../../auth/auth";

import mainShoe from "../../assets/shoe.svg";
import thumb1 from "../../assets/thumb1.svg";
import thumb2 from "../../assets/thumb2.svg";
import thumb3 from "../../assets/thumb3.svg";
import thumb4 from "../../assets/thumb4.svg";
import thumb5 from "../../assets/thumb5.svg";
import featureShoe from "../../assets/shoe.svg";

const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5];

const defaultColors = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Gray", hex: "#4a4a4a" },
  { name: "Tan", hex: "#D6A36A" },
  { name: "Light Gray", hex: "#9a9a9a" },
];

const defaultSizes = [37, 42, 47, 30, 34, 36];
const tabs = ["Description", "Details", "Shipping & Returns", "Reviews (128)"];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [fetching, setFetching] = useState(true);

  const [activeImage, setActiveImage] = useState(mainShoe);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true);

      try {
        const productId = id || 1;
        const response = await fetch(
          `https://your-backend.onrender.com/products/${productId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load product details.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setMessage({ text: "", type: "" });

    if (!isAuthenticated()) {
      setMessage({
        text: "Please sign in to add items to your cart.",
        type: "error",
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!selectedSize) {
      setMessage({
        text: "Please select a shoe size before adding.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      // 1. Ensure productId is a valid number for Java Long backend
      const rawId = product?.id || id;
      const cleanId =
        typeof rawId === "string" ? rawId.replace(":", "") : rawId;
      const numericProductId = Number(cleanId) || 1; // Fallback to 1 if NaN

      const colorName = defaultColors[selectedColor]?.name || "Black";

      await addToCart(numericProductId, 1, Number(selectedSize), colorName);

      setMessage({
        text: "Item added to cart successfully!",
        type: "success",
      });

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      setMessage({
        text: err.message || "Failed to add item to cart.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="bg-[#0d0d0d] min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  // Fallback defaults to prevent undefined property errors
  const displayTitle =
    product?.name || product?.title || "Solemora Air Max Pro";
  const displayPrice = product?.price || "134";
  const displayDesc =
    product?.description ||
    "Experience unmatched comfort and style. Built for performance and designed for everyday wear.";

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white xl:px-16 px-4 py-8">
      {/* Breadcrumb */}
      <p className="text-xs sm:text-sm text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
        Home <span className="mx-1">›</span> Men <span className="mx-1">›</span>{" "}
        Sneakers <span className="mx-1">›</span>{" "}
        <span className="text-white">{displayTitle}</span>
      </p>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Gallery */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(thumb)}
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-white/10 hover:border-white/40"
              >
                <img
                  src={thumb}
                  alt={`thumbnail ${i}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </button>
            ))}
          </div>

          <div className="relative bg-[#1a1a1a] rounded-2xl w-full sm:w-[320px] lg:w-[380px] h-[280px] sm:h-[300px] lg:h-[320px] flex items-center justify-center order-1 sm:order-2">
            <span className="absolute top-4 left-4 bg-[#E8A857] text-black text-xs font-bold px-3 py-1 rounded-full">
              -25%
            </span>
            <img
              src={activeImage}
              alt={displayTitle}
              className="w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <span className="bg-[#E8A857] text-black text-xs font-bold px-3 py-1 rounded-full">
            Best Seller
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold mt-4">
            {displayTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-xl sm:text-2xl font-bold text-[#E8A857]">
              ${displayPrice}
            </span>
            <span className="text-gray-500 line-through">
              ${(Number(displayPrice) * 1.2).toFixed(0)}
            </span>
          </div>

          <p className="text-gray-400 italic mt-4 max-w-md text-sm sm:text-base">
            {displayDesc}
          </p>

          {/* Color Selector */}
          <div className="border-t border-white/10 mt-6 pt-6">
            <p className="text-sm mb-3">
              Color: {defaultColors[selectedColor]?.name || "Selected"}
            </p>
            <div className="flex gap-3">
              {defaultColors.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(i)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === i ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <p className="text-sm mb-3">Size: US</p>
            <div className="flex flex-wrap gap-3">
              {defaultSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${
                    selectedSize === size
                      ? "bg-[#E8A857] text-black"
                      : "bg-[#1a1a1a] text-white hover:bg-white/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {message.text && (
            <div
              className={`mt-4 p-3 rounded-lg text-xs font-semibold text-center ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex-1 bg-[#E8A857] hover:bg-[#d99a4c] text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "ADDING..." : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#1a1a1a] rounded-2xl mt-12 p-5 sm:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
        <div className="flex-1 w-full">
          <div className="flex gap-4 sm:gap-8 border-b border-white/10 pb-4 mb-6 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 text-xs sm:text-sm font-medium pb-2 ${
                  activeTab === i
                    ? "text-[#E8A857] border-b-2 border-[#E8A857]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <p className="italic text-gray-200 text-sm sm:text-base">
              {displayDesc}
            </p>
          )}
          {activeTab === 1 && (
            <p className="text-gray-300 text-sm">
              Synthetic leather & breathable mesh upper.
            </p>
          )}
          {activeTab === 2 && (
            <p className="text-gray-300 text-sm">
              Free shipping on orders over $75. 30-day returns.
            </p>
          )}
          {activeTab === 3 && (
            <p className="text-gray-300 text-sm">
              ⭐ 4.8 / 5 Rating based on customer feedback.
            </p>
          )}
        </div>

        <img
          src={featureShoe}
          alt="Feature shoe"
          className="w-48 sm:w-60 lg:w-72 object-contain"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
