import React, { useState } from "react";

const tabs = ["Equity", "Currency", "Commodity"];

/* === DATA: update values === */
const equityData = [
  {
    label: "Brokerage",
    futures: "Zero Brokerage",
    options: "Flat Rs. 20 per executed order",
    intraday: "0.03% or Rs. 20/executed order whichever is lower",
    delivery: "Zero Brokerage",
  },
  {
    label: "STT/CTT",
    futures: "0.025% on the sell side",
    options: "• 0.125% of intrinsic value on options bought & exercised\n• 0.1% on sell side (on premium)",
    intraday: "0.03% on sell (?)",
    delivery: "0.1% on buy & sell",
  },
  {
    label: "Transaction charges",
    futures: "NSE: 0.00297%\nBSE: 0.00375%",
    options: "NSE: 0.03503% (on premium)\nBSE: 0.0325% (on premium)",
    intraday: "NSE: 0.00297%\nBSE: 0.00375%",
    delivery: "NSE: 0.00297%\nBSE: 0.00375%",
  },
  {
    label: "GST",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: "18% on (brokerage + SEBI charges + transaction charges)",
    intraday: "18% on (brokerage + SEBI charges + transaction charges)",
    delivery: "18% on (brokerage + SEBI charges + transaction charges)",
  },
  {
    label: "SEBI charges",
    futures: "₹10 / crore",
    options: "₹10 / crore",
    intraday: "₹10 / crore",
    delivery: "₹10 / crore",
  },
  {
    label: "Stamp charges",
    futures: "0.003% or ₹300 / crore on buy side",
    options: "0.003% or ₹300 / crore on buy side",
    intraday: "0.003% or ₹300 / crore on buy side",
    delivery: "0.015% or ₹1500 / crore on buy side",
  },
];

const currencyData = [
  {
    label: "Brokerage",
    futures: "0.03% or ₹ 20/executed order whichever is lower",
    options: "₹ 20/executed order",
  },
  { label: "STT/CTT", futures: "No STT", options: "No STT" },
  {
    label: "Transaction charges",
    futures: "NSE: 0.00035% \nBSE: 0.00045%",
    options: "NSE: 0.0311% \nBSE: 0.001%",
  },
  {
    label: "GST",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: "18% on (brokerage + SEBI charges + transaction charges)",
  },
  { label: "SEBI charges", futures: "₹10 / crore", options: "₹10 / crore" },
  {
    label: "Stamp charges",
    futures: "0.0001% or ₹10 / crore on buy side",
    options: "0.0001% or ₹10 / crore on buy side",
  },
];

const commodityData = [
  {
    label: "Brokerage",
    futures: "0.03% or Rs. 20/executed order whichever is lower",
    options: "₹ 20/executed order",
  },
  {
    label: "STT/CTT",
    futures: "0.01% on sell side (Non-Agri)",
    options: "0.05% on sell side",
  },
  {
    label: "Transaction charges",
    futures: "MCX: 0.0021% \nNSE: 0.0001%",
    options: "MCX: 0.0418% \nNSE: 0.001%",
  },
  {
    label: "GST",
    futures: "18% on (brokerage + SEBI charges + transaction charges)",
    options: "18% on (brokerage + SEBI charges + transaction charges)",
  },
  {
    label: "SEBI charges",
    futures: "Agri: ₹1 / crore \nNon-agri: ₹10 / crore",
    options: "₹10 / crore",
  },
  {
    label: "Stamp charges",
    futures: "0.002% or ₹200 / crore on buy side",
    options: "0.003% or ₹300 / crore on buy side",
  },
];

/* === Re-usable table component === */
const ZerodhaTable = ({ variant }) => {
  /* variant: "Equity" | "Currency" | "Commodity" */
  if (variant === "Equity") {
    return (
      <div className="table-responsive">
        <table className="table table-hover table-striped border">
          <thead className="table-light">
            <tr>
              <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}></th>
              <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>Equity delivery</th>
              <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>Equity intraday</th>
              <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>F&O - Futures</th>
              <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>F&O - Options</th>
            </tr>
          </thead>
          <tbody>
            {equityData.map((row, i) => (
              <tr key={i}>
                <td className="fw-medium text-muted" style={{ fontSize: "0.9rem" }}>{row.label}</td>
                <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.delivery}</td>
                <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.intraday}</td>
                <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.futures}</td>
                <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.options}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const data = variant === "Currency" ? currencyData : commodityData;

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped border">
        <thead className="table-light">
          <tr>
            <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}></th>
            <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>{variant} futures</th>
            <th className="text-muted fw-medium" style={{ fontSize: "0.85rem" }}>{variant} options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="fw-medium text-muted" style={{ fontSize: "0.9rem" }}>{row.label}</td>
              <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.futures}</td>
              <td style={{ whiteSpace: "pre-line", fontSize: "0.9rem", lineHeight: "1.6" }}>{row.options}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* === Main Tabs component === */
const PricingTabs = () => {
  const [active, setActive] = useState("Equity"); // default to Equity

  return (
    <div className="container mt-5 mb-5 pt-5 pb-5">
      {/* Tabs */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 text-center">
          <ul className="nav nav-tabs border-0 justify-content-center" role="tablist">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab} role="presentation">
                <button
                  onClick={() => setActive(tab)}
                  role="tab"
                  aria-selected={active === tab}
                  className={`nav-link fs-5 fw-medium ${
                    active === tab ? "active text-primary border-bottom border-primary" : "text-muted"
                  }`}
                  style={{
                    borderBottom: active === tab ? "2px solid #387ed1" : "none",
                    color: active === tab ? "#387ed1" : "#6c757d",
                  }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-12">
          <ZerodhaTable variant={active} />
        </div>
      </div>

      {/* Bottom link */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 text-center">
          <p className="text-primary fs-6 cursor-pointer" style={{ cursor: "pointer" }}>
            <a href="#" className="text-primary text-decoration-none">
              Calculate your costs upfront using our brokerage calculator →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingTabs;
