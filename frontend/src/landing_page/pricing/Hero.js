import React from "react";

const Hero = () => {
  return (
    <div>
      <div>
        <div className="container">
          <div className="row p-4 mt-5 border-bottom text-center">
            <h1>Charges</h1>
            <h3 className="text-muted mt-4 fs-5">
              List of all charges and taxes
            </h3>
          </div>

          <div className="row p-4 mt-5 text-center">
            <div className="col-4">
              <img className="responsive" src="media/images/pricingEquity.svg" alt="equity" />
              <h1 className="fs-3">Free equity delivery</h1>
              <p className="text-muted">
                All equity delivery investments (NSE, BSE), are absolutely free
                — ₹ 0 brokerage.
              </p>
            </div>
            <div className="col-4">
              <img className="responsive" src="media/images/intradayTrades.svg" alt="intraday" />
              <h1>Intraday and F&O trades</h1>
              <p className="text-muted">
                Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
                intraday trades across equity, currency, and commodity trades.
                Flat ₹20 on all option trades.
              </p>
            </div>
            <div className="col-4">
              <img className="responsive" src="media/images/pricingEquity.svg" alt="mf" />
              <h1>Free direct MF</h1>
              <p className="text-muted">
                All direct mutual fund investments are absolutely free — ₹ 0
                commissions & DP charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
