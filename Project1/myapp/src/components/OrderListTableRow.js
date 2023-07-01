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
    orderDate: props.obj.orderDate.substring(0, 10),
    addressLine1: props.obj.addressLine1,
    addressLine2: props.obj.addressLine2,
    city: props.obj.city,
    postalCode: props.obj.postalCode,
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>paymentMethod:</Form.Label>
              <Form.Control
                as="select"
                name="paymentMethod"
                value={updated.paymentMethod}
                onChange={handleChange}
              >
                <option value="select">Select</option>
                <option value="COD">Cash On dilivery</option>
                <option value="Card">Card payment</option>
              </Form.Control>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>selectedItem</Form.Label>
              <Form.Control
                type="text"
                name="selectedItem"
                value={updated.selectedItem}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Order status</Form.Label>
              <Form.Control
                as="select"
                name="orderStates"
                value={updated.orderStates}
                onChange={handleChange}
              >
                Active
                <option value="select">Select</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Placed">Placed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>orderDate</Form.Label>
              <Form.Control
                type="date"
                name="orderDate"
                value={updated.orderDate}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>AddressLine_1</Form.Label>
              <Form.Control
                type="text"
                placeholder="addressLine1"
                value={updated.addressLine1}
                name="addressLine1"
                onChange={handleChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>AddressLine_2</Form.Label>
              <Form.Control
                type="text"
                placeholder="addressLine2"
                value={updated.addressLine2}
                name="addressLine2"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>

              <Form.Control
                as="select"
                name="city"
                value={updated.city}
                onChange={handleChange}
              >
                <option value="select">select</option>
                <option value="Colombo">Ampara</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Sri Jayawardenepura Kotte">
                  Sri Jayawardenepura Kotte
                </option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Dehiwala-Mount Lavinia">
                  Dehiwala-Mount Lavinia
                </option>
                <option value="Kalmunai">Kalmunai</option>
                <option value="Negombo">Negombo</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Dambulla">Dambulla</option>
                <option value="Katunayake">Katunayake</option>
                <option value="Kolonnawa">Kolonnawa</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Badulla">Badulla</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Point Pedro">Point Pedro</option>
                <option value="Maharagama">Maharagama</option>
                <option value="Eravur">Eravur</option>
                <option value="Valvettithurai">Valvettithurai</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Chilaw">Chilaw</option>
                <option value="Bentota">Bentota</option>
                <option value="Tangalle">Tangalle</option>
                <option value="Beruwala">Beruwala</option>
                <option value="Weligama">Weligama</option>
                <option value="Kuliyapitiya">Kuliyapitiya</option>
                <option value="Haputale">Haputale</option>
                <option value="Hatton">Hatton</option>
                <option value="Gampola">Gampola</option>
                <option value="Colombo">Colombo</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Peliyagoda">Peliyagoda</option>
                <option value="Mannar">Mannar</option>
                <option value="Ambalangoda">Ambalangoda</option>
                <option value="Hikkaduwa">Hikkaduwa</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Wattegama">Wattegama</option>
                <option value="Kadugannawa">Kadugannawa</option>
                <option value="Chavakachcheri">Chavakachcheri</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Kattankudy">Kattankudy</option>
                <option value="Kilinochchi">Kilinochchi</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>PostalCode</Form.Label>
              <Form.Control
                type="text "
                placeholder="postalCode"
                value={updated.postalCode}
                name="postalCode"
                onChange={handleChange}
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
      <td  style={{ textAlign: "center" }}>{orderState.paymentMethod}</td>
      <td  style={{ textAlign: "center" }}>{orderState.orderStates}</td>
      <td>{orderState.orderDate}</td>

      <td>
        <button
          type="submit"
          className="submit"
          onClick={() => updateOrders(orderState)}
        >
          <Link className="nav-link">Update</Link>
        </button>
      </td>
      <td>
        <button
          type="submit"
          className="delete"
          onClick={() => onDelete(orderState._id)}
        >
          <Link className="nav-link">Delete</Link>
        </button>
      </td>
    </tr>
  );
};

export default withRouter(OrderListTableRow);
{
  /* <Form.Control
type="text"
name="paymentMethod"
value={updated.paymentMethod}
onChange={handleChange}
autoFocus
/> */
}
