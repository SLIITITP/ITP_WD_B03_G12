import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import PaymentTableRow from "./PaymentTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter"; 
import ReactToPrint from 'react-to-print'; 
import "../components/CSS/listmain.css";
import jwt_decode from "jwt-decode";

import { ServicePrint } from "./ServicePrint";

function PaymentList(props) {
 
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

  
  //read hook
  const [payment, setPayment] = useState([]);

  //insert hook
  const [data, setData] = useState({
    _id: "",
    pay_total: "",
    pay_cashierName: "",
    pay_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Bootsrap Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/payments/")
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return payment.map((object, i) => {
      return <PaymentTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/payments/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/payments/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => { 
        console.log(err);
      });
  };
  const componentRef = useRef(); 
 
  return (
    <div>
      
      <ReactToPrint
      documentTitle='Our Services' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
     
    
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }
      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total:</Form.Label>
              <Form.Control
                type="text"
                name="pay_total"
                value={data.pay_total}
                placeholder="Total"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cashier</Form.Label>
              <Form.Control
              plaintext
              readOnly
                type="text"
                name="pay_cashierName"
                value={userData.first_name}
                placeholder="Enter cashier Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Payment List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Issue Invoice</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/payments" className="nav-link">
                  <p>View all Invoices</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link className="nav-link">
                  <p>Add a Service</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/services" className="nav-link">
                  <p>View Services</p>
                </Link>
              </td>
            </tr>
          </table>
        </div>

        {
          //-------------------------Display data from database-------------------
        }
        <ServicePrint ref={componentRef}>
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>Payment Date</b>
            </td>
            <td>
              <b>Total</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </ServicePrint>
      </div>
      

    </div>
  );
};

export default withRouter(PaymentList);
