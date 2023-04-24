import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import ShelterTableRow from "./ShelterTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import ReactToPrint from 'react-to-print';
import {ShelterPrint} from "./ShelterPrint"




function ShelterList(props){

  const componentRef = useRef(); 

     //read hook

  const [shelter, setShelter] = useState([]);

  //insert hook
  const [data, setData] = useState({
   
    shelter_id :"",
    shelter_type:"",
    special_details :"",
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
  };

  return(
    <div>
        {
              //-------------------------Insert form using bootstrap Modal-------------------

        }

        <ReactToPrint
      documentTitle='Our Services' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>

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
                <option value="">Select</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
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
      <div className="buttonframe">
      <table className="buttonstyle">


      <tr>
              <td>
                <Link to ="" className="nav-link">
                  <p>Add Admission</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/admissions" className="nav-link">
                  <p>View all Admissions</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Add Shelter</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/shelters" className="nav-link">
                  <p>View Shelters</p>
                </Link>
              </td>
            </tr>

      </table>

      </div>


      {
          //-------------------------Display data from database-------------------
        }

        <ShelterPrint ref={componentRef}>

        <table className="table table-striped" style={{ width: "54em" }}>
        <tr>
        <td>
              <b>Shelter ID</b>
            </td>
            <td>
              <b>Shelter Type</b>
            </td>

            <td>
              <b>Special Details</b>
            </td>
        </tr>

        <tbody>{tabRow()}</tbody>
            
        </table>
        </ShelterPrint>



      </div>


    </div>

    
  );
}
export default withRouter(ShelterList);