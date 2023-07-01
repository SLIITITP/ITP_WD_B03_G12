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



function PaymentList(props) {
 
  //taking user
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
        console.log("decoded:", decoded);
      } catch (error) {
        setUserData({ error: "Error decoding token: " + error.message });
      }
    }, [token]);

  
  //read hook
  const [payment, setPayment] = useState([]);

  //insert hook
  const [data, setData] = useState({
    pay_total: "",
    pay_cashierName: "",
  
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
    const newData = {
      ...data,
      pay_cashierName: userData.first_name,
    };
    console.log(newData);
    axios
      .post(`http://localhost:5000/payments/add`, newData)
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
 <Link to="/payservice" className="material-icons floating-btn">
      add
    </Link>
       
      <ReactToPrint
      documentTitle='Our Services' 
      trigger={() => <Button className="print-btn"  style={{float:'right'}}>Print</Button>}
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
                value={data.pay_cashierName}
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
        

        {
          //-------------------------Display data from database-------------------
        }
       
        <table className="table table-striped">
          <tr  class="table-header" style={{ textAlign: "center" }}>
            <td>
              <b>Payment Date</b>
            </td>
            <td>
              <b>Total</b>
            </td>
            <td>
              <b>Cashier</b>
            </td>
            <td>
              <b>Pet Owner</b>
            </td>
            <td>
              <b>Pet</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
    
      </div>
      

    </div>
  );
};

export default withRouter(PaymentList);
