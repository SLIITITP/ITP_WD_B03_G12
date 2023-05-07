import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const AppointmentTableRow = (props) => {
  const [appointmentState] = useState({
    _id: props.obj._id,
    name:props.obj.name,
    email:props.obj.email,
    phone:props.obj.phone,
    petName:props.obj.petName,
    Species:props.obj.Species,
    Breed:props.obj.Breed,
    Reason:props.obj.Reason,
    note:props.obj.note,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/appointments/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateAppointment = (appointmentState) => {
    console.log(appointmentState);
    setUpdated(appointmentState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/appointments/update/${_id}`, updated)
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
              Update Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updated.name}
                placeholder="Full Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={updated.email}
                placeholder="Enter Email"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Phone number:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={updated.phone}
                placeholder="Mobile Number"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Pet's Name:</Form.Label>
              <Form.Control
                type="text"
                name="petname"
                value={updated.petName}
                placeholder="Pet's Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Species:</Form.Label>
              <Form.Control
                type="text"
                name="species"
                value={updated.Species}
                placeholder="Cat"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Breed:</Form.Label>
              <Form.Control
                type="text"
                name="breed"
                value={updated.Breed}
                placeholder="Breed"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Reasons:</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={updated.Reason}
                placeholder="Reason(s) to make appointment"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Note:</Form.Label>
              <Form.Control
                type="text"
                name="note"
                value={updated.note}
                placeholder="Note"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(appointmentState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={appointmentState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{appointmentState.name}</td>
        <td>{appointmentState.email}</td>
        <td>{appointmentState.phone}</td>
        <td>{appointmentState.petName}</td>
        <td>{appointmentState.Species}</td>
        <td>{appointmentState.Breed}</td>
        <td>{appointmentState.Reason}</td>
        <td>{appointmentState.note}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateAppointment(appointmentState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(appointmentState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(AppointmentTableRow);
