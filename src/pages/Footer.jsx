import { Link } from "react-router-dom";

const linkGroups = [
  {
    title: "Company",
    links: [
      { label: "About Solemora", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Store Locator", path: "/stores" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", path: "/track-order" },
      { label: "Size Guide", path: "/size-guide" },
      { label: "FAQs", path: "/faqs" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="xl:px-10 px-4 py-10 bg-[#1E1E1E] text-white/60 border-t border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-title text-white text-lg">SOLEMORA</p>
          <p className="font-body text-sm mt-2 max-w-xs">
            Premium footwear for those who never settle.
          </p>
        </div>

        {linkGroups.map((group, i) => (
          <div key={i}>
            <p className="font-body text-white font-semibold text-sm mb-3">
              {group.title}
            </p>
            <ul className="space-y-2 text-sm font-body">
              {group.links.map((link, j) => (
                <li key={j}>
                  <Link to={link.path} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body">
        <p>© 2026 Solemora Footwear. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">
            Instagram
          </a>
          <a href="#" className="hover:text-white">
            TikTok
          </a>
          <a href="#" className="hover:text-white">
            X
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
