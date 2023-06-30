import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const SupplierTableRow = (props) => {
  const [supplierState] = useState({
    _id: props.obj._id,
    company_name: props.obj.company_name,
    person1_first_name: props.obj.person1_first_name,
    person1_last_name: props.obj.person1_last_name,
    person2_first_name: props.obj.person2_first_name,
    person2_last_name: props.obj.person2_last_name,
    email1: props.obj.email1,
    email2: props.obj.email2,
    contact_no1: props.obj.contact_no1,
    contact_no2: props.obj.contact_no2,
    registerd_date: props.obj.registerd_date,
    

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/supplier/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateSupplier = (itemState) => {
    console.log(supplierState);
    setUpdated(supplierState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };
  

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/supplier/update/${_id}`, updated)
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
              Update Supplier
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
     
            <Form>

              <Form.Group className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Company name:</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={updated.company_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            

            

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person1 first name</Form.Label>
              <Form.Control
                type="text"
                name="person1_first_name"
                value={updated.person1_first_name} 
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person1 last name</Form.Label>
              <Form.Control
                type="text"
                name="person1_last_name"
                value={updated.person1_last_name} 
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person2 first name</Form.Label>
              <Form.Control
                type="text"
                name="person2_first_name"
                value={updated.person2_first_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person2 last name</Form.Label>
              <Form.Control
                type="text"
                name="person2_last_name"
                value={updated.person2_last_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>E mail </Form.Label>
              <Form.Control
                type="text"
                name="email1"
                value={updated.email}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>E mail</Form.Label>
              <Form.Control
                type="text"
                name="email2"
                value={updated.email2}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>contact no1 </Form.Label>
              <Form.Control
                type="text"
                name="contact_no1"
                value={updated.contact_no1}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

           



            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>contact no2</Form.Label>
              <Form.Control
                type="text"
                name="contact_no2"
                value={updated.contact_no2}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>


            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>registerd date</Form.Label>
              <Form.Control
                type="date"
                name="registerd_date"
                value={updated.registerd_date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
              


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(supplierState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={supplierState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{supplierState.company_name}</td>
        <td>{supplierState.person1_first_name} {supplierState.person1_last_name}</td>
        <td>{supplierState.email1}</td>
        <td>{supplierState.contact_no1}</td>
        <td>{supplierState.contact_no2}</td>
        <td>{supplierState.registerd_date.substring(0, 10)}</td>


        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateSupplier(supplierState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(supplierState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(SupplierTableRow);
