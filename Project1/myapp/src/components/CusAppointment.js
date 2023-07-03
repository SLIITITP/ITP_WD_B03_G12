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
    name: "",
    email: "",
    phone: "",
    petName: "",
    Species: "",
    Breed: "",
    Reason: "",
    note: "",
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
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Appiontment
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
                type="text"
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
      <br />
      <br />
      <p>
        Turpis cursus in hac habitasse platea dictumst. Sed cras ornare arcu
        dui. Venenatis tellus in metus vulputate eu. Enim praesent elementum
        facilisis leo vel fringilla est ullamcorper. Auctor urna nunc id cursus
        metus aliquam eleifend mi in. Cras sed felis eget velit. Nisl
        condimentum id venenatis a condimentum vitae. Eu volutpat odio facilisis
        mauris sit amet massa. Venenatis a condimentum vitae sapien pellentesque
        habitant. Netus et malesuada fames ac turpis egestas integer eget. At
        erat pellentesque adipiscing commodo. Lacinia quis vel eros donec ac
        odio. Est pellentesque elit ullamcorper dignissim cras tincidunt
        lobortis feugiat vivamus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
        hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam nisl,
        tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla
        posuere. Donec vitae dolor Nullam tristique diam non turpis Cras
        placerat accumsan nulla Nullam rutrum Nam vestibulum accumsan nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <button className="print-btn">
        <Link onClick={handleShow} className="nav-link">
          <p style={{ color: "white" }}>Place an Appointment</p>
        </Link>
      </button>
    </div>
  );
}

export default withRouter(CusAppointment);
