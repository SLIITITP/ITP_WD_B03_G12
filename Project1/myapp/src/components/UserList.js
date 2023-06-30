import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UsersTableRow from "./UsersTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import { Alert } from "react-bootstrap";

import "../components/CSS/listmain.css";

function UsersList(props) {

  //Form validation
  const [errors, setErrors] = useState({});

  const componentRef = useRef();
    //read hook
    const [user, setUser] = useState([]);

    //Validations
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate name field
    if (data.first_name.trim() === "") {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }
  
    if (data.last_name.trim() === "") {
      newErrors.last_name = "LastName is required";
      isValid = false;
    }

    if (data.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (data.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
  
    setErrors(newErrors);
    return isValid;
  };

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
    if  (validateForm()){
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
    }
  };

  return ( 
    <div>
      <button className="material-icons floating-btn" onClick={handleShow}>add</button>

 <Link to="/userListPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>
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
               {errors.first_name && <Alert variant="danger">{errors.first_name}</Alert>}
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
               {errors.last_name && <Alert variant="danger">{errors.last_name}</Alert>}
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
               {errors.email && <Alert variant="danger">{errors.email}</Alert>}
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
               {errors.password && <Alert variant="danger">{errors.password}</Alert>}
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
        
        
        {
          //-------------------------Display data from database-------------------
        }
     
        <table className="table table-striped" >
          <tr>
            <td>
              <b>Full Name</b>
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

export default withRouter(UsersList);
