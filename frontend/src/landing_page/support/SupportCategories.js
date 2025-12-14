import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './SupportCategories.css';

/**
 * SupportCategories
 * - data-driven accordion
 * - shows icon, title, and content (bulleted links) when expanded
 */
export const categoriesData = [
  {
    id: "cat1",
    icon: "bi-plus-circle", // bootstrap icon class
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
    icon: "bi-person-circle",
    title: "Your Zerodha Account",
    items: [
        "Your Profile",
        "Account modification",
        "Client Master Report (CMR) and Depositroy Participant (DP)",
        "Nomination",
        "Transfer and conversion of securities"
    ],
  },
  {
    id: "cat3",
    icon: "bi-box-arrow-in-up-right",
    title: "Kite",
    items: [
        "IPO",
        "Trading FAQs",
        "Margin Trading Facility (MTF) and Margins",
        "Charts and orders",
        "Alerts and Nudges",
        "Genral"
    ],
  },
  {
    id: "cat4",
    icon: "bi-currency-rupee",
    title: "Funds",
    items: [
        "Add Money",
        "Withdraw mony",
        "Add bank accounts",
        "eMandates"
    ],
  },
  {
    id: "cat5",
    icon: "bi-pie-chart",
    title: "Console",
    items: [
        "Portfolio",
        "Corporate actions",
        "Funds statement",
        "Reports",
        "Profile",
        "Segments"
    ],
  },
  {
    id: "cat6",
    icon: "bi-clock",
    title: "Coin",
    items: [
        "Mutual funds",
        "National Pension Scheme (NPS)",
        "Features on Coin",
        "Payments and Orders",
        "General"
    ],
  },
];

export default function SupportCategories() {
  // keep all categories closed by default; user can expand manually
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="container my-5">
      <div className="row gx-4">
        {/* LEFT: accordion */}
        <div className="col-lg-8">
          <div className="accordion" id="supportAccordion">
            {categoriesData.map((cat) => {
              const isOpen = openId === cat.id;
              return (
                <div className="card mb-3" key={cat.id}>
                  <div className="d-flex align-items-center">
                    {/* left icon block */}
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 72,
                        height: 56,
                        background: "#f7fbff",
                        borderRight: "1px solid #eef2f6",
                      }}
                    >
                      <i className={`${cat.icon} text-primary fs-4`} />
                    </div>

                    {/* header */}
                    <button
                      className="flex-grow-1 text-start btn btn-link p-3 d-flex align-items-center justify-content-between"
                      onClick={() => toggle(cat.id)}
                      aria-expanded={isOpen}
                      style={{ textDecoration: "none", color: "#1f2937", fontSize: 18 }}
                    >
                      <span>{cat.title}</span>
                      <i
                        className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"} text-primary chev ${isOpen ? 'open' : ''}`}
                        style={{ fontSize: 20 }}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* body */}
                  <div
                    className={`collapse ${isOpen ? "show" : ""}`}
                    style={{ borderTop: "1px solid #eef2f6" }}
                  >
                    <div className="card-body">
                      <ul className="list-unstyled mb-0 ps-3">
                        {cat.items.map((it, i) => {
                          const slug = encodeURIComponent(String(it).toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                          const to = `/support/topic/${cat.id}/${slug}`;
                          return (
                            <li key={i} className="mb-3">
                              <Link to={to} className="text-primary support-link">
                                {it}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: sidebar */}
        <div className="col-lg-4">
          <div className="mb-4 support-highlight">
            <ul className="mb-0 support-list">
              <li className="mb-2">
                <Link to="/support" className="text-decoration-underline text-primary">Offer for sale (OFS) – December 2025</Link>
              </li>
              <li>
                <Link to="/support" className="text-decoration-underline text-primary">Surveillance measure on scrips - December 2025</Link>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header bg-light fw-bold">Quick links</div>
            <ul className="list-group list-group-flush" >
              <li className="list-group-item">
                <Link to="/support/topic/cat1/resident-individual" className="text-primary">1. Track account opening</Link>
              </li>
              <li className="list-group-item">
                <Link to="/support/topic/cat2/profile-kyc" className="text-primary">2. Track segment activation</Link>
              </li>
              <li className="list-group-item">
                <Link to="/support/topic/cat3/kite-web" className="text-primary">3. Intraday margins</Link>
              </li>
              <li className="list-group-item">
                <Link to="/support/topic/cat3/kite-user-manual" className="text-primary">4. Kite user manual</Link>
              </li>
              <li className="list-group-item">
                <Link to="/support/topic/cat2/account-types" className="text-primary">5. Learn how to create a ticket</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
