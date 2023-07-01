import React, { useState, useEffect } from "react";
import axios from "axios";
import InPatientTableRow from "./InPatientTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";

function InPatient(props) {
  //read hook

  const [inpatient, setInPatient] = useState([]);
  //insert hook

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    contact_no: "",
    weight: "",
    diagnosis: "",
    shelter_type: "",
    special_notes: "",
    shelter_no: "",
    status: "Admitted",
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

  // get data from DB

  useEffect(() => {
    axios
      .get("http://localhost:5000/inpatient/")
      .then((response) => {
        setInPatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return inpatient.map((object, i) => {
      return <InPatientTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inpatient/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // send new data to database

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/admissionPreview" className="nav-link">
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
            Admission Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={data.first_name}
                placeholder="Enter First Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={data.last_name}
                placeholder="Enter Last Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact No:</Form.Label>
              <Form.Control
                type="text"
                name="contact_no"
                value={data.contact_no}
                placeholder="Enter Contact No"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Weight:</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={data.weight}
                placeholder="Enter Animal Weight"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Diagnosis:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="diagnosis"
                value={data.diagnosis}
                placeholder="Enter Diagnosis"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Shelter Type</Form.Label>
              <Form.Control
                as="select"
                name="shelter_type"
                value={data.jobrole}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Special Notes:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="special_notes"
                value={data.special_notes}
                placeholder="Enter Special Notes"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Shelter No:</Form.Label>
              <Form.Control
                type="text"
                name="shelter_no"
                value={data.shelter_no}
                placeholder="Enter Shelter No"
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

      <h1 align="center">inpatient List</h1>
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

        <table className="table table-striped">
          <tr class="table-header" style={{ textAlign: "center" }}>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>

            <td>
              <b>Contact No</b>
            </td>

            <td>
              <b>Weight</b>
            </td>

            <td>
              <b>Diagnosis</b>
            </td>

            <td>
              <b>Shelter Type</b>
            </td>

            <td>
              <b>Special Notes</b>
            </td>

            <td>
              <b>Shelter No</b>
            </td>
            <td></td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default withRouter(InPatient);
