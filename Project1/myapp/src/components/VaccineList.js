import React, { useState, useEffect } from "react";
import axios from "axios";
import VaccineTableRow from "./VaccineTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";

function VaccineList(props) {
  //read hook
  const [vaccine, setVaccine] = useState([]);

  //insert hook
  const [data, setData] = useState({
    vaccination_Name: "",
    vaccine_Description: "",
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
      .get("http://localhost:5000/vaccine/")
      .then((response) => {
        setVaccine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return vaccine.map((object, i) => {
      return <VaccineTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/vaccine/get/count")
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
      .post(`http://localhost:5000/vaccine/add`, data)
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
            Add New Vaccine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vaccination Name:</Form.Label>
              <Form.Control
                type="text"
                name="vaccination_Name"
                value={data.vaccination_name}
                placeholder="Enter New vaccination name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Vaccine Description</Form.Label>
              <Form.Control
                type="text"
                name="vaccine_Description"
                value={data.vaccine_Description}
                placeholder="Enter vaccine Description"
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

      <h1 align="center">Vaccine List</h1>
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
                <Link to="/invoiceViewAll" className="nav-link">
                  <p>Add prescription</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p> View all Prescriptions</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/services" className="nav-link">
                  <p>Add Medical Records</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/services" className="nav-link">
                  <p>View all Medical Records</p>
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
              <b>Vaccination Name</b>
            </td>
            <td>
              <b>Vaccine Description</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(VaccineList);
