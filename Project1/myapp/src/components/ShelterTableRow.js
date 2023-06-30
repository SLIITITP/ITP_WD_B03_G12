import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

const ShelterTableRow = (props) => {

    const [shelterState] = useState({
        _id: props.obj._id,
        shelter_id: props.obj.shelter_id,
        shelter_type: props.obj.shelter_type,
        special_details: props.obj.special_details,
       
      });

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  
       const [updated, setUpdated] = useState({});
  
       const onDelete = (id) => {
          axios.get(`http://localhost:5000/shelters/delete/${id}`).then((res) => {
            alert(`Deleted Successfully : ${id}`);
            window.location.reload();
          });
        };

        const updateShelter = (shelterState) => {
            console.log(shelterState);
            setUpdated(shelterState);
        
            handleShow();
          };

          const handleChange = (e) => {
            e.preventDefault();
            const { name, value } = e.target;
            setUpdated((prevState) => ({ ...prevState, [name]: value }));
          };
    

          const onUpdate = (_id) => {
            axios
              .put(`http://localhost:5000/shelters/update/${_id}`, updated)
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
        <Modal.Title id="contained-modal-title-vcenter">
        Update Shelters

        </Modal.Title>

        </Modal.Header>
        <Modal.Body>
            <Form>


            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Shelter Id:</Form.Label>
                <Form.Control
                  type="text"
                  name="shelter_id"
                  value={updated.shelter_id}
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
                value={updated.shelter_type}  
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </Form.Control>
            </Form.Group>


            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Special Details:</Form.Label>
                <Form.Control
                  type="text"
                  name="special_details"
                  value={updated.special_details}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>

        <Button onClick={() => onUpdate(shelterState._id)}>Update</Button>
        <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>

        </Modal>

        {
           //-------------------------Display All data -------------------
        }

        <td key={shelterState._id} style={{ display: "none" }}>
          {" "}
        </td>

        <td  style={{ textAlign: "center" }}>{shelterState.shelter_id}</td>
        <td  style={{ textAlign: "center" }}>{shelterState.shelter_type}</td>
        <td>{shelterState.special_details}</td>


        <td>
          <button
            type="submit"
            className="submit"
            onClick={() => updateShelter(shelterState)}
          >
            <Link className="nav-link">Update</Link>
          </button>
        </td>

        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(shelterState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>





            </tr>




          );

};
export default withRouter(ShelterTableRow);