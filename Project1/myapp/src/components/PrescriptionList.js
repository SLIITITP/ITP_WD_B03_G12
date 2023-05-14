import React, { useState, useEffect } from "react";
import axios from "axios";
import PrescriptionTableRow from "./PrescriptionTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";

function PrescriptionList(props) {
  //read hook
  const [prescription, setPrescription] = useState([]);

  //insert hook
  const [data, setData] = useState({
    DoctorID: "",
    PetID: "",
    PetName: "",
    Illness: "",
    Medicine: "",
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
      .get("http://localhost:5000/prescription/")
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return prescription.map((object, i) => {
      return <PrescriptionTableRow obj={object} key={i} />;
    });
  };

  //taking count 
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/prescription/get/count")
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
      .post(`http://localhost:5000/prescription/add`, data)
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
            Add New Prescription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> DoctorID:</Form.Label>
              <Form.Control
                type="text"
                name="DoctorID"
                value={data.DoctorID}
                placeholder="Enter New  DoctorID"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> PetID</Form.Label>
              <Form.Control
                type="text"
                name="PetID"
                value={data.PetID}
                placeholder="Enter  PetID"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> PetName:</Form.Label>
              <Form.Control
                type="text"
                name="PetName"
                value={data.PetName}
                placeholder="Enter New  PetName"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
              
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Illness</Form.Label>
              <Form.Control
                type="text"
                name="Illness"
                value={data.Illness}
                placeholder="Enter Illness"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Medicine</Form.Label>
              <Form.Control
                type="text"
                name="Medicine"
                value={data.Medicine}
                placeholder="Enter Medicine"
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

      <h1 align="center">Prescription List </h1>
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
                  <p>Add prescription</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/prescriptions" className="nav-link">
                  <p>View all Prescriptions</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link className="nav-link">
                  <p>Add Vaccine</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/vaccines" className="nav-link">
                  <p>View all Vaccinces</p>
                </Link>
              </td>
            </tr>
          </table>
        </div>

        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>DoctorID</b>
            </td>
            <td>
              <b>PetID</b>
            </td>
            <td>
              <b>PetName</b>
            </td>
            <td>
              <b>Illness</b>
            </td>
            <td>
              <b>Medicine</b>
            </td>
            <td>
              <b>Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(PrescriptionList);
