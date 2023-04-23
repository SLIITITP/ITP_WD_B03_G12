import React, {Component} from "react";
import {Link} from "react-router-dom";
import { withRouter } from "./withRouter";

import '../components/CSS/navbar.css'


  
class Navbar extends Component {
    
    logOut(e){
        e.preventDefault()
        alert(`Byeee`)
        localStorage.removeItem('usertoken');
        this.props.navigate(`/`)
    }
      
    
    render() {
        const loginRegLink = (
                      
                <div className="nav1">              
                    <ul className="nav-tabs1">           
                        <li className="nav-item1" >
                            <Link to="/login" className="nav-link">
                                <p>Login</p>
                            </Link>
                        </li>

                        <li className="nav-item1" >
                            <Link to="/register" className="nav-link" > 
                                <p>Register</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                      
        )

        const userLink = (
            <div className="nav1"> 
                <ul className="nav-tabs1">
                    <li className="nav-item1">
                        <Link to="/profile" className="nav-link">
                            <p>Profile</p>
                        </Link>
                    </li>
                   

                <li className="nav-item1">
                    <Link onClick={this.logOut.bind(this)} className="nav-link">

                        <p>LogOut</p>
                    </Link>
                    

                    
                </li>




            </ul>
           </div>
        )

        return (
            <div className="navigation1">  
            <nav className="navbar navbar-expand-lg ">
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
            <div className="collapse navbar-collapse" id="navbar1">
                <ul className="nav-tabs1">
                    
                        <Link to ="/" className="nav-link">
                            <img src="../img/appLogo.png" className="app-logo" alt="home"/>
                        </Link>
                    
                </ul>

                {localStorage.usertoken ? userLink: loginRegLink}
            </div>
            
            
            
            </nav>
            </div>
        )

    }
}

export default withRouter(Navbar);