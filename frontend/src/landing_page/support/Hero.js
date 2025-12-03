import React from "react";

export default function Hero() {
  return (
    <div className="w-100 bg-light border-bottom py-5" style={{ minHeight: "200px" }}>
      <div className="container">

        {/* Top Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          
          {/* Title */}
          <h1 className="fw-bold display-6 mb-3 mb-md-0" style={{ color: "#333" }}>
            Support Portal
          </h1>

          {/* My Tickets Button */}
          <button
            className="btn btn-primary fw-semibold px-4 py-2"
            style={{
              backgroundColor: "#2b78d3",
              borderColor: "#2b78d3",
              borderRadius: "6px",
            }}
          >
            My tickets
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div
            className="input-group shadow-sm"
            style={{
              border: "1px solid #e3e3e3",
              borderRadius: "6px",
              background: "#fff",
            }}
          >
            {/* Icon */}
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search text-muted fs-5"></i>
            </span>

            {/* Input */}
            <input
              type="text"
              className="form-control border-0 py-3 fs-6"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
              style={{ boxShadow: "none" }}
            />

            {/* Search Button */}
            <button
              className="btn btn-link text-primary fw-semibold px-4"
              style={{ textDecoration: "none" }}
            >
              Search
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
