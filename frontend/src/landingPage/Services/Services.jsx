import React from "react";

const Services = () => {
  return (
    <div className="pt-32 pb-24 bg-white text-gray-900">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-24">
        <h1 className="text-4xl lg:text-5xl font-bold">
          TradeNova Services & Architecture
        </h1>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
          Core services and backend architecture powering the TradeNova platform.
        </p>
      </section>

      {/* Authentication */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold mb-6">Authentication System</h2>
        <p className="text-gray-600 leading-relaxed">
          TradeNova uses JWT-based authentication for secure login
          and protected route handling. Only authenticated users
          can access dashboard and trading functionalities.
        </p>
      </section>

      {/* Backend Architecture */}
      <section className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Backend Architecture</h2>
          <p className="text-gray-600 leading-relaxed">
            The backend follows a structured MVC pattern including:
          </p>

          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>Route Layer</li>
            <li>Controller Logic</li>
            <li>Database Models</li>
            <li>Middleware for validation</li>
          </ul>
        </div>
      </section>

      {/* Database Layer */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 mb-24">
        <h2 className="text-3xl font-bold mb-6">Database Management</h2>
        <p className="text-gray-600 leading-relaxed">
          MongoDB is used for storing users, transactions,
          and portfolio data. Trade records are structured
          to support real-time portfolio recalculation.
        </p>
      </section>

      {/* API & Security */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">API & Security</h2>
          <p className="text-gray-600 leading-relaxed">
            RESTful APIs handle trade operations, authentication,
            and portfolio queries. Middleware ensures request validation
            and secure access control.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Services;