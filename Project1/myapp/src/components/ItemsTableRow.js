import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const ItemTableRow = (props) => {
  const [itemState] = useState({
    _id: props.obj._id,
    item_name: props.obj.name,
    item_category: props.obj.category,
    item_price: props.obj.price,
    item_Supplier: props.obj.Supplier,
    item_description: props.obj.description,
    item_qty: props.obj.qty,
    item_manufacture_date: props.obj.manufacture_date,
    item_expire_date: props.obj.expire_date,

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/item/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateItem = (itemState) => {
    console.log(itemState);
    setUpdated(itemState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };
  

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/item/update/${_id}`, updated)
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
              Update Employees
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
     
            <Form>

              <Form.Group className="mb-3" 
              controlId="exampleForm.ControlInput1">
              <Form.Label>Enter name:</Form.Label>
              <Form.Control
                type="text"
                name="item_name"
                value={updated.item_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter category</Form.Label>
              <Form.Control
                type="text"
                name="item_category"
                value={updated.item_category} 
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Price</Form.Label>
              <Form.Control
                type="text"
                name="item_price"
                value={updated.item_price}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Supplier</Form.Label>
              <Form.Control
                type="text"
                name="item_Supplier"
                value={updated.item_Supplier}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                type="text"
                name="item_description"
                value={updated.item_description}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter qty</Form.Label>
              <Form.Control
                type="text"
                name="item_qty"
                value={updated.item_qty}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter manufacture_data</Form.Label>
              <Form.Control
                type="date"
                name="item_manufacture_date"
                value={updated.item_manufacture_date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" 
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter expire_data</Form.Label>
              <Form.Control
                type="date"
                name="item_expire_date"
                value={updated.item_expire_date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
              


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(itemState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {
          //-------------------------Display All data -------------------
        }

        <td key={itemState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{itemState.item_name}</td>
        <td>{itemState.item_category}</td>
        <td>{itemState.item_price}</td>
        <td>{itemState.item_Supplier}</td>
        <td>{itemState.item_description}</td>
        <td>{itemState.item_qty}</td>
        <td>{itemState.item_manufacture_date}</td>
        <td>{itemState.item_expire_date}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateItem(itemState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(itemState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(ItemTableRow); 
