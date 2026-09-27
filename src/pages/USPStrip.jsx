const items = [
  {
    title: "Free Shipping",
    detail: "On all orders above $150",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    detail: "30-day hassle-free exchange",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M4 12a8 8 0 1 1 3 6.2" />
        <path d="M4 17v-4h4" />
      </svg>
    ),
  },
  {
    title: "Authentic Guarantee",
    detail: "100% genuine, verified products",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2l2.6 1.5 3-.3 1 2.8 2.6 1.6-1 2.9 1 2.9-2.6 1.6-1 2.8-3-.3L12 22l-2.6-1.6-3 .3-1-2.8-2.6-1.6 1-2.9-1-2.9 2.6-1.6 1-2.8 3 .3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    detail: "Your payment, always protected",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2l7 3v6c0 4.5-3 8.2-7 9-4-.8-7-4.5-7-9V5z" />
        <rect x="9" y="11" width="6" height="5" rx="1" />
        <path d="M10.5 11V9a1.5 1.5 0 0 1 3 0v2" />
      </svg>
    ),
  },
];

const USPStrip = () => {
  return (
    <section className="relative z-10 bg-white xl:px-10 px-4 py-10 xl:py-12">
      <style>{`
        @keyframes uspFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <p className="text-2xl text-neutral-900 text-center mb-8 font-body font-bold">
        WHY SHOP WITH US
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              animation: "uspFadeUp 0.5s ease-out both",
              animationDelay: `${i * 0.1}s`,
            }}
            className="group flex flex-col items-center text-center gap-2 bg-white border border-neutral-200 rounded-xl shadow-sm px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-neutral-800 transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
            <p className="font-sans font-semibold text-[16px] text-neutral-900 mt-2">
              {item.title}
            </p>
            <p className="font-sans font-normal text-[14px] text-neutral-500">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default USPStrip;
