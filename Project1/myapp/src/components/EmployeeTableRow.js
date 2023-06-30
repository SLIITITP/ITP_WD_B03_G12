import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";


const EmployeeTableRow = (props) => {
  const [employeeState] = useState({
    _id: props.obj._id,
    employee_name: props.obj.name,
    employee_lname: props.obj.lname,
    employee_NIC: props.obj.NIC,
    employee_phoneno: props.obj.phoneno,
    employee_address: props.obj.address,
    employee_gender: props.obj.gender,
    employee_birthday: props.obj.birthday,
    employee_jobrole: props.obj.jobrole,
    employee_basicSal:props.obj.basicSal

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/employee/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateEmployee = (employeeState) => {
    console.log(employeeState);
    setUpdated(employeeState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };
  

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/employee/update/${_id}`, updated)
      .then((res) => {
        alert(`Updated Successfully : ${_id}`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  return (
    
      <tr>
        {
          //-------------------------Update form using bootstrap Modal-------------------
        }

        <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Employees
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <Form>

              <Form.Group className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Enter first name:</Form.Label>
              <Form.Control
                type="text"
                name="employee_name"
                value={updated.employee_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter last name</Form.Label>
              <Form.Control
                type="text"
                name="employee_lname"
                value={updated.employee_lname} 
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter NIC</Form.Label>
              <Form.Control
                type="text"
                name="employee_NIC"
                value={updated.employee_NIC}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter phone number</Form.Label>
              <Form.Control
                type="text"
                name="employee_phoneno"
                value={updated.employee_phoneno}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter address</Form.Label>
              <Form.Control
                type="text"
                name="employee_address"
                value={updated.employee_address}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>


            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Gender:</Form.Label>
              <Form.Control as = "select"
                  name="gender"
                  value={updated.employee_gender}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="male">Male</option>
               <option value="female">Female</option>
              </Form.Control>
  

            </Form.Group>





            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter birthday</Form.Label>
              <Form.Control
                type="date"  max="2010-12-31"
                name="employee_birthday"
                value={updated.employee_birthday}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            


            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter job role:</Form.Label>
              <Form.Control as = "select"
                  name="jobrole"
                  value={updated.employee_jobrole}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="doctor">Doctor</option>
               <option value="employee">Employee</option>
              </Form.Control>
  

            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Basic Salary</Form.Label>
              <Form.Control
                type="text"
                name="employee_basicSal"
                value={updated.employee_basicSal}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
              


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='info' onClick={() => onUpdate(employeeState._id)}>Update</Button>
            <Button  variant='danger'onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={employeeState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{employeeState.employee_name} {employeeState.employee_lname}</td>
        <td>{employeeState.employee_NIC}</td>
        <td>{employeeState.employee_phoneno}</td>
        <td>{employeeState.employee_address}</td>
        <td>{employeeState.employee_gender}</td>
        <td>{employeeState.employee_birthday}</td>
        <td>{employeeState.employee_jobrole}</td>
        <td>{employeeState.employee_basicSal}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateEmployee(employeeState)}
          >
            <Link className="nav-link">Update</Link>
          </button> 
        </td> 
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(employeeState._id)}
          >
          <Link className="nav-link">Delete</Link> 
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(EmployeeTableRow);
