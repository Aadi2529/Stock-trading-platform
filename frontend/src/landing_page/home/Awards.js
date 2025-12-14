const Awards = () => {
  return (
    <div className="container section-padding">
      <div className="row align-items-center">
        
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img
            src="media/images/largestBroker.svg"
            alt="largestBroker"
            className="img-fluid"
          />
        </div>

        <div className="col-12 col-md-6">
          <h1>Largest Stock broker in India</h1>
          <p className="mb-4 text-muted">
            2+ million Zerodha clients contribute to over 15% of all retail order volumes in India.
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds & Govt. Securities</li>
              </ul>
            </div>
          </div>

          <img
            src="media/images/pressLogos.png"
            className="img-fluid mt-4"
            alt="press"
          />
        </div>
      </div>
    </div>
  );
};

export default Awards;
