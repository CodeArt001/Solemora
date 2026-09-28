import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/round1.svg";
import image2 from "../assets/round2.svg";
import image3 from "../assets/round3.svg";
import image4 from "../assets/round4.svg";
import StarRating from "./StarRating";
import { isAuthenticated } from "../auth/auth";

// Animation helper: staggered fade-up. Only adds animation, no layout changes.
const fadeUp = (delay, isVisible) => ({
  animation: isVisible ? "heroFadeUp 0.7s ease-out both" : "none",
  animationDelay: `${delay}s`,
});

const HeroSection = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="xl:px-10 px-4 pt-8">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroScriptIn {
          from { opacity: 0; transform: translateX(-24px) rotate(-3deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        @keyframes heroPop {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-anim { animation: none !important; }
        }
      `}</style>

      <div className="xl:relative py-4 text-center xl:text-left">
        <p
          className="hero-anim font-title text-white font-bold xl:text-7xl text-5xl"
          style={fadeUp(0, isVisible)}
        >
          WALK YOUR
        </p>
        <p
          className="hero-anim font-script text-8xl italic text-[#D6A36A] xl:absolute xl:left-[1%] xl:-bottom-16"
          style={{
            animation: isVisible ? "heroScriptIn 0.9s ease-out both" : "none",
            animationDelay: "0.35s",
          }}
        >
          Style
        </p>
      </div>
      <p
        className="hero-anim text-white xl:mt-22 max-w-[400px] font-body text-[1.1rem] tracking-wider xl:font-normal font-bold"
        style={fadeUp(0.6, isVisible)}
      >
        Premium quality. Timeless comfort. <br />
        Crafted for those who never settle.
      </p>
      <div
        className="hero-anim flex flex-col xl:flex-row gap-6 text-white py-5"
        style={fadeUp(0.8, isVisible)}
      >
        <button
          type="button"
          disabled={!authenticated}
          title={authenticated ? "Shop now" : "Sign in to shop"}
          onClick={() => navigate("/products/1")}
          className="bg-[#D6A36A] rounded-3xl px-10 py-2 disabled:cursor-not-allowed transition-transform duration-300 enabled:hover:scale-105 enabled:active:scale-95"
        >
          SHOP NOW
        </button>
        <button className="border-white border-3 rounded-3xl px-10 py-2 transition-transform duration-300 hover:scale-105 active:scale-95">
          EXPLORE
        </button>
      </div>
      <div className="flex gap-4 mt-1">
        <span className="-space-x-2 inline-flex">
          {[image, image2, image3, image4].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="hero-anim bg-[#D6A36A] rounded-full w-6 h-6"
              style={{
                animation: isVisible ? "heroPop 0.4s ease-out both" : "none",
                animationDelay: `${1 + i * 0.12}s`,
              }}
            />
          ))}
        </span>
        <div className="hero-anim" style={fadeUp(1.3, isVisible)}>
          <p className="text-white font-body">50k+ Happy Customers</p>
          <StarRating />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
