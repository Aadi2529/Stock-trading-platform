import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div>
      <div className="container">
        <div className="row border-top p-3 mt-5">
          <h1 className="mt-5 text-center ">People</h1>
        </div>

        <div
          className="row p-5 mt-5  text-muted fs-6"
          style={{ lineHeight: "1.8", fontSize: "1.2em" }}
        >
          <div className="col-md-6 p-5 text-center">
            <img
              className="team-avatar responsive"
              src="media/images/nithinKamath.jpg"
              alt="Nithin Kamath"
            />
            <h4 className="mt-4">Nithin Kamath</h4>
            <h6>Co-founder & CEO</h6>
          </div>
          <div className="col-md-6 p-5">
            <p>
              Nithin bootstrapped and founded Zerodha in 2010 to overcome the
              hurdles he faced during his decade long stint as a trader. Today,
              Zerodha has changed the landscape of the Indian broking industry.
            </p>
            <p>
              He is a member of the SEBI Secondary Market Advisory Committee
              (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>
            <p>Playing basketball is his zen.</p>
            <p>
              Connect on <a href="">Homepage</a>/<a href="">TradingQnA</a>/
              <a href="">Twitter</a>/
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
