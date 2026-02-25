const Pricing = () => {
  return (
    <section className="py-24 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Unbeatable pricing
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              Flat fees. No hidden charges.
            </p>

            <a
              href="#"
              className="text-red-500 font-medium hover:underline hover:translate-x-1 transition inline-block"
            >
              See pricing →
            </a>
          </div>

          {/* RIGHT FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
              <img
                src="media/images/pricing0.svg"
                alt="Free account"
                className="mx-auto mb-4 h-16"
              />
              <p className="font-medium text-gray-700">
                Free account opening
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
              <img
                src="media/images/pricing0.svg"
                alt="Free equity"
                className="mx-auto mb-4 h-16"
              />
              <p className="font-medium text-gray-700">
                Free equity delivery
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
              <img
                src="media/images/other-trades.svg"
                alt="Intraday"
                className="mx-auto mb-4 h-16"
              />
              <p className="font-medium text-gray-700">
                Intraday & F&O
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Pricing;