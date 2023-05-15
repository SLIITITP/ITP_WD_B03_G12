import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentTableRow from "./AppointmentTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";

function CusAppointment(props) {
  //read hook
  const [application, setApplication] = useState([]);

  //insert hook
  const [data, setData] = useState({
    name:"",
    email:"",
    phone:"",
    petName:"",
    Species:"",
    Breed:"",
    Reason:"",
    note:"",     
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
      .get("http://localhost:5000/appointments/")
      .then((response) => {
        setApplication(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return application.map((object, i) => {
      return <AppointmentTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments/get/count")
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
      .post(`http://localhost:5000/appointments/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add  New Appiontment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                placeholder="Full Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter Email"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Phone number:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={data.phone}
                placeholder="Mobile Number"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Pet's Name:</Form.Label>
              <Form.Control
                type="text"
                name="petName"
                value={data.petName}
                placeholder="Pet's Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Species:</Form.Label>
              <Form.Control
                type="text"
                name="Species"
                value={data.Species}
                placeholder="Cat"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Breed:</Form.Label>
              <Form.Control
                type="text"
                name="Breed"
                value={data.Breed}
                placeholder="Breed"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Reasons:</Form.Label>
              <Form.Control
                type="text"
                name="Reason"
                value={data.Reason}
                placeholder="Reason(s) to make appointment"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Note:</Form.Label>
              <Form.Control
                type="text"
                name="note"
                value={data.note}
                placeholder="Note"
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

      

      {
        //-------------------------Side Menue Buttons-------------------
      }

    <Link onClick={handleShow} className="nav-link">
                  <button style={{marginTop:"40px",marginLeft:"450px",paddingLeft:"30px",paddingRight:"30px",paddingTop:"20px",paddingBottom:"20px",backgroundColor:"rgb(193, 71, 91)",borderRadius:"10px"}}>Make an Appointment</button>
                </Link>
    </div>
  );
}

export default withRouter(CusAppointment);
