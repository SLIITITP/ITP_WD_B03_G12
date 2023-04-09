import React, {Component} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import '../components/CSS/navbar.css'

  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

  
class Navbar extends Component {
    
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken');
        this.props.history.push('/')
    }
      
    
    render() {
        const loginRegLink = (
                       
            <div className="nav">
            
           <ul className="nav nav-tabs">
            <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <h6>Home1</h6>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <h6>Login</h6>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <h6>Register</h6>
                    </Link>
                </li>
            </ul>
            </div>
        )

        const userLink = (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <h6>Profile</h6>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <h6>Register</h6>
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
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to ="/" className="nav-link">
                            <h6>Home</h6>
                        </Link>
                    </li>
                </ul>

                {localStorage.userToken ? userLink: loginRegLink}
            </div>
            
            
            
            </nav>
        )

    }
}

export default withRouter(Navbar);