import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const AdmissionTableRow = (props) => {
    const [admissionState] = useState({
      _id: props.obj._id,
      first_name: props.obj.first_name,
      last_name: props.obj.last_name,
      contact_no: props.obj.contact_no,
      weight: props.obj.weight,
      diagnosis:props.obj.diagnosis,
      shelter_type: props.obj.shelter_type,
      special_notes: props.obj.special_notes,
      shelter_no:props.obj.shelter_no,
      status:props.obj.status
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     const [updated, setUpdated] = useState({});

     const onDelete = (id) => {
        axios.get(`http://localhost:5000/admission/delete/${id}`).then((res) => {
          alert(`Deleted Successfully : ${id}`);
          window.location.reload();
        });
      };

      const updateAdmission = (admissionState) => {
        console.log(admissionState);
        setUpdated(admissionState);
    
        handleShow();
      };


      const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUpdated((prevState) => ({ ...prevState, [name]: value }));
      };

      const onUpdate = (_id) => {
        axios
          .put(`http://localhost:5000/admission/update/${_id}`, updated)
          .then((res) => {
            alert(`Updated Successfully : ${_id}`);
            handleClose();
            window.location.reload();
          })
          .catch((err) => console.log(err));
      };


      return(

        <tr>
             {
          //-------------------------Update form using bootstrap Modal-------------------
        }

        <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
        Update Admissions

        </Modal.Title>
       </Modal.Header>
       <Modal.Body>
        <Form>

        <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={updated.first_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={updated.last_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contact No:</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_no"
                  value={updated.contact_no}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Weight:</Form.Label>
                <Form.Control
                  type="text"
                  name="weight"
                  value={updated.weight}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Diagnosis:</Form.Label>
                <Form.Control
                  type="text"
                  name="diagnosis"
                  value={updated.diagnosis}
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
                value={AdmissionTableRow.shelter_type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>


              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Special Notes:</Form.Label>
                <Form.Control
                  type="text"
                  name="special_notes"
                  value={updated.special_notes}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Shelter No:</Form.Label>
                <Form.Control
                  type="text"
                  name="shelter_no"
                  value={updated.shelter_no}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Admit Status:</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={updated.status}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
        </Form>
       </Modal.Body>
       <Modal.Footer>
       <Button onClick={() => onUpdate(admissionState._id)}>Update</Button>
        <Button onClick={handleClose}>Close</Button>
       </Modal.Footer>

        </Modal>



        {
           //-------------------------Display All data -------------------
        }

        <td key={admissionState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{admissionState.first_name}</td>
        <td>{admissionState.last_name}</td>
        <td>{admissionState.contact_no}</td>
        <td>{admissionState.weight}</td>
        <td>{admissionState.diagnosis}</td>
        <td>{admissionState.shelter_type}</td>
        <td>{admissionState.special_notes}</td>
        <td>{admissionState.shelter_no}</td>
        <td>{admissionState.status}</td>
        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateAdmission(admissionState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(admissionState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>


        </tr>





      );
    
};
export default withRouter(AdmissionTableRow);