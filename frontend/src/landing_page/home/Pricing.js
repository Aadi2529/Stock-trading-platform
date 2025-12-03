// import './Pricing.css';

const Pricing = () => {
  return (
    <div className="container p-6 pricing-container">
        <div className="row align-items-center mb-5">
          {/* LEFT SIDE */}
          <div className="col-md-6  mb-4 mb-md-0 pricing-left">
            <h2 className="text-muted fw-semibold fs-2 mb-3">Unbeatable pricing</h2>
            <p className="text-muted fs-5 mb-4" style={{ lineHeight: "1.7" }}>
              We pioneered the concept of discount broking and price transparency in India.
              Flat fees and no hidden charges.
            </p>
            <a
              href="#"
              className="text-primary text-decoration-none fw-medium d-inline-flex align-items-center"
              
            >
              See pricing 
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6 pricing-right" style={{fontSize:'11px'}}>
            <div className="pricing-features d-flex justify-content-between text-center">
              {/* ₹0 - Free Account Opening */}
              <div className="feature-item">
                <img
                  src="media/images/pricing0.svg"
                  alt="₹0 - Free account opening"
                  className="feature-img"
                />
                <p className="feature-caption mb-0">Free account opening</p>
              </div>

              {/* ₹0 - Free equity delivery */}
              <div className="feature-item">
                <img
                  src="media/images/pricing0.svg"
                  alt="₹0 - Free equity delivery"
                  className="feature-img"
                />
                <p className="feature-caption mb-0">
                  Free equity delivery <br /> and direct mutual funds
                </p>
              </div>

              {/* ₹20 - Intraday and F&O */}
              <div className="feature-item">
                <img
                  src="media/images/other-trades.svg"
                  alt="Intraday and F&O"
                  className="feature-img"
                />
                <p className="feature-caption mb-0">
                  Intraday and <br /> F&O
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};

export default Pricing;
