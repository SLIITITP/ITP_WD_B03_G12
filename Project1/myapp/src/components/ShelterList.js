import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ShelterTableRow from "./ShelterTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import { Alert } from "react-bootstrap";

function ShelterList(props) {
  //Form validation
  const [errors, setErrors] = useState({});

  //read hook

  const [shelter, setShelter] = useState([]);

  //Validations
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name field
    if (data.shelter_id.trim() === "") {
      newErrors.shelter_id = "Shelter Id is required";
      isValid = false;
    }

    if (data.shelter_type.trim() === "") {
      newErrors.shelter_type = "Shelter Type  is required";
      isValid = false;
    }
    if (data.special_details.trim() === "") {
      newErrors.special_details = "Details are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //insert hook
  const [data, setData] = useState({
    shelter_id: "",
    shelter_type: "",
    special_details: "",
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
      .get("http://localhost:5000/shelters/")
      .then((response) => {
        setShelter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return shelter.map((object, i) => {
      return <ShelterTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/shelters/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post(`http://localhost:5000/shelters/add`, data)

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

      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }
      <Link to="/shelterListPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Shelter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Shelter Id:</Form.Label>
              <Form.Control
                type="text"
                name="shelter_id"
                value={data.shelter_id}
                placeholder="Enter Shelter Number"
                onChange={handleChange}
                autoFocus
              />
              {errors.shelter_id && (
                <Alert variant="danger">{errors.shelter_id}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Shelter Type</Form.Label>
              <Form.Control
                as="select"
                name="shelter_type"
                value={data.shelter_type}
                onChange={handleChange}
              >
                {errors.shelter_type && (
                  <Alert variant="danger">{errors.shelter_type}</Alert>
                )}

                <option value="">Select</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option> 
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Special Details:</Form.Label>
              <Form.Control
                type="text"
                name="special_details"
                value={data.special_details}
                placeholder="Enter Special Details"
                onChange={handleChange}
                autoFocus
              />
              {errors.special_details && (
                <Alert variant="danger">{errors.special_details}</Alert>
              )}
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

      <div className="tablestyle">

        {
          //-------------------------Display data from database-------------------
        }

        <table className="table table-striped">
          <tr  class="table-header" style={{ textAlign: "center" }}>
            <td>
              <b>Shelter ID</b> 
            </td>
            <td >
              <b>Shelter Type</b>
            </td>

            <td>
              <b>Special Details</b>
            </td>
          </tr>

          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default withRouter(ShelterList);
