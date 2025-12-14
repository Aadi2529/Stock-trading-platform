const Hero = () => {
  return (
    <div className="container text-center section-padding">
      <img
        src="media/images/homeHero.svg"
        alt="Hero"
        className="img-fluid hero-image mb-4"
      />

      <h1 className="hero-title">Invest in everything</h1>

      <p className="hero-subtitle mb-4">
        Online platform to invest in stocks, derivatives, mutual funds,
        ETFs, bonds, and more.
      </p>

      <button className="btn btn-primary btn-lg hero-cta">
        Sign up for free
      </button>
    </div>
  );
};

export default Hero;
