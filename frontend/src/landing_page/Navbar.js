import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close Bootstrap collapse when route changes (fix mobile menu remaining open)
  const location = useLocation();
  useEffect(() => {
    const el = document.getElementById("navbarSupportedContent");
    if (el && el.classList.contains("show")) {
      el.classList.remove("show");
    }
  }, [location.pathname]);

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${
        scrolled ? "navbar-shadow" : ""
      }`}
    >
      <div className="container">

        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            className="navbar-logo"
            alt="logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">

            {["signup", "about", "product", "pricing", "support"].map(
              (item) => (
                <li className="nav-item" key={item}>
                  <NavLink
                    to={`/${item}`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </li>
              )
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;


              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
              // <input
              //   class="form-control me-2"
              //   type="search"
              //   placeholder="Search"
              //   aria-label="Search"
              // />
              // <button class="btn btn-outline-success" type="submit">
              //   Search
              // </button> 