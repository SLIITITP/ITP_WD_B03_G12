import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PrescriptionTableRow from "./PrescriptionTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import ReactToPrint from "react-to-print";
import { Alert } from "react-bootstrap";

import { PrescriptionPrint } from "./PrescriptionPrint";

import "../components/CSS/listmain.css";

function PrescriptionList(props) {
  const componentRef = useRef();
  //Form validation
  const [errors, setErrors] = useState({});
  //read hook
  const [prescription, setPrescription] = useState([]);

  //Validations
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name field
    if (data.DoctorID.trim() === "") {
      newErrors.DoctorID = "Doctor Name is required";
      isValid = false;
    }

    if (data.PetID.trim() === "") {
      newErrors.PetID = "Ped Id is required";
      isValid = false;
    }
    if (data.PetName.trim() === "") {
      newErrors.PetName = "Pet Name is required";
      isValid = false;
    }
    if (data.Illness.trim() === "") {
      newErrors.Illness = "Illness is required";
      isValid = false;
    }
    if (data.Medicine.trim() === "") {
      newErrors.Medicine = "Medicine is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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

    if (validateForm()) {
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
    }
  };

  return (
    <div>
      <button className="material-icons floating-btn" onClick={handleShow}>
        add
      </button>

      <Link to="/prescriptionListPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>
          Print Preview
        </Button>
      </Link>
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
              {errors.DoctorID && (
                <Alert variant="danger">{errors.DoctorID}</Alert>
              )}
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
              {errors.PetID && <Alert variant="danger">{errors.PetID}</Alert>}
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
              {errors.PetName && (
                <Alert variant="danger">{errors.PetName}</Alert>
              )}
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
              {errors.Illness && (
                <Alert variant="danger">{errors.Illness}</Alert>
              )}
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
              {errors.Medicine && (
                <Alert variant="danger">{errors.Medicine}</Alert>
              )}
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

        {
          //-------------------------Display data from database-------------------
        }
        <PrescriptionPrint ref={componentRef}>
          <table className="table table-striped" >
            <tr  class="table-header" style={{ textAlign: "center" }}>
              <td>
                <b>Doctor Name</b> 
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
              <td></td>
              <td></td>
            </tr>
            <tbody>{tabRow()}</tbody>
          </table>
        </PrescriptionPrint>
      </div>
    </div>
  );
}

export default withRouter(PrescriptionList);
