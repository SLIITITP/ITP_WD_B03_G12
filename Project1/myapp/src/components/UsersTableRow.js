import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const UsersTableRow = (props) => {
  const [userState] = useState({
    _id: props.obj._id,
    first_name: props.obj.first_name,
    last_name: props.obj.last_name,
    email: props.obj.email,
    date: props.obj.date,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/users/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateUser = (userState) => {
    console.log(userState);
    setUpdated(userState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/users/update/${_id}`, updated)
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
              Update User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={updated.first_name}
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
                  value={updated.last_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updated.email}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={updated.password}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(userState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={userState._id} style={{ display: "none" }}>
          {"  "} 
        </td>
        <td>{userState.first_name}</td>
        <td>{userState.last_name}</td>
        <td>{userState.email}</td>
        <td>{userState.date.substring(0, 10)}</td> 
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateUser(userState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(userState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(UsersTableRow);
