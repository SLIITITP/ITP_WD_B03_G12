import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { withRouter } from "./withRouter";
import jwt_decode from "jwt-decode";

const PaymentTableRow = (props) => {
  const token = localStorage.getItem("usertoken");

  console.log(token);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const decoded = jwt_decode(token);
      setUserData({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
      });
      console.log("decoded:", decoded);
    } catch (error) {
      setUserData({ error: "Error decoding token: " + error.message });
    }
  }, [token]);

  const [paymentState] = useState({
    _id: props.obj._id,
    pay_total: props.obj.pay_total,
    pay_cashierName: props.obj.pay_cashierName,
    pay_date: props.obj.pay_date,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updated, setUpdated] = useState({});

  const viewPayment = (paymentState) => {
    console.log(paymentState);
    setUpdated(paymentState);

    handleShow();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdated((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <tr>
      {
        //-------------------------Update form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Payment Date:</Form.Label>
              <Form.Control
                type="text"
                plaintext
                readOnly
                name="service_name"
                value={updated.pay_date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1" >
              <Form.Label>Cashier</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                plaintext
                readOnly
                value={userData.first_name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            </Col>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                name="service_price"
                plaintext
                readOnly
                value={updated.pay_total}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {
        //-------------------------Display All data -------------------
      }

      <td key={paymentState._id} style={{ display: "none" }}>
        {" "}
      </td>
      <td>{paymentState.pay_date}</td>
      <td>{paymentState.pay_total}</td>
      <td>{paymentState.pay_cashierName}</td>
      <td>
        <button
          type="submit"
          className="submit"
          onClick={() => viewPayment(paymentState)}
        >
          <Link className="nav-link">View</Link>
        </button>
      </td>
    </tr>
  );
};

export default withRouter(PaymentTableRow);
