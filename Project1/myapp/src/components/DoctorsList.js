import React, { useState, useEffect, Component, useRef } from 'react'
import axios from 'axios'
import DoctorsTableRow from './DoctorsTableRow'
import Button from "react-bootstrap/Button";
import { withRouter } from './withRouter';
import Table from 'react-bootstrap/Table';
import { EmployeePrint } from './EmployeePrint';
import ReactToPrint from 'react-to-print';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";


import '../components/CSS/listmain.css';



function DoctorsList(props) {
  

   const componentRef = useRef();
  
    //read hook
    const [employee, setEmployee] = useState([]);
   
   
    //Bootsrap Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 


  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 
  

  const tabRow = () => {
   
    return  employee
    .filter((employee) => employee.jobrole === 'doctor')
    .map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.name}</td>
        <td>{object.lname}</td>
        <td>{object.date}</td>
        <td>
          <Button
            type="submit"
            className="submit"
            variant="success"
            onClick= {handleShow}
          >
            Add
          </Button>
        </td>
        
      </tr>
    ));
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

    return (
        <><div>


        <ReactToPrint

          documentTitle='Our Employees'

          trigger={() => <Button style={{ float: 'right' }}>Print</Button>}

          content={() => componentRef.current}></ReactToPrint>
        <EmployeePrint ref={componentRef}>



          <h1 align="center">Available Doctors List</h1>
          <h4 className="text-right">
            <b>Total: {count}</b>
          </h4>




          {
            //-------------------------Display data from database-------------------
          }


          <Table responsive className="table table-striped" style={{ width: "54em" }}>
            <tr>
              <td>
                <b>First Name</b>
              </td>
              <td>
                <b>Last Name</b>
              </td>
              <td>
                <b>Date</b>
              </td>




            </tr>
            <tbody>{tabRow()}</tbody>
          </Table>
        </EmployeePrint>

      </div><Modal {...props} size="lg" show={show} onHide={handleClose} centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Today's Schedule
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> F Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employee.name}
  
                  autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>L Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname" 
                  value={employee.lname}
                  autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> Date:</Form.Label>
                <Form.Control
                  type="text"
                  name="date" 
                  value={employee.date}
                  autoFocus />
             </Form.Group> 
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button >Done</Button>
            <Button onClick={handleClose} >Close</Button>
          </Modal.Footer>
        </Modal></>

  );
}

export default withRouter(DoctorsList);
