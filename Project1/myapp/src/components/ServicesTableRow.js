import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const ServicesTableRow = (props) => {
  const [serviceState] = useState({
    _id: props.obj._id,
    service_name: props.obj.service_name,
    service_price: props.obj.service_price,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/service/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateService = (serviceState) => {
    console.log(serviceState);
    setUpdated(serviceState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:8000/service/update/${_id}`, updated)
      .then((res) => {
        alert(`Updated Successfully : ${_id}`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <tbody>
      <tr>
        {
          //-------------------------Update form using bootstrap Modal-------------------
        }

        <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Services
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Service Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="service_name"
                  value={updated.service_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Service Price</Form.Label>
                <Form.Control
                  type="text"
                  name="service_price"
                  value={updated.service_price}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(serviceState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={serviceState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{serviceState.service_name}</td>
        <td>{serviceState.service_price}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateService(serviceState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(serviceState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default withRouter(ServicesTableRow);
