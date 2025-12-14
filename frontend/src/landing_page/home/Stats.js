const Stats = () => {
  return (
    <div className="container section-padding">
      <div className="row align-items-center">

        <div className="col-12 col-md-6 mb-4">
          <h1 className="mb-4">Trust with confidence</h1>

          <h4 className="text-muted">Customer-first always</h4>
          <p className="text-muted">
            1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores.
          </p>

          <h4 className="text-muted mt-4">No spam or gimmicks</h4>
          <p className="text-muted">
            No gimmicks, spam, or annoying notifications.
          </p>

          <h4 className="text-muted mt-4">The Zerodha universe</h4>
          <p className="text-muted">
            A complete fintech ecosystem.
          </p>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img
            src="media/images/ecosystem.png"
            className="img-fluid mb-4"
            alt="ecosystem"
          />

          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <a href="#" className="link-primary">Explore products →</a>
            <a href="#" className="link-primary">Try Kite demo →</a>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <img
          src="media/images/pressLogos.png"
          className="img-fluid"
          alt="press"
        />
      </div>
    </div>
  );
};

export default Stats;
