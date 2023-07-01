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

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //insert hook
  const [data, setData] = useState({
    owner_ID: "",
    animal_name: "",
    animal_type: "",
    animal_breed: "",
    animal_gender: "",
    DOB: "",
  });

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/animal/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [updated, setUpdated] = useState({});

  const addAnimal = (id) => {
    console.log(userState);
    console.log(id);
    handleShowModal();
  };

  const handleChangeAnimal = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setData((prev) => ({
      ...prev,
      [name]: value,
      owner_ID: userState.email, // set owner_ID to the user ID
    }));
  };

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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Registered Date</Form.Label>
              <Form.Control
                type="date"
                min="2023-05-15"
                max="2023-05-15"
                name="registered_data"
                value={updated.registered_date}
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
        //-------------------------Add animal form using bootstrap Modal-------------------
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
            Add New Animal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Name:</Form.Label>
              <Form.Control
                type="text"
                name="animal_name"
                value={data.animal_name}
                placeholder="Enter Animal Name"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Animal Type:</Form.Label>
              <Form.Control
                type="text"
                name="animal_type"
                value={data.animal_type}
                placeholder="Enter Animal Type"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Breed:</Form.Label>
              <Form.Control
                type="text"
                name="animal_breed"
                value={data.animal_breed}
                placeholder="Enter Animal Breed"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Gender:</Form.Label>
              <Form.Control
                type="text"
                name="animal_gender"
                value={data.animal_gender}
                placeholder="Enter Animal Breed"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>DOB:</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                value={data.DOB}
                max="2023-07-15" 
                placeholder="Enter DOB"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Registered Date:</Form.Label>
              <Form.Control
                type="date"
                name="registered_date"
                max="2023-07-15"
                value={data.registered_date}
                placeholder="Enter Registered_date"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{ display: "none" }}
            >
              <Form.Label>User Id:</Form.Label>
              <Form.Control
                type="text"
                name="owner_ID"
                value={data.owner_ID}
                placeholder="Enter Animal Breed"
                onChange={handleChangeAnimal}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {
        //-------------------------Display All data -------------------
      }

      <td key={userState._id} style={{ display: "none" }}>
        {"  "}
      </td>
      <td>
        {userState.first_name} {userState.last_name}
      </td>
      <td>{userState.email}</td>
      <td style={{ textAlign: "center" }}>{userState.date.substring(0, 10)}</td>
      <td>
        <button 
          type="submit"
          className="addanimal"
          onClick={() => addAnimal(userState._id)}
        >
          <Link className="nav-link">Add Animal</Link>
        </button>
      </td>
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
