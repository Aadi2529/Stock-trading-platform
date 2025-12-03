import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="container p-5 mt-3">
        <div
          className="row text-center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src="media/images/homeHero.svg"
            alt="Hero Image"
            className="mb-5"
            style={{ width: "60%" }}
          />
          <h1 className="mt-3 fs-3">Invest in everything</h1>
          <p className="fs-5 mb-5">
            Online platform to invest in stocks, derivatives, mutual funds,
            ETFs, bonds, and more.
          </p>
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "18%", margin: "0 auto" }}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
