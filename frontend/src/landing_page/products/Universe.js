import React from "react";
import "./Universe.css";

const Universe = () => {
  return (
    <div className="universe-section container">

      <h2 className="text-center universe-title">The Zerodha Universe</h2>
      <p className="text-center universe-subtitle">
        Extend your trading and investment experience even further with our partner platforms
      </p>

      <div className="row justify-content-center universe-grid">

        {/* Zerodha Fund House */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/zerodhaFundhouse.png" className="logo" />
          <p className=" text-muted item-desc">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        {/* Sensibull */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/sensibullLogo.svg" className="logo" />
          <p className=" text-muted item-desc">
            Options trading platform that lets you create strategies,
            analyze positions, and examine data points like open interest,
            FII/DII, and more.
          </p>
        </div>

        {/* Tijori */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/tijori.svg" className="logo" />
          <p className=" text-muted item-desc">
            Investment research platform that offers detailed insights
            on stocks, sectors, supply chains, and more.
          </p>
        </div>

        {/* Row 2 */}

        {/* Streak */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/streakLogo.png" className="logo" />
          <p className=" text-muted item-desc">
            Systematic trading platform that allows you to create and
            backtest strategies without coding.
          </p>
        </div>

        {/* smallcase */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/smallcaseLogo.png" className="logo" />
          <p className=" text-muted item-desc">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks or ETFs.
          </p>
        </div>

        {/* Ditto */}
        <div className="col-12 col-md-4 item-box mt-5">
          <img src="media/images/dittoLogo.png" className="logo" />
          <p className=" text-muted item-desc">
            Personalized advice on life and health insurance. No spam and no mis-selling.
          </p>
        </div>
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "18%", margin: "0 auto" }}
          >
            Sign up for free
          </button>
      </div>

    </div>
  );
};

export default Universe;
