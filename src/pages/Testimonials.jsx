import { useEffect, useRef, useState } from "react";
import StarRating from "../components/StarRating";

const reviews = [
  {
    quote:
      "Best sneaker shop I've used — quality is unmatched and delivery was quick.",
    name: "Tunde A.",
  },
  {
    quote: "Solemora fits different. Comfort and style, no compromise.",
    name: "Ifeoma K.",
  },
  {
    quote:
      "My go-to for kids' shoes now. Durable and the kids actually love them.",
    name: "Chidi O.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (name, duration, delay) =>
    inView
      ? {
          animation: `${name} ${duration}s ease-out both`,
          animationDelay: `${delay}s`,
        }
      : { opacity: 0 };

  return (
    <div
      ref={sectionRef}
      className="relative z-10 bg-[#0d0d0d] xl:px-10 px-4 py-10"
    >
      <style>{`
        @keyframes testiFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes testiLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="flex items-center gap-4 mb-6">
        <p
          className="testi-anim text-white font-title text-2xl"
          style={anim("testiFadeUp", 0.35, 0)}
        >
          WHAT CUSTOMERS SAY
        </p>
        <div
          className="testi-anim flex-1 h-[2px] bg-white/30"
          style={{
            transformOrigin: "left",
            ...anim("testiLineGrow", 0.45, 0.05),
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="testi-anim bg-white rounded-xl p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D6A36A]/20"
            style={anim("testiFadeUp", 0.35, 0.05 + i * 0.06)}
          >
            <StarRating />
            <p className="text-black font-body text-sm leading-relaxed">
              "{review.quote}"
            </p>
            <p className="text-black font-body text-sm font-semibold">
              — {review.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
