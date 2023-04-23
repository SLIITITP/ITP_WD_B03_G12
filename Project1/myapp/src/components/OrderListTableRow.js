import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const OrderListTableRow = (props) => {
  const [orderState] = useState({
    _id: props.obj._id,
    selectedItem: props.obj.selectedItem,
    selectedItemQty: props.obj.selectedItemQty,
    totalPrice: props.obj.totalPrice,
    paymentMethod: props.obj.paymentMethod,
    orderStates: props.obj.orderStates,
    orderDate: props.obj.orderDate,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/adminOrder/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const updateOrders = (orderState) => {
    console.log(orderState);
    setUpdated(orderState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpdate = (_id) => {
    axios
      .put(`http://localhost:5000/adminOrder/update/${_id}`, updated)
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
              Update Orders
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>paymentMethod:</Form.Label>
                <Form.Control
                  type="text"
                  name="paymentMethod"
                  value={updated.paymentMethod}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea2"
              >
                <Form.Label>totalPrice</Form.Label>
                <Form.Control
                  type="text"
                  name="totalPrice"
                  value={updated.totalPrice}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>selectedItem</Form.Label>
                <Form.Control
                  type="text"
                  name="selectedItem"
                  value={updated.selectedItem}
                  onChange={handleChange}
                  autoFocus
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>selectedItemQty</Form.Label>
                <Form.Control
                  type="text"
                  name="selectedItemQty"
                  value={updated.selectedItemQty}
                  onChange={handleChange}
                  autoFocus
                />
                </Form.Group>
                <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><h3>Order status</h3></Form.Label>
              <Form.Control as = "select"
                  name="orderStates"
                  value={updated.orderStates}
                  onChange={handleChange}>
                  Active
                
               <option value="Delivered">Delivered</option>
              <option value="Out_for_Delivery">Out for Delivery</option>
               <option value="Proccess">Proccess</option>
              </Form.Control>
  

            </Form.Group>
           


                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput6"
              >
                <Form.Label>orderDate</Form.Label>
                <Form.Control
                  type="text"
                  name="orderDate"
                  value={updated.orderDate}
                  onChange={handleChange}
                  autoFocus
                />
                </Form.Group>
            </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onUpdate(orderState._id)}>Update</Button>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        

        {
          //-------------------------Display All data -------------------
        }
        

        <td key={orderState._id} style={{ display: "none" }}>
          {" "}
        </td>
       
        <td>{orderState.selectedItem}</td>
        <td>{orderState.selectedItemQty}</td>
        <td>{orderState.totalPrice}</td>
        <td>{orderState.paymentMethod}</td>
        <td>{orderState.orderStates}</td>
        <td>{orderState.orderDate}</td>
    
        <td>
          <button
            style={{backgroundColor:"gray"}}
            type="submit"
            className="submit"
            onClick={() => updateOrders(orderState)}
          >
            <Link className="nav-link" style={{color:"white"}}>Update</Link>
          </button>
        </td>
        <td>
          <button
            style={{backgroundColor:"red", textDecorationColor:"white"}}
            type="submit"
            className="delete"
            onClick={() => onDelete(orderState._id)}
          >
            <Link className="nav-link" style={{color:"white"}}>Delete</Link>
          </button>
        </td>
       

        </tr>


      
   
    
  );
};

export default withRouter(OrderListTableRow);
