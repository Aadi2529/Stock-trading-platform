import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";

const Footer = () => {
  const sections = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Markets", path: "/markets" },
        { name: "Watchlist", path: "/watchlist" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Orders", path: "/orders" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Learning Center", path: "/learn" },
        { name: "Market News", path: "/news" },
        { name: "FAQs", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#020617] text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
<Link to="/" className="text-2xl font-bold text-white">
  TradeNova
</Link>

<p className="mt-4 text-sm text-gray-400 leading-relaxed">
  TradeNova is a modern trading platform prototype built to
  simulate real-world order execution, portfolio tracking,
  and trading engine logic.
</p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <Facebook className="hover:text-green-400 cursor-pointer transition" size={18} />
              <Instagram className="hover:text-green-400 cursor-pointer transition" size={18} />
              <Linkedin className="hover:text-green-400 cursor-pointer transition" size={18} />
              <Youtube className="hover:text-green-400 cursor-pointer transition" size={18} />
            </div>
          </div>

          {/* Dynamic Links */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-6">
                {section.title}
              </h4>

              <ul className="space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-green-400 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter Section */}
        <div className="mt-16 border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div>
            <h3 className="text-white font-semibold text-lg">
              Stay updated with market insights
            </h3>
            <p className="text-sm text-gray-400">
              Get weekly updates and trading tips.
            </p>
          </div>

          <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 text-sm outline-none text-gray-300"
            />
            <button className="bg-green-500 px-4 py-2 hover:bg-green-600 transition">
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 text-xs text-gray-500 text-center border-t border-gray-800 pt-6">
© {new Date().getFullYear()} TradeNova. All rights reserved. |
Prototype trading platform for educational purposes.
        </div>

      </div>
    </footer>
  );
};

export default Footer;