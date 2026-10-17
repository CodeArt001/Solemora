import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const PaymentModal = ({ amount, email, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Math.round(amount * 100), // Paystack expects kobo, not naira
    publicKey: PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const handlePay = () => {
    initializePayment({
      onSuccess: (reference) => {
        setIsOpen(false);
        onSuccess?.(reference);
      },
      onClose: () => {
        // user closed the Paystack popup without paying
      },
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#D6A36A] hover:bg-[#c7944f] text-black font-semibold py-3 rounded-lg transition"
      >
        PAY NOW
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-sm p-6 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-title text-lg">Confirm Payment</p>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between font-body text-sm text-white/70 mb-1">
              <span>Paying as</span>
              <span className="text-white">{email}</span>
            </div>
            <div className="flex items-center justify-between font-body mb-6">
              <span className="text-white/70 text-sm">Total</span>
              <span className="text-2xl font-bold text-[#D6A36A]">
                ${amount.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePay}
              className="w-full bg-[#D6A36A] hover:bg-[#c7944f] text-black font-semibold py-3 rounded-lg transition"
            >
              Pay with Paystack
            </button>

            <p className="text-xs text-white/40 text-center mt-4">
              You'll be securely redirected to Paystack to complete payment.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
