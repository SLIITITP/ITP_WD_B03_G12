import React, { useState, useEffect } from "react";
import axios from "axios";

import {  Link,} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { withRouter } from "./withRouter";


import "../components/CSS/listmain.css";
import '../components/CSS/shippingForm.css';


function StoreCard() {
  //read hook
  const [item, setItem] = useState([]);

  const [cart, setCart] = useState([]);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
    
    
  }, []); 
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const calculateTotal = () => {
      let totalVal = cart.reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
      }, 0);
      setCartTotal(parseFloat(totalVal).toFixed(2));
    };
     
    calculateTotal(); 
  }, [cart]);
  
   


  const addToCart = (item) => {
    console.log(item) 
    // check if item already exists in cart
    const itemExists = cart.some((cartItem) => cartItem._id === item._id);
    if (itemExists) {
      alert("Item already in cart");
    } else { 
        const newItem = { ...item, quantity: 1 };
        setCart([...cart, newItem]);
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
      updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };
      setCart(updatedCart);
      
    }
  };

  const cartItems = cart.map((item) => (
    <div key={item._id}>
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
            defaultValue={item.name}
            style={{ marginRight: "10px", width: "500px" }}
          />
          <Form.Control
            plaintext
            readOnly
            defaultValue={`Rs.${item.price}`}
            style={{ marginRight: "10px", width: "150px" }}
          />
          <Form.Control
            name="qty"
            type="number"
            className="form-control"
            style={{ marginRight: "10px", width: "70px" }}
            min="1"
            max="10"
            value={item.quantity}
            onChange={(event) => handleQuantityChange(event, item)}></Form.Control>
          <Button onClick={() => removeFromCart(item)}>remove</Button>
        </Form.Group>
      </Form>
    </div> 
  ));

  const removeFromCart = (j) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem._id !== j._id);
    setCart(hardCopy);
    localStorage.setItem("cart", JSON.stringify(hardCopy));
    
  };

  //Bootsrap Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/item/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const cartIcon = () => {
    <tr>h</tr>;
  };

  const tabRow = () => {
    const rows = [];

    for (let i = 0; i < item.length; i += 5) {
      const cols = [];
      for (let j = i; j < i + 5 && j < item.length; j++) {
        cols.push(
          <Col xs={12} sm={6} md={4} lg={3} xl={2} key={item[j]._id}>
            <Card style={{ height: "20em" }}>
              <Card.Img variant="top" src="./img/appLogo.jpg" />
              <Card.Body>
                <Card.Title>
                  <b>{item[j].name.substring(0, 20)}</b>
                </Card.Title>
                <Card.Text>
                  <p>Rs.{item[j].price}</p>
                </Card.Text>
                <Card.Text>
                  <Button
                    type="submit"
                    onClick={() => addToCart(item[j])}
                  >
                    Add to cart
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      }
      rows.push(
        <Row
          key={i}
          className="justify-content-center"
          style={{ marginBottom: "10px", width: "70em", height: "20em" }}
        >
          {cols}
        </Row>
      );
    }

    return rows;
  };

  return (
    
    <tr>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{cartItems}</div>
          <div>
            <h4>
              <b>Total: Rs.{cartTotal}</b>
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Link to={"/proccess"} state={{data: cart, data2: cartTotal}} >
          <Button variant="primary" onClick={handleClose}  >
            Confirm
          </Button>
          </Link>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
      </Modal>
      <div className="cart">
    <span>
            <img
        src="../img/cart.png"
        onClick={handleShow}
        style={{ width: "40px", height: "40px", float: "left" }}
        ></img>
      
      </span>
      <span style={{float: "left"}}>{cart.length}</span>
      </div>

      <div>{tabRow()}</div>
    </tr>
  );
}

export default withRouter(StoreCard);
/*<img
src="../img/cart.png"
onClick={handleShow}
style={{ width: "40px", height: "40px", float: "right" }}
></img>*/

