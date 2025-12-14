const Pricing = () => {
  return (
    <div className="container section-padding">
      <div className="row align-items-center">

        <div className="col-12 col-md-6 mb-4">
          <h2 className="text-muted">Unbeatable pricing</h2>
          <p className="text-muted">
            Flat fees. No hidden charges.
          </p>
          <a href="#" className="link-primary">See pricing →</a>
        </div>

        <div className="col-12 col-md-6">
          <div className="d-flex justify-content-between text-center pricing-features">
            <div>
              <img src="media/images/pricing0.svg" className="img-fluid" />
              <p>Free account opening</p>
            </div>
            <div>
              <img src="media/images/pricing0.svg" className="img-fluid" />
              <p>Free equity delivery</p>
            </div>
            <div>
              <img src="media/images/other-trades.svg" className="img-fluid" />
              <p>Intraday & F&O</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
