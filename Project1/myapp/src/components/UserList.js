import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTableRow from "./UsersTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";

function UserList(props) {
    //read hook
    const [user, setUser] = useState([]);

  //insert hook
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Bootsrap Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return user.map((object, i) => {
      return <UsersTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users/register`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={data.first_name}
                placeholder="Enter First Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={data.last_name}
                placeholder="Enter Last Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter Email"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={data.password}
                placeholder="Enter Password"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Users List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Add User</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/regUser" className="nav-link">
                  <p>View all Users</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link  className="nav-link">
                  <p>Add Animal</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/animals" className="nav-link">
                  <p>View all Animal</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/animaltypes" className="nav-link">
                  <p>Add Animal Type</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/animaltypes" className="nav-link">
                  <p>View all Animal Types</p>
                </Link>
              </td>
            </tr>
          </table>
        </div>

        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
              <b>Registered Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(UserList);
