import React, { useState, useEffect, Component, useRef } from "react";
import axios from "axios";
import EmployeeTableRow from "./EmployeeTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import Table from "react-bootstrap/Table";
import "../components/CSS/listmain.css";
import { Alert } from "react-bootstrap";

function EmployeeList(props) {
  //Form validation
  const [errors, setErrors, setVal] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name field
    if (data.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (data.lname.trim() === "") {
      newErrors.lname = "Last name is required";
      isValid = false;
    }

    if (data.NIC.trim() === "") {
      newErrors.NIC = "NIC is required";
      isValid = false;
    }

    if (data.phoneno.trim() === "") {
      newErrors.phoneno = "Phone number is required";
      isValid = false;
    }

    if (data.address.trim() === "") {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (data.gender === "select") {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (data.birthday.trim() === "") {
      newErrors.birthday = "Birthday is required";
      isValid = false;
    }

    if (data.jobrole === "select") {
      newErrors.jobrole = "Job role is required";
      isValid = false;
    }
    if (data.basicSal === "select") {
      newErrors.basicSal = "Salary is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //read hook
  const [employee, setEmployee] = useState([]);

  //insert hook
  const [data, setData] = useState({
    name: "",
    lname: "",
    NIC: "",
    phoneno: "",
    address: "",
    gender: "",
    birthday: "",
    jobrole: "",
    basicSal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the service price
    if (name === "basicSal" && !/^\d*\.?\d{0,2}$/.test(value)) {
      // Price validation failed
      return;
    }

    // Validate the service price
    if (name === "NIC" && !/^\d*\.?\d{0,2}$/.test(value)) {
      // Price validation failed
      return;
    }

    // Validate the service price
    if (name === "phoneno" && !/^\d*\.?\d{0,2}$/.test(value)) {
      // Price validation failed
      return;
    }

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
      .get("http://localhost:5000/employee/")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return employee.map((object, i) => {
      return <EmployeeTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/get/count")
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

    if (validateForm()) {
      axios
        .post(`http://localhost:5000/employee/add`, data)
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
      <button className="material-icons floating-btn" onClick={handleShow}>
        add
      </button>

      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Link to="/employeePreviewList" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter first name:</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter first name"
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <Alert variant="danger">{errors.name}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter last name:</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={data.lname}
                placeholder="Enter last name"
                onChange={handleChange}
                autoFocus
              />
              {errors.lname && <Alert variant="danger">{errors.lname}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter NIC:</Form.Label>
              <Form.Control
                type="text"
                name="NIC"
                value={data.NIC}
                placeholder="Enter NIC"
                onChange={handleChange}
                maxLength={13} // Set the maximum length to 13 characters
                pattern="[0-9]{12}v?" // Specify the pattern to accept 12 numbers followed by an optional 'v'
                title="Please enter 12 numbers followed by an optional 'v'" // Display a title for the pattern validation
                autoFocus
                onKeyDown={(e) => {
                  const { key } = e;
                  if (key >= 0 && key <= 9) {
                    const inputValue = e.target.value;
                    if (inputValue.length === 12) {
                      e.target.value = inputValue + "v";
                    }
                  }
                }}
              />
              {errors.NIC && <Alert variant="danger">{errors.NIC}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter phone number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneno"
                value={data.phoneno}
                placeholder="Enter phone number"
                onChange={handleChange}
                autoFocus
              />

              {errors.phoneno && (
                <Alert variant="danger">{errors.phoneno}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={data.address}
                placeholder="Enter address"
                onChange={handleChange}
                autoFocus 
              />
              {errors.address && (
                <Alert variant="danger">{errors.address}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Gender:</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              >
                <option value="select">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Control>
              {errors.gender && <Alert variant="danger">{errors.gender}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter birthday:</Form.Label>
              <Form.Control
                type="date"
                min="1950-01-01"
                max="2010-12-31"
                name="birthday"
                value={data.birthday}
                placeholder="Enter birthday"
                onChange={handleChange}
                autoFocus
              />
              {errors.birthday && (
                <Alert variant="danger">{errors.birthday}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter job role:</Form.Label>
              <Form.Control
                as="select"
                name="jobrole"
                value={data.jobrole}
                onChange={handleChange}
              >
                <option value="select">Select</option>
                <option value="doctor">Doctor</option>
                <option value="employee">Employee</option>
              </Form.Control>
              {errors.jobrole && (
                <Alert variant="danger">{errors.jobrole}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Basic Salary</Form.Label>
              Rs.
              <Form.Control
                type="text"
                name="basicSal"
                value={data.basicSal}
                pattern="[0-9]*"
                placeholder="Basic Salary"
                onChange={handleChange}
                autoFocus
              />
              {errors.basicSal && (
                <Alert variant="danger">{errors.basicSal}</Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClick}>
            Add
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Employee List</h1>
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

        <Table
          className="table table-striped"
            
        >
          <tr  class="table-header" style={{ textAlign: "center" }}>
            <td style={{ width:"220px" }}>
              <b>Full Name</b>  
            </td>

            <td>
              <b>NIC</b>
            </td>
            <td>
              <b>Phone No</b>
            </td>
            <td style={{ width:"200px" }}>  
              <b>Address</b>
            </td>
            <td>
              <b>Sex</b>
            </td> 
            <td style={{ width:"150px" }}>
              <b>Birthday</b> 
            </td>
            <td>
              <b>Job role</b> 
            </td>   
            <td style={{ width:"100px"}}>  
              <b>BasicSal (LKR)</b> 
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </Table>
      </div>
    </div>
  );
}
export default withRouter(EmployeeList);
