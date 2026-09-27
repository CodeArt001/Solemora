import { Link, useLocation, useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const order = state?.order;
  const displayedOrderId =
    orderId || order?.id || order?.orderId || order?.order?.id;

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-6">
      <section className="w-full max-w-lg text-center">
        <p className="text-amber-400 font-bold tracking-wide">
          ORDER CONFIRMED
        </p>
        <h1 className="mt-3 text-3xl font-bold font-heading">
          Thank you for your order.
        </h1>
        <p className="mt-3 text-gray-400">
          Your order has been placed successfully.
        </p>
        {displayedOrderId && (
          <p className="mt-5 text-sm text-gray-300">
            Order number: <span className="font-bold">{displayedOrderId}</span>
          </p>
        )}
        <Link
          to="/"
          className="inline-block mt-8 bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300"
        >
          CONTINUE SHOPPING
        </Link>
      </section>
    </main>
  );
};

export default OrderConfirmation;
