import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const PrescriptionsTableRow = (props) => {
  const [prescriptionState] = useState({
    _id: props.obj._id,
    DoctorID: props.obj.DoctorID,
    PetID: props.obj.PetID,
    PetName: props.obj.PetName,
    Illness: props.obj.Illness,
    Medicine: props.obj.Medicine,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/prescription/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updatePrescription = (prescriptionState) => {
    console.log(prescriptionState);
    setUpdated(prescriptionState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/prescription/update/${_id}`, updated)
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
              Update Prescriptions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>DoctorID:</Form.Label>
                <Form.Control
                  type="text"
                  name="DoctorID"
                  value={updated.DoctorID}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>PetID</Form.Label>
                <Form.Control
                  type="text"
                  name="PetID"
                  value={updated.PetID}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>PetName</Form.Label>
                <Form.Control
                  type="text"
                  name="PetName"
                  value={updated.PetName}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Illness:</Form.Label>
                <Form.Control
                  type="text"
                  name="Illness"
                  value={updated.Illness}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Medicine:</Form.Label>
                <Form.Control
                  type="text"
                  name="Medicine"
                  value={updated.Medicine}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(prescriptionState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={prescriptionState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{prescriptionState.DoctorID}</td>
     
        <td>{prescriptionState.PetName}</td>
        <td>{prescriptionState.Illness}</td>
        <td>{prescriptionState.Medicine}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updatePrescription(prescriptionState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(prescriptionState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(PrescriptionsTableRow);
