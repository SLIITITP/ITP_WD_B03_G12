import React, {Component} from "react";
import {Link} from "react-router-dom";
import { withRouter } from "./withRouter";

class Navbar3 extends Component {
    
    
    render() {
        const loginRegLink = (
                       
            <div className="nav2">
            
             <ul className="nav-tabs2" >   

            </ul>
            </div>
        )

        const userLink = (
            <ul className="nav-tabs">
                <ul className="nav-tabs3">
                            
                    <li className="nav-item2" >
                        <Link to="/regUser" className="nav-link" > 
                            <h6>Registered Users</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/employers" className="nav-link" > 
                            <h6>Our Employers</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/admissions" className="nav-link">
                            <h6>Admissions</h6>
                        </Link>
                    </li>


                    <li className="nav-item2" >
                        <Link to="/medicalrecords" className="nav-link" > 
                            <h6>Medical Records</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/appointments" className="nav-link" > 
                            <h6>Appointments</h6>
                        </Link>
                    </li>


                </ul>

                <ul className="nav-tabs4">
                            
                    <li className="nav-item2" >
                        <Link to="/store" className="nav-link" > 
                            <h6>Online Store</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/orders" className="nav-link">
                            <h6>Online Orders</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/onlinepayments" className="nav-link" > 
                            <h6>Online Payments</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/invoice" className="nav-link" > 
                            <h6>Invoice</h6>
                        </Link>
                    </li>

                    <li className="nav-item2" >
                        <Link to="/dashboard" className="nav-link" > 
                            <h6>Dashboard</h6>
                        </Link>
                    </li>


                </ul>

        </ul>




        )



        
        return (
           
            <nav className="navbar navbar-expand-lg navbar-light rounded">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                    </button>
            <div className="navbar-collapse justify-content-md-center" id="navbar1">
               

                {localStorage.usertoken ? userLink: loginRegLink}
            </div>
            
            
            
            </nav>
            
        )

    }
}

export default withRouter(Navbar3);