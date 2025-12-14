import React from "react";

const LeftSection = ({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) => {
  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-6 p-5">
          <img className="responsive" src={imageURL} alt={productName} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div className="product-links">
            <a className="product-link" href={tryDemo}>Try Demo</a>
            <a className="product-link" href={learnMore}>Learn More</a>
          </div>
          <div className="mt-4">
            <a href={googlePlay} className="store-badge">
              <img className="responsive" src="media/images/googlePlayBadge.svg" alt="play" />
            </a>
            <a href={appStore} className="store-badge">
              <img className="responsive" src="media/images/appstoreBadge.svg" alt="appstore" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
