import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../Cart/useCartStore";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, checkout, isLoading } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.unitPrice || item.price || 0) * (item.quantity || 1),
    0,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = await checkout(formData);
      const orderId =
        orderData?.id ?? orderData?.orderId ?? orderData?.order?.id;

      navigate(
        orderId
          ? `/order-confirmation/${encodeURIComponent(orderId)}`
          : "/order-confirmation",
        { state: { order: orderData } },
      );
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4 font-heading">
          YOUR CART IS EMPTY
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-amber-400 text-black font-bold px-6 py-2 rounded-lg"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Form */}
        <div className="bg-[#121212] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold font-heading mb-6 text-amber-400">
            SHIPPING DETAILS
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">
                FULL NAME
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">
                STREET ADDRESS
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-400">
                  CITY
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-400">
                  ZIP CODE
                </label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-300 transition mt-6 disabled:opacity-50"
            >
              {isLoading ? "PROCESSING..." : `PAY $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[#121212] p-6 rounded-xl border border-gray-800 h-fit">
          <h2 className="text-xl font-bold font-heading mb-6 text-amber-400">
            ORDER SUMMARY
          </h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id || item.productId}
                className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded"
              >
                <div>
                  <p className="font-bold text-sm">
                    {item.productName || item.name || "Product"}
                  </p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-amber-400 text-sm">
                  $
                  {(
                    (item.unitPrice || item.price || 0) * (item.quantity || 1)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg border-t border-gray-800 pt-2 mt-2">
              <span>Total</span>
              <span className="text-amber-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
