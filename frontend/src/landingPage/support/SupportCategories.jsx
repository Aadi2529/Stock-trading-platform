import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export const categoriesData = [
  {
    id: "cat1",
    title: "Account Opening",
    items: [
      "Resident individual",
      "Minor",
      "Non Resident Indian (NRI)",
      "Company, Partnership, HUF and LLP",
      "Glossary",
    ],
  },
  {
    id: "cat2",
    title: "Your Zerodha Account",
    items: [
      "Your Profile",
      "Account modification",
      "Client Master Report (CMR) and Depository Participant (DP)",
      "Nomination",
      "Transfer and conversion of securities",
    ],
  },
  {
    id: "cat3",
    title: "Kite",
    items: [
      "IPO",
      "Trading FAQs",
      "Margin Trading Facility (MTF) and Margins",
      "Charts and orders",
      "Alerts and Nudges",
      "General",
    ],
  },
  {
    id: "cat4",
    title: "Funds",
    items: ["Add Money", "Withdraw money", "Add bank accounts", "eMandates"],
  },
  {
    id: "cat5",
    title: "Console",
    items: [
      "Portfolio",
      "Corporate actions",
      "Funds statement",
      "Reports",
      "Profile",
      "Segments",
    ],
  },
  {
    id: "cat6",
    title: "Coin",
    items: [
      "Mutual funds",
      "National Pension Scheme (NPS)",
      "Features on Coin",
      "Payments and Orders",
      "General",
    ],
  },
];

export default function SupportCategories() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT ACCORDION */}
          <div className="lg:col-span-2 space-y-4">
            {categoriesData.map((cat) => {
              const isOpen = openId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggle(cat.id)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {cat.title}
                    </span>

                    {isOpen ? (
                      <ChevronUp className="text-red-500" />
                    ) : (
                      <ChevronDown className="text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6">
                      <ul className="space-y-3">
                        {cat.items.map((it, i) => {
                          const slug = encodeURIComponent(
                            String(it)
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                          );
                          const to = `/support/topic/${cat.id}/${slug}`;

                          return (
                            <li key={i}>
                              <Link
                                to={to}
                                className="text-gray-600 hover:text-red-500 transition"
                              >
                                {it}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Highlights */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900">
                Announcements
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/support"
                    className="text-red-500 hover:underline"
                  >
                    Offer for sale (OFS) – December 2025
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-red-500 hover:underline"
                  >
                    Surveillance measure on scrips - December 2025
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold mb-4 text-gray-900">
                Quick links
              </h4>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/support/topic/cat1/resident-individual" className="hover:text-red-500">
                    1. Track account opening
                  </Link>
                </li>
                <li>
                  <Link to="/support/topic/cat2/profile-kyc" className="hover:text-red-500">
                    2. Track segment activation
                  </Link>
                </li>
                <li>
                  <Link to="/support/topic/cat3/kite-web" className="hover:text-red-500">
                    3. Intraday margins
                  </Link>
                </li>
                <li>
                  <Link to="/support/topic/cat3/kite-user-manual" className="hover:text-red-500">
                    4. Kite user manual
                  </Link>
                </li>
                <li>
                  <Link to="/support/topic/cat2/account-types" className="hover:text-red-500">
                    5. Learn how to create a ticket
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}