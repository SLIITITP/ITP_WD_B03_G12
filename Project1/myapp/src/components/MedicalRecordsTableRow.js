import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const MedicalRecordsTableRow = (props) => {
  const [MedicalRecordsState] = useState({
    _id: props.obj._id,
    issued_doctor_ID: props.obj.issued_doctor_ID,
    description: props.obj.description,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/medicalrecords/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateMedicalRecords = (MedicalRecordsState) => {
    console.log(MedicalRecordsState);
    setUpdated(MedicalRecordsState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/medicalrecords/update/${_id}`, updated)
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
              Update MedicalRecords
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Issued DoctorID:</Form.Label>
                <Form.Control
                  type="text"
                  name="issued_doctor_ID"
                  value={updated.issued_doctor_ID}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={updated.description}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(MedicalRecordsState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={MedicalRecordsState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{MedicalRecordsState.issued_doctor_ID}</td>
        <td>{MedicalRecordsState.description}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateMedicalRecords(MedicalRecordsState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(MedicalRecordsState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(MedicalRecordsTableRow);
