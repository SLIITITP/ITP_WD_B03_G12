import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";

class Navbar3 extends Component {
  render() {
    const loginRegLink = (
      <div className="nav2">
        <ul className="nav-tabs2"></ul>
      </div>
    );

    const userLink = (
      <ul className="nav-tabs">
        <ul className="nav-tabs3">
          

          <li className="nav-item2">
            <Link to="/regUser" className="nav-link">
              <h6>Registered Users</h6> 
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/animals" className="nav-link">
              <h6>Animals</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/animaltype" className="nav-link">
              <h6>Animal Types</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/payments" className="nav-link">
              <h6>Invoice</h6>
            </Link>
          </li>


          <li className="nav-item2">
            <Link to="/employees" className="nav-link">
              <h6>Employees</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/accounts" className="nav-link">
              <h6>Accounts</h6>
            </Link> 
          </li> 

          <li className="nav-item2">
            <Link to="/admissions" className="nav-link">
              <h6>Admissions</h6>
            </Link>
          </li> 

          <li className="nav-item2">
            <Link to="/shelters" className="nav-link">
              <h6>Shelters</h6>
            </Link> 
          </li> 

          <li className="nav-item2">
            <Link to="/prescriptions" className="nav-link">
              <h6>Medical Records</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/appointment" className="nav-link">
              <h6>Appointments</h6>
            </Link>
          </li>
        </ul>

        <ul className="nav-tabs4">
          <li className="nav-item2">
            <Link to="/items" className="nav-link">
              <h6>Items</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/supplier " className="nav-link">
              <h6>Suppliers</h6> 
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/store" className="nav-link">
              <h6>Online Store</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/orderList" className="nav-link">
              <h6>Online Orders</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/services" className="nav-link">
              <h6>Services</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/insights" className="nav-link">
              <h6>Insights</h6>
            </Link>
          </li>








          <li className="nav-item2">
            <Link to="/insights" className="nav-link">
              <h6>Insights</h6>
            </Link>
          </li>

          <li className="nav-item2">
            <Link to="/insights" className="nav-link">
              <h6>Insights</h6>
            </Link>
          </li>






        </ul>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="sidebar">
        <div className="navbar-collapse justify-content-md-center" id="navbar1">
         
            {localStorage.usertoken ? userLink : loginRegLink}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar3);
