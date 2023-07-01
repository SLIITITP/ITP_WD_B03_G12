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

  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const decoded = jwt_decode(token);
      setUserData({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
      });
    } catch (error) {
      setUserData({ error: "Error decoding token: " + error.message });
    }
  }, [token]);

  const [paymentState] = useState({
    _id: props.obj._id,
    pay_services: props.obj.pay_services,
    pay_total: props.obj.pay_total,
    pay_cashierName: props.obj.pay_cashierName,
    pay_date: props.obj.pay_date,
    pay_owner: props.obj.pay_owner,
    pay_pet: props.obj.pay_pet,
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

  const [serviceData, setServiceData] = useState([]);

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
          <h2 style={{ textAlign: "center" }}>Invoice</h2>
          <Modal.Body>
            <p style={{ float: "right" }}>{updated.pay_date}</p>
            <br />
            <br />

            <p style={{ float: "right" }}>Cashier: {updated.pay_cashierName}</p>
            <br />
            <br />
            <div>
              {updated.pay_services &&
                updated.pay_services.map((service) => (
                  <tr key={service._id}>
                    <td className="col-12">
                      <h4>{service.service_name}</h4>
                    </td>
                    <td className="col-6" style={{ float: "right" }}>
                      <p>{service.service_price}</p>
                    </td>
                  </tr>
                ))}
            </div>
            <hr />
            <br />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Total:</h4>
                <h4>Rs.{updated.pay_total}</h4>
              </div>
            </div>
          </Modal.Body>
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
      <td>{paymentState.pay_owner}</td>
      <td>{paymentState.pay_pet}</td>
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
