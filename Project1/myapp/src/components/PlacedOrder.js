import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/esm/Table";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";




export default function(props){
    const location = useLocation();
    console.log(props,"props");
    console.log(location, "use location hook");
    const total2 = location.state?.data;
    const fs = location.state?.data2;
    const data3 = location.state?.data3;
    const data4 = location.state?.data4;
 
    const ffff = fs.map((item)=> {
        return  item.name });
        const cccc = fs.map((item)=> {
          return  item.quantity });
            
          const yy = fs.map((item)=> {
            return  ' / '+item.name });
            const uu = fs.map((item)=> {
              return  ' / '+item.quantity});
      
    
    
    const [delivery, setDelivery] = useState([]);
  
    const [data , setData] = useState({
       
        totalPrice:total2,
        paymentMethod: data4.paymentMethod,
        cardNumber:data4.cardNumber,
        validThru: data4.validThru,
        cvc: data4.cvc,
    });

    const [data2 , setData2] = useState({
        addressLine1:data3.addressLine1,
        addressLine2:data3.addressLine2,
        city:data3.city,
        postalCode:data3.postalCode,
       
    });

    const [data6 , setData6] = useState({
       
        orderStates:data.orderStates,
       
        selectedItem: ffff+' ',
        selectedItemQty: cccc+' ',
        orderDate:data.orderDate,
    });

    const [data7 , setData7] = useState({
       
        orderStates:data.orderStates,
        paymentMethod: data4.paymentMethod,
        selectedItem: ffff+' ',
        selectedItemQty: cccc+' ',
        totalPrice:total2,
        orderDate:data.orderDate,
    });
   
   


  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setData2((prev) => ({
        ...prev,
        [name]: value,
      }));
      setData6((prev) => ({
        ...prev,
        [name]: value,
      }));
      setData7((prev) => ({
        ...prev,
        [name]: value,
      }));
    };




    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    axios.all([
        axios.post(`http://localhost:5000/onlinePayment/add`, data),
        axios.post(`http://localhost:5000/delivery/add`, data2),
        axios.post(`http://localhost:5000/order/add`, data6),
        axios.post(`http://localhost:5000/adminOrder/add`, data7),

    ])
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  



  
    
  return(
      
   
    <div>
      
      <h1 style={{backgroundColor:"gray"}}>Placed Order</h1>
        <Form {...props}>
        <Form.Label></Form.Label>
        
        
        <Form.Label></Form.Label>
       
        <h1><Badge bg="success">Total Price = Rs.{total2}</Badge></h1> 

        <ListGroup>
        <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Item</th>
          <th>quantity</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{yy}</td>
          <td>{uu}</td>
       
        </tr>
        

      </tbody>
     
    </Table>
    <Link to="/store"> 
    <Button variant="link" >Edit</Button>
    </Link>
    </ListGroup>
   
    <h2>Shipping Address</h2>
    <ListGroup>
      
      <ListGroup.Item variant="primary">AddressLine1 = {data3.addressLine1}</ListGroup.Item>
      <ListGroup.Item variant="secondary">AddressLine2 = {data3.addressLine2}</ListGroup.Item>
      <ListGroup.Item variant="success">City = {data3.city}</ListGroup.Item>
      <ListGroup.Item variant="info">PostalCode = {data3.postalCode}</ListGroup.Item>
     
      
    </ListGroup>
   

        <h2>Payment Details</h2>
    <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
      
          <div className="fw-bold">Payment Method</div>
       
 
        <Badge bg="primary" pill style={{color:"white"}}>
          {data4.paymentMethod}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
    
          <div className="fw-bold">Card Number</div>
   
        <Badge bg="primary" pill style={{color:"white"}}>
        {data4.cardNumber}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
      
          <div className="fw-bold">validThru</div>
      
        <Badge bg="primary" pill style={{color:"white"}}> 
        {data4.validThru}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
      
          <div className="fw-bold">CVC</div>
      
        <Badge bg="primary" pill style={{color:"white"}}>
        {data4.cvc}
        </Badge>
      </ListGroup.Item>
      
    </ListGroup>

       
        <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><h3>Order status</h3></Form.Label>
              <Form.Control as = "select"
                  name="orderStates"
                  value={data.orderStates}
                  onChange={handleChange}>
                  Active
                
               <option value="Delivered">Delivered</option>
              <option value="Out_for_Delivery">Out for Delivery</option>
               <option value="Proccess">Proccess</option>
              </Form.Control>
  

            </Form.Group>
           

            <Button  type="submit" style={{backgroundColor:"darkBlue", textDecorationColor:"white"}} onClick={handleClick}>
              
             Pleced Order
    
            </Button>
 
      
     <Link to="/orderList">
      <Button variant="info" type="submit"  >
        OrderList
      </Button>
      </Link>
   
    </Form>
    

    </div>
  );
}
