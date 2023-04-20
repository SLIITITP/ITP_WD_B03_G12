import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const AnimalTableRow = (props) => {
  const [animalState] = useState({
    _id: props.obj._id,
    animal_name: props.obj.animal_name,
    animal_type: props.obj.animal_type,
    animal_breed: props.obj.animal_breed,
    animal_gender: props.obj.animal_gender,
    DOB: props.obj.DOB,
    date: props.obj.date,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/animal/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateAnimal = (animalState) => {
    console.log(animalState);
    setUpdated(animalState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/animal/update/${_id}`, updated)
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
              Update Animal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Animal Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="animal_name"
                  value={updated.animal_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Animal Type</Form.Label>
                <Form.Control
                  type="text"
                  name="animal_type"
                  value={updated.animal_type}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1" >
                <Form.Label>Animal Type</Form.Label>
                <Form.Control
                  type="text"
                  name="animal_breed"
                  value={updated.animal_breed}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

          
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Animal Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="animal_gender"
                  value={updated.animal_gender}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="DOB"
                  value={updated.DOB}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(animalState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={animalState._id} style={{ display: "none" }}>
        </td>
        <td>{animalState.animal_name}</td>
        <td>{animalState.animal_type}</td>
        <td>{animalState.animal_breed}</td>
        <td>{animalState.animal_gender}</td>
        <td>{animalState.DOB}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateAnimal(animalState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(animalState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(AnimalTableRow);
