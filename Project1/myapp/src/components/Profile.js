import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Row, Col } from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    console.log("token:", token);
    if (!token) {
      this.setState({ error: "Token not found in local storage" });
      return;
    }

    try {
      const decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
      });
    } catch (error) {
      this.setState({ error: "Error decoding token: " + error.message });
    }
  }

  render() {
    const { error, first_name, last_name, email } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm8 mx-auto">
            <h1 className="text-center">Profile</h1>

            <Row style={{ marginLeft: "200px" }}>
              <Col md={3}>
                <img
                  src="../img/user.png"
                  className="circular-image"
                  style={{ marginTop: "10px" }}
                  alt="profile"
                />
              </Col>
              <Col md={9}>
                <table className="table col-md-6 mx-auto">
                  <tbody>
                    <h3>
                      <br />

                      <tr>
                        <td>Name</td>
                        <td>
                          <b>
                            {first_name} {last_name}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <b>
                          <td>{email}</td>
                        </b>
                      </tr>
                    </h3>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
