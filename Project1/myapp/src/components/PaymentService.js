import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ServicesTableRow from "./ServicesTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import Col from "react-bootstrap/Col";
import jwt_decode from "jwt-decode";
import ReactToPrint from "react-to-print";
import { BillPrint } from "./BillPrint";
import PrintHeader from "./PrintHeader";
import "../components/CSS/listmain.css";

function PaymentService(props) {
  const componentRef = useRef();

  //current date
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  //current time
  const intervalRef = useRef(null); // Ref to store the interval

  // current time
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString();
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);


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
  const [service, setService] = useState([]);

  //insert hook
  const [data, setData] = useState({
    service_name: "",
    service_price: "",
  });

  //Bootsrap Cart Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Bootsrap Bill Modal configurations

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShowModal(true);
    clearInterval(intervalRef.current); // Stop the time interval
  };  

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/service/")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return service.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.service_name}</td>
        <td>{object.service_price}</td>
        <td>
          <Button type="submit" onClick={() => addToBill(object)}>
            Add to Bill
          </Button>
        </td>
      </tr>
    ));
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //cart
  const [cart, setCart] = useState([]);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const calculateTotal = () => {
      let totalVal = cart.reduce((total, item) => {
        return total + parseFloat(item.service_price) * item.quantity;
      }, 0);
      setCartTotal(parseFloat(totalVal).toFixed(2));
    };

    calculateTotal();
  }, [cart]);

  const addToBill = (service) => {
    console.log(service);

    const serviceExists = cart.some((cartItem) => cartItem._id === service._id);
    if (serviceExists) {
      alert("Item already in cart");
    } else {
      const newService = { ...service, quantity: 1 };
      setCart([...cart, newService]);
      alert("Item Added Successfully");
    }
  };

  const handleQuantityChange = (event, item) => {
    const newQuantity = parseInt(event.target.value);
    const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (newQuantity < 1 || newQuantity > 10) {
      alert("Quantity must be between 1 and 10");
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: newQuantity,
      };
      setCart(updatedCart);
    }
  };

  const cartItems = cart.map((service) => (
    <div key={service._id}>
      <Form>
        <Form.Group
          as={Col}
          className="mb-4"
          controlId="formPlaintext"
          style={{ display: "flex" }}
        >
          <Form.Control
            plaintext
            readOnly
            defaultValue={service.service_name}
            style={{ marginRight: "10px", width: "500px" }}
          />
          <Form.Control
            plaintext
            readOnly
            defaultValue={`Rs.${service.service_price}`}
            style={{ marginRight: "10px", width: "150px" }}
          />
          <Form.Control
            name="qty"
            type="number"
            className="form-control"
            style={{ marginRight: "10px", width: "70px" }}
            min="1"
            max="10"
            value={service.quantity}
            onChange={(event) => handleQuantityChange(event, service)}
          ></Form.Control>
          <Button
            onClick={() => removeFromCart(service)}
            style={{ backgroundColor: "red" }}
          >
            remove
          </Button>
        </Form.Group>
      </Form>
    </div>
  ));

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const finalBill = () => {
    const newData = {
      pay_services: cart, // Assign the 'cart' array to the 'service' property
      pay_cashierName: userData.first_name,
      pay_total: cartTotal,
    };
    console.log(newData);
    axios
      .post(`http://localhost:5000/payments/add`, newData)
      .then((res) => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });

    handleShowModal();
  };

  return (
    <div>
      <Link to="/servicePreview" className="nav-link">
        <Button style={{ float: "right" }}>Print Preview</Button>
      </Link>

      {
        //-------------------------cart bootstrap Modal-------------------
      }
      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ float: "right" }}>Cashier: {userData.first_name}</div>
          <br />
          <div>{cartItems}</div>
          <div>
            <h4>
              <b>Total: Rs.{cartTotal}</b>
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link state={{ data: cart, data2: cartTotal }}>
            <Button
              variant="primary"
              onClick={finalBill}
              style={{ backgroundColor: "darkgoldenrod" }}
            >
              Confirm
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {
        //-------------------------Bill bootstrap Modal-------------------
      }
      <Modal
        {...props}
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <BillPrint ref={componentRef}>
          <PrintHeader />
          <h2 style={{textAlign: "center"}}>Invoice</h2>
          <Modal.Body> 
            <p style={{ float: "right" }}>{formattedDate}</p>
            <br />
            <br />
            <p style={{ float: "right" }}>{currentTime}</p> 
            <br />
            <br />
            <p style={{ float: "right" }}>Cashier: {userData.first_name}</p>
            <br />
            <br />
            <div>
              {cart.map((item) => (
                <div key={item._id}>
                  <span style={{ width: "15em", height:"3em", display: "inline-block" }}>
                    {item.service_name}
                  </span>{" "}
                  :{" "}
                  <span style={{ width: "5em", display: "inline-block" }}>
                    Rs. {item.service_price}
                  </span>
                </div>
              ))}
            </div>
            <hr />
            <br />
            <div>
              <h4>
                <b>Total: Rs.{cartTotal}</b>
              </h4>
            </div>
          </Modal.Body>
        </BillPrint>
        <Modal.Footer>
          <ReactToPrint
            documentTitle="Our Services"
            trigger={() => (
              <Button style={{ float: "right" }} onClick={handleCloseModal}>
                Print
              </Button>
            )}
            content={() => componentRef.current}
          ></ReactToPrint>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Service List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>
      <div className="cart">
        <span>
          <img
            src="../img/cart.png"
            onClick={handleShow}
            style={{ width: "40px", height: "40px", float: "left" }}
          ></img>
        </span>
        <span style={{ float: "left" }}>{cart.length}</span>
      </div>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            <tr>
              <td>
                <Link to="/invoiceAdd" className="nav-link">
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
                <Link onClick={handleShow} className="nav-link">
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

        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>Service Name</b>
            </td>
            <td>
              <b>Service Price</b>
            </td>
          </tr>

          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(PaymentService);
