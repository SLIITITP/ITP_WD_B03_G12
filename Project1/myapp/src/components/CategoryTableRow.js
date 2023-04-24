import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const CategoryTableRow = (props) => {
  const [categoryState] = useState({
    _id: props.obj._id,
    name: props.obj.name,
    description: props.obj.description,
   

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/category/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateCategory = (categoryState) => {
    console.log(categoryState);
    setUpdated(categoryState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };
  

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/category/update/${_id}`, updated)
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
              Update Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
     
            <Form>

              <Form.Group className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updated.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            

            

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>description</Form.Label>
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
            <Button onClick={() => onUpdate(categoryState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={categoryState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{categoryState.name}</td>
        <td>{categoryState.description}</td>
        


        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateCategory(categoryState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(categoryState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(CategoryTableRow);
