import { useState } from "react";

const announcements = [
  {
    headline: "🔥 Limited Drop: Summer Collection '25",
    message: "Up to 40% OFF — Shop Now ",
  },
  //   {
  //     headline: "New season. New stride.",
  //     message: "Explore the latest arrivals.",
  //   },
  //   {
  //     headline: "Style that moves with you.",
  //     message: "Find your everyday favorite.",
  //   },
  //   {
  //     headline: "Fresh looks. All-day comfort.",
  //     message: "Meet the Solemora collection.",
  //   },
  //   {
  //     headline: "Your next great pair is waiting.",
  //     message: "Shop Solemora.",
  //   },
];

const AnnouncementBar = ({ onMenuClick, isMenuOpen }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center bg-[#D6A36A] px-4 py-3 text-sm text-black font-body">
      <div
        className="announcement-window w-full overflow-hidden pr-16 sm:px-12 xl:pr-16"
        role="status"
      >
        <div
          className="announcement-track flex w-max animate-marquee"
          aria-hidden="true"
        >
          {Array.from({ length: 4 }, (_, loop) =>
            announcements.map((announcement, index) => (
              <p
                key={`${loop}-${index}`}
                className="flex shrink-0 items-center whitespace-nowrap pr-12"
              >
                <span className="font-semibold">{announcement.headline}</span>
                <span className="mx-3 text-black/50">|</span>
                {announcement.message}
              </p>
            )),
          )}
        </div>
        <span className="sr-only">
          {announcements
            .map(({ headline, message }) => `${headline} ${message}`)
            .join(" ")}
        </span>
      </div>

      {/* Desktop: dismiss the banner */}
      <button
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        className="absolute right-4 z-10 hidden rounded bg-[#D6A36A] p-2 text-black/70 transition-colors hover:text-black xl:flex"
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

      {/* Open the navigation menu below the desktop breakpoint. */}
      <button
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={onMenuClick}
        className="absolute right-4 z-10 flex rounded bg-[#D6A36A] p-2 text-black xl:hidden"
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
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
