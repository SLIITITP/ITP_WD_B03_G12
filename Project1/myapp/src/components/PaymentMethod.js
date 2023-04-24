import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";




export default function(props){
    const location = useLocation();
    console.log(props,"props");
    console.log(location, "use location hook");
    const total2 = location.state?.data;
    const data2 = location.state?.data2;
    const data3 = location.state?.data3;
   
    
   
  
    const [data , setData] = useState({
       

        paymentMethod: "",
        cardNumber: "",
        validThru: "",
        cvc: "",
    });


  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/onlinePayment/add`, data)
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
      
        <h1 style={{backgroundColor:"gray"}}>Payment Details</h1>
        <Form {...props}>
        <Form.Label></Form.Label>
        
      
        <Form.Label></Form.Label>
       

       
        <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>PaymentMethod:</Form.Label>
              <Form.Control as = "select"
                  name="paymentMethod"
                  value={data.paymentMethod}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="Cash_On_dilivery">Cash On dilivery</option>
               <option value="Card_payment">Card payment</option>
              </Form.Control>
  

            </Form.Group>

       
 
     

            <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Card Number</Form.Label>
      <Form.Control type="text" placeholder="cardNumber" 
            value={data.cardNumber}
          name="cardNumber"
          onChange={handleChange} />
      </Form.Group>

     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>validThru</Form.Label>
        <Form.Control type="text" placeholder="MONTH / YEAR" value={data.validThru}
             name="validThru"
             onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>cvc</Form.Label>
        <Form.Control type="text" placeholder="cvc"
             value={data.cvc}
             name="cvc"
             onChange={handleChange}
        />
        <Form.Text className="text-muted">
      
        </Form.Text>
      </Form.Group>
      
     <Link to={"/placedOrder"} state={{data:total2,data2:data2 , data3:data3, data4:data}}>
      <Button variant="primary" type="submit" style={{backgroundColor:"darkBlue"}}>
          Next
      </Button>
      </Link>
   
    </Form>

    </div>
  );
}


/**/