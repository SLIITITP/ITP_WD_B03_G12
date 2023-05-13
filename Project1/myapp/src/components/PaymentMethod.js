import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Badge from "react-bootstrap/Badge";




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
 
  
  const currency = "USD";
  return(
      
   
    <div>
      
        <h1 style={{backgroundColor:"gray"}}>Payment Details</h1>
        <Form {...props} >
        <Form.Label></Form.Label>
        
      
        <Form.Label></Form.Label> 
       

        <h1><Badge bg="success">Total Price = Rs.{total2}</Badge></h1> 
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

            <PayPalScriptProvider options={{"client-id": "AehwU_5GcgihtZptoVjRbwsmv4ze5amVpWIQMfw7shanSLa8iIb_GYhADSKUCRIqpjuKFAAIAfBVb9Nn"}}>
        <PayPalButtons
           createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                              currency_code: currency,
                                value: total2,
                                
                            },
                        },
                    ],
                })
           }}

           onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
 

     <Link to={"/placedOrder"} state={{data:total2,data2:data2 , data3:data3, data4:data}}>
      <Button variant="primary" type="submit"  style={{backgroundColor:"darkBlue"}} disabled={!data.paymentMethod}>
          Next
      </Button>
      </Link>
   
    </Form>

    </div>
  );
}


/**/