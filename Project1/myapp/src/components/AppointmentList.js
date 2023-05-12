import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import AppointmentTableRow from "./AppointmentTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import ReactToPrint from 'react-to-print';
import "../components/CSS/listmain.css";
import { AppointmentPrint } from './AppointmentPrint';

function ApplicationList(props) {
  //read hook
  const componentRef = useRef();
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
       <ReactToPrint

documentTitle='Our Employees'

trigger={() => <Button style={{float:'right'}}>Print</Button>}

content={() => componentRef.current} ></ReactToPrint>


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

      <h1 align="center">Application List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            
              
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Make an Appointment</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/appointments" className="nav-link">
                  <p>View Appointments</p>
                </Link>
              </td>
            </tr>
          </table>
        </div>

        {
          //-------------------------Display data from database-------------------
        }
        <AppointmentPrint ref={componentRef}>
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
              <b>Phone</b>
            </td>
            <td>
              <b>Pet Name</b>
            </td>
            <td>
              <b>Species</b>
            </td>
            <td>
              <b>Breed</b>
            </td>
            <td>
              <b>Reason</b>
            </td>
            <td>
              <b>Note</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </AppointmentPrint>
      </div>
    </div>
  );
}

export default withRouter(ApplicationList);
