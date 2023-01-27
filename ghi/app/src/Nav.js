import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-custom">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse btn-group"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="dropdown ml-3 mt-3">
              {/* add this to every other nav drop down */}
              <button
                className="btn btn-dark btn-secondary nav-item"
                // The Sucess keyword is defining the color. Any other waords would be in bootstrap
                onClick={() => setOpen(!open)}
              >
                Manufacturer
              </button>
              <div
                className={`dropdown-menu ${open ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/ManufacturerForm"
                  >
                    Manufacturer Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/ManufacturerList"
                  >
                    Manufacturer List
                  </NavLink>
                </li>
              </div>
            </div>

            <div className="dropdown m-3">
              <button
                className="btn btn-dark btn-secondary nav-item"
                onClick={() => setOpen2(!open2)}
              >
                Models
              </button>
              <div
                className={`dropdown-menu ${open2 ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/ModelForm"
                  >
                    Model Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/ModelList"
                  >
                    Model List
                  </NavLink>
                </li>
              </div>
            </div>

            <div className="dropdown ml-3 mt-3">
              <button
                className="btn btn-dark btn-secondary nav-item"
                onClick={() => setOpen3(!open3)}
              >
                Automobile
              </button>
              <div
                className={`dropdown-menu ${open3 ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/AutomobileForm"
                  >
                    Automobile Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="./AutomobilesList"
                  >
                    Automobile List
                  </NavLink>
                </li>
              </div>
            </div>

            <div className="dropdown m-3">
              <button
                className="btn btn-dark btn-secondary nav-item"
                onClick={() => setOpen4(!open4)}
              >
                Sales
              </button>
              <div
                className={`dropdown-menu ${open4 ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/SalesPersonForm"
                  >
                    Sales Person Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/SalesRecordForm"
                  >
                    Sales Record Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/CustomerForm"
                  >
                    Customer Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/SalesRecordList"
                  >
                    Sales Record List
                  </NavLink>
                </li>
              </div>
            </div>

            <div className="dropdown ml-3 mt-3">
              <button
                className="btn btn-dark btn-secondary nav-item"
                onClick={() => setOpen5(!open5)}
              >
                Services
              </button>
              <div
                className={`dropdown-menu ${open5 ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/ServiceHistoryList"
                  >
                    Service History List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/TechnicianForm"
                  >
                    Technician Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/AppointmentForm"
                  >
                    Appointment Form
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="dropdown-item"
                    aria-current="page"
                    to="/AppointmentsList"
                  >
                    Appointments List
                  </NavLink>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
