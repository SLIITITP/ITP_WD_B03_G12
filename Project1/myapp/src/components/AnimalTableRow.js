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
    DOB: props.obj.DOB.substring(0, 10),
    date: props.obj.date.substring(0, 10),
    owner_ID: props.obj.owner_ID,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [view, setView] = useState({});

  const viewAnimal = (id) => {
    console.log(animalState);
    console.log(id);
    handleShowModal();
    setView(id);
  };
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Gender:</Form.Label>
              <Form.Control as = "select" 
                  name="animal_gender"
                  value={updated.animal_gender}
                  onChange={handleChange}>
              <option value="employee_gender">Select</option>
              <option value="M">Male</option>
               <option value="F">Female</option> 
              </Form.Control>
  

            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Animal Breed</Form.Label>
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
        //-------------------------View using bootstrap Modal-------------------
      }

      <Modal
        {...props}
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pet Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{view.animal_name}</h4>
          <h5>{view.animal_type}</h5>
          <h5>{view.animal_gender}</h5>
          <h5>{view.animal_breed}</h5>
          <h5>{view.DOB}</h5>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vaccine:</Form.Label>
              <Form.Control
                type="text"
                name="vaccine"
                value={updated.vaccine}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={updated.date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Next Date</Form.Label>
              <Form.Control
                type="date"
                name="next_date"
                value={updated.next_date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                name="batch"
                value={updated.batch}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>MFD</Form.Label>
              <Form.Control
                type="date"
                name="MFD"
                value={updated.MFD}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>EXP</Form.Label>
              <Form.Control
                type="date"
                name="EXP"
                value={updated.EXP}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Veterinarian</Form.Label>
              <Form.Control
                type="text"
                name="vaterinarian"
                value={updated.vaterinarian}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onUpdate(animalState._id)}>Add</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {
        //-------------------------Display All data -------------------
      }

      <td key={animalState._id} style={{ display: "none" }}></td>
      <td>{animalState.animal_name}</td>
      <td>{animalState.animal_type}</td>
      <td>{animalState.animal_breed}</td>
      <td>{animalState.animal_gender}</td>
      <td>{animalState.DOB}</td>
      <td>{animalState.owner_ID}</td>
      <td>{animalState.date}</td>
      <td>
        <button
          type="submit"
          className="view"
          onClick={() => viewAnimal(animalState)}
        >
          <Link className="nav-link">View</Link>
        </button>
      </td>

      <td>
        <button
          type="submit"
          className="submit update-btn"
          onClick={() => updateAnimal(animalState)}
        >
          <Link className="nav-link">Update</Link>
        </button>
      </td>
      <td>
        <button
          type="submit"
          className="delete delete-btn"
          onClick={() => onDelete(animalState._id)}
        >
          <Link className="nav-link">Delete</Link>
        </button>
      </td>
    </tr>
  );
};

export default withRouter(AnimalTableRow);
