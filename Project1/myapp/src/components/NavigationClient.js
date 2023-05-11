import React, {Component} from "react";
import {Link} from "react-router-dom";
import { withRouter } from "./withRouter";

import '../components/CSS/navbar.css'

class Navbar2 extends Component {
    
    
    render() {
        const loginRegLink = (
                       
            <div className="nav2">
            
             <ul className="nav-tabs2" >   

             <li className="nav-item2" >
                    <Link to="/about" className="nav-link" > 
                        <h6>About Us</h6>
                    </Link>
                </li>


                <li className="nav-item2" >
                    <Link to="/store" className="nav-link">
                        <h6>Online Store</h6>
                    </Link>
                </li>

                <li className="nav-item2" >
                    <Link to="/appointments" className="nav-link" > 
                        <h6>Our Team</h6>
                    </Link>
                </li>

                <li className="nav-item2" >
                    <Link to="/contact" className="nav-link" > 
                        <h6>Contact Us</h6>
                    </Link>
                </li>

            </ul>
            </div>
        )

        const userLink = (
            <ul className="nav-tabs2">
                           
                <li className="nav-item2" >
                    <Link to="/about" className="nav-link" > 
                        <h6>About Us</h6>
                    </Link>
                </li>

                <li className="nav-item2" >
                    <Link to="/store" className="nav-link">
                        <h6>Online Store</h6>
                    </Link>
                </li>

                <li className="nav-item2" >
                    <Link to="/CusAppointment" className="nav-link" > 
                        <h6>Appointments</h6>
                    </Link>
                </li>

                <li className="nav-item2" >
                    <Link to="/contact" className="nav-link" > 
                        <h6>Contact Us</h6>
                    </Link>
                </li>

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
            <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                <ul className="nav-tabs2">
                    <li className="nav-item2">
                        <Link to ="/" className="nav-link">
                            <h6>Home</h6>
                        </Link>
                    </li>
                </ul>

                {localStorage.usertoken ? userLink: loginRegLink}
            </div>
            
            
            
            </nav>
            
        )

    }
}

export default withRouter(Navbar2);