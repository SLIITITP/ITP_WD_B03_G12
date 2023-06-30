import React, { useState, useEffect } from "react";
import axios from "axios";
import AdmissionTableRow from "./AdmissionTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import e from "cors";
import "../components/CSS/listmain.css";
import { Alert } from "react-bootstrap";





function AdmissionForm(props) {

  //read hook
  const [admission, setAdmission] = useState([]);

  //Form validation
  const [errors, setErrors] = useState({});


  //Validations
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate name field
    if (data.first_name.trim() === "") {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }
  
    if (data.last_name.trim() === "") {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (data.contact_no.trim() === "") {
      newErrors.contact_no = "Contact is required";
      isValid = false;
    } else if (data.contact_no.trim().length !== 10) {
      newErrors.contact_no = "Contact should be 10 digits";
      isValid = false;
    }
    if (data.weight.trim() === "") {
      newErrors.weight = "Weight is required";
      isValid = false;
    }
    if (data.diagnosis.trim() === "") {
      newErrors.diagnosis = "Diagnosis is required";
      isValid = false;
    }
    if (data.shelter_type.trim() === "") {
      newErrors.shelter_type = "Type is required";
      isValid = false;
    }

    if (data.special_notes.trim() === "") {
      newErrors.special_notes = "Special Note is required";
      isValid = false;
    }

    if (data.shelter_no.trim() === "") {
      newErrors.shelter_no = "shelter No is required";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };


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
    status:"Admitted",
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
      .get("http://localhost:5000/admission/")
      .then((response) => {
        setAdmission(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return admission.map((object, i) => {
      return <AdmissionTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admission/get/count")
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

    if  (validateForm()){
    axios
      .post(`http://localhost:5000/admission/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  

      
    if  (validateForm()){
       axios
      .post(`http://localhost:5000/inpatient/add`, data)

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

     <Link to="/admissionPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
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
              {errors.first_name && <Alert variant="danger">{errors.first_name}</Alert>}
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
              {errors.last_name && <Alert variant="danger">{errors.last_name}</Alert>}
            </Form.Group>

        {
          //Modified field
        }
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact No:</Form.Label>
              <Form.Control
                 type="text"
                 name="contact_no"
                 value={data.contact_no}
                 placeholder="Enter Contact No"
                onChange={handleChange}
                 onKeyPress={(e) => {
         if (e.target.value.length >= 10 || !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    }}
    autoFocus
  />
  {errors.contact_no && <Alert variant="danger">{errors.contact_no}</Alert>}

      {
          //Modified field
        }
</Form.Group>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Weight:</Form.Label>
  <Form.Control
    type="text"
    name="weight"
    value={data.weight}
    placeholder="Enter Animal Weight (e.g., 10Kg)"
    onChange={handleChange}
    pattern="\d+(\.\d{1,2})?Kg"
    autoFocus
  />
  {errors.weight && <Alert variant="danger">{errors.weight}</Alert>}
</Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Diagnosis:</Form.Label>
              <Form.Control as = "textarea" rows={3} 
                name="diagnosis"
                value={data.diagnosis}
                placeholder="Enter Diagnosis"
                onChange={handleChange}
                autoFocus
              />
             {errors.diagnosis && <Alert variant="danger">{errors.diagnosis}</Alert>}
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
              {errors.shelter_type && <Alert variant="danger">{errors.shelter_type}</Alert>}
                <option value="">Select</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Special Notes:</Form.Label>
              <Form.Control as = "textarea" rows={3} 
               name="special_notes"
                value={data.special_notes}
                placeholder="Enter Special Notes"
                onChange={handleChange}
                autoFocus
              />
              {errors.special_notes && <Alert variant="danger">{errors.special_notes}</Alert>}
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
              {errors.shelter_no && <Alert variant="danger">{errors.shelter_no}</Alert>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>


      <h1 align="center">Admission List</h1>
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

      
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>Owner's First Name</b>
            </td>
            <td>
              <b>Owner's Last Name</b>
            </td>

            <td>
              <b>Contact No</b>
            </td>

            <td>
              <b>Weight(Kg's)</b>
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
            <td>
              <b>Status</b>
            </td>


          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      
      </div>




    </div>
  );
}
export default withRouter(AdmissionForm);
