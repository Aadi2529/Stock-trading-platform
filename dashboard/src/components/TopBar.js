import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container topbar-compact">
      <div className="top-left">
        <div className="indices-container small-gap">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{100.2} </p>
            <p className="percent"> </p>
          </div>
          <div className="sensex d-hide-mobile">
            <p className="index">SENSEX</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
