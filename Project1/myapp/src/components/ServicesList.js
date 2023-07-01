import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ServicesTableRow from "./ServicesTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import { Alert } from "react-bootstrap";

function ServicesList(props) {
  //Form validation
  const [errors, setErrors] = useState({});
  //read hook
  const [service, setService] = useState([]);

//Validations
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate name field
    if (data.service_name.trim() === "") {
      newErrors.service_name = "Service Name is required";
      isValid = false;
    }
  
    if (data.service_price.trim() === "") {
      newErrors.service_price = "Price is required";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  //insert hook
  const [data, setData] = useState({
    service_name: "",
    service_price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the service price
    if (name === "service_price" && !/^\d*\.?\d{0,2}$/.test(value)) {
      // Price validation failed
      return;
    }

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
      .get("http://localhost:5000/service/")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return service.map((object, i) => {
      return <ServicesTableRow obj={object} key={i} />;
    });
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


  const [validated, setValidated] = useState(false)
   
  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
  
   

    if  (validateForm()) {
      axios
        .post(`http://localhost:5000/service/add`, data)
        .then((res) => {
          alert(`Added Successfully`);
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
  };
  
  



  return (
    <div>
      <button className="material-icons floating-btn" onClick={handleShow}>add</button>

      <Link to="/servicePreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>

      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }
      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Service Name:</Form.Label>
              <Form.Control
                type="text"
                name="service_name"
                value={data.service_name}
                placeholder="Enter New service"
                onChange={handleChange}
                autoFocus
              />
              {errors.service_name && <Alert variant="danger">{errors.service_name}</Alert>}

               <Form.Control.Feedback type="invalid">
              Please choose a service name.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Service Price</Form.Label>
              <Form.Control
                type="text"
                name="service_price"
                value={data.service_price}
                placeholder="Enter service Price"
                onChange={handleChange}
                autoFocus
              />
              {errors.service_price && <Alert variant="danger">{errors.service_price}</Alert>}
               <Form.Control.Feedback type="invalid">
              Please enter a price.
            </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Service List</h1>
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

        <table className="table table-striped" >
          <tr  class="table-header" style={{ textAlign: "center" }}>
            <td>
              <b>Service Name</b>
            </td>
            <td>
              <b>Service Price</b>
            </td>
            <td></td> 
            <td></td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(ServicesList);
