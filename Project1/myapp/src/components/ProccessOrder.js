import React, { useState} from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "./withRouter";


import '../components/CSS/shippingForm.css';

function ProccessOrder(props){

    const location = useLocation();
    console.log(props,"props");
    console.log(location, "use location hook");
    const total = location.state?.data;
    const total2 = location.state?.data2;
    

    
    const [data , setData] = useState({
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
    });


  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    const [setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/delivery/add`, data)
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
      
        <h1>Shipping address</h1>
        <Form {...props}>
        <Form.Label></Form.Label>
        
      
        <Form.Label></Form.Label>
        
        
 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>AddressLine_1</Form.Label>
        <Form.Control type="text" placeholder="addressLine1"
             value={data.addressLine1}
             name="addressLine1"
             onChange={handleChange}
        />
        <Form.Text className="text-muted">
      
        </Form.Text>
      </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>AddressLine_2</Form.Label>
      <Form.Control type="text" placeholder="addressLine2" 
            value={data.addressLine2}
          name="addressLine2"
          onChange={handleChange} />
      </Form.Group>

     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="city" value={data.city}
             name="city"
             onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PostalCode</Form.Label>
        <Form.Control type="text " placeholder="postalCode" 
              value={data.postalCode}
             name="postalCode"
             onChange={handleChange}/>
      </Form.Group>
      <Link to={"/payee"} state={{data:total2 , data2:total , data3 : data}}>
      <Button variant="primary" type="submit" >
        Next
      </Button>
      </Link>
    </Form>

    </div>
  );
}
export default withRouter(ProccessOrder);


/**/