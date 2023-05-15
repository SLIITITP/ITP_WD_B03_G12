import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const VaccineTableRow = (props) => {
  const [vaccineState] = useState({
    _id: props.obj._id,
    vaccination_Name: props.obj.vaccination_Name,
    vaccine_Description: props.obj.vaccine_Description,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/vaccine/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateVaccine = (vaccineState) => {
    console.log(vaccineState);
    setUpdated(vaccineState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/vaccine/update/${_id}`, updated)
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
              Update Vaccine
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Vaccination Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="vaccination_Name"
                  value={updated.vaccination_Name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Vaccine Description</Form.Label>
                <Form.Control
                  type="text"
                  name="vaccine_Description"
                  value={updated.vaccine_Description}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(vaccineState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={vaccineState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{vaccineState.vaccination_Name}</td>
        <td>{vaccineState.vaccine_Description}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateVaccine(vaccineState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(vaccineState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(VaccineTableRow);
