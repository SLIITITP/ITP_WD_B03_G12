import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";


const EmployeeLoginTableRow = (props) => {
  const [employeeloginState] = useState({
    _id: props.obj._id,
    employeelogin_image: props.obj.image,
    employeelogin_email: props.obj.email,
    employeelogin_password: props.obj.password,
    employeelogin_acctype: props.obj.acctype,
    employeelogin_date: props.obj.reggdate,

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/accounts/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateEmployeelogin = (employeeloginState) => {
    console.log(employeeloginState);
    setUpdated(employeeloginState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };
  

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/accounts/update/${_id}`, updated)
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
              Update login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <Form>

              <Form.Group className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Enter email:</Form.Label>
              <Form.Control
                type="text"
                name="employeelogin_email"
                value={updated.employeelogin_email}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter password</Form.Label>
              <Form.Control
                type="text"
                name="employeelogin_password"
                value={updated.employeelogin_password} 
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter account type:</Form.Label>
              <Form.Control as = "select"
                  name="employeelogin_acctype"
                  value={updated.employeelogin_acctype}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="doctor">Doctor</option>
               <option value="admin">Admin</option>
               <option value="cashier">Cashier</option>
              </Form.Control>
  

            </Form.Group>




 
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(employeeloginState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={employeeloginState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <img src={`../uploads/${employeeloginState.employeelogin_image}`} className="app-logo" alt="img" />
 
        <td>{employeeloginState.employeelogin_email}</td>
      
        <td>{employeeloginState.employeelogin_acctype}</td>
        <td>{employeeloginState.employeelogin_date.substring(0, 10)}</td>


        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateEmployeelogin(employeeloginState)}
          >
           <Link className="nav-link">Update</Link> 
          </button>
        </td>

        <td>
          <button
            type="submit"
            className="delete" 
            onClick={() => onDelete(employeeloginState._id)}
          >
             <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(EmployeeLoginTableRow);
