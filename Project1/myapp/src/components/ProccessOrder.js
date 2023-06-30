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
      
        <h1 style={{backgroundColor:"gray"}}>Shipping address</h1>
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
        
                <Form.Control as = "select"
                  name="city"
                  value={data.city}
                  onChange={handleChange}>
              <option value="select">select</option>
              <option value="Colombo">Ampara</option>
               <option value="Kandy">Kandy</option>
               <option value="Galle">Galle</option>
               <option value="Sri Jayawardenepura Kotte">Sri Jayawardenepura Kotte</option>
               <option value="Trincomalee">Trincomalee</option>
               <option value="Anuradhapura">Anuradhapura</option>
               <option value="Jaffna">Jaffna</option>
               <option value="Dehiwala-Mount Lavinia">Dehiwala-Mount Lavinia</option>
               <option value="Kalmunai">Kalmunai</option>
               <option value="Negombo">Negombo</option>
               <option value="Batticaloa">Batticaloa</option>
               <option value="Ratnapura">Ratnapura</option>
               <option value="Vavuniya">Vavuniya</option>
               <option value="Nuwara Eliya">Nuwara Eliya</option>
               <option value="Dambulla">Dambulla</option>
               <option value="Katunayake">Katunayake</option>
               <option value="Kolonnawa">Kolonnawa</option>
                <option value="Matale">Matale</option>
               <option value="Matara">Matara</option>
               <option value="Badulla">Badulla</option>
               <option value="Polonnaruwa">Polonnaruwa</option>
               <option value="Kalutara">Kalutara</option>
               <option value="Kurunegala">Kurunegala</option>
               <option value="Point Pedro">Point Pedro</option>
               <option value="Maharagama">Maharagama</option>
               <option value="Eravur">Eravur</option>
               <option value="Valvettithurai">Valvettithurai</option>
               <option value="Gampaha">Gampaha</option>
               <option value="Puttalam">Puttalam</option>
               <option value="Chilaw">Chilaw</option>
               <option value="Bentota">Bentota</option>
               <option value="Tangalle">Tangalle</option>
               <option value="Beruwala">Beruwala</option>
               <option value="Weligama">Weligama</option>
                <option value="Kuliyapitiya">Kuliyapitiya</option>
               <option value="Haputale">Haputale</option>
               <option value="Hatton">Hatton</option>
               <option value="Gampola">Gampola</option>
               <option value="Colombo">Colombo</option>
               <option value="Hambantota">Hambantota</option>
               <option value="Peliyagoda">Peliyagoda</option>
               <option value="Mannar">Mannar</option>
               <option value="Ambalangoda">Ambalangoda</option>
               <option value="Hikkaduwa">Hikkaduwa</option>
               <option value="Kegalle">Kegalle</option>
               <option value="Wattegama">Wattegama</option>
               <option value="Kadugannawa">Kadugannawa</option>
               <option value="Chavakachcheri">Chavakachcheri</option>
               <option value="Monaragala">Monaragala</option>
               <option value="Kattankudy">Kattankudy</option>
               <option value="Kilinochchi">Kilinochchi</option>
              </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PostalCode</Form.Label>
        <Form.Control type="text " placeholder="postalCode" 
              value={data.postalCode}
             name="postalCode"
             onChange={handleChange}/>
      </Form.Group>
      <Link to={"/payee"} state={{data:total2 , data2:total , data3 : data}}>
      <Button variant="primary" type="submit" style={{backgroundColor:"darkBlue"}}>
        Next
      </Button>
      </Link>
    </Form>

    </div>
  );
}
export default withRouter(ProccessOrder);


/**/