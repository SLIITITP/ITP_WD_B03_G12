import React, { useState, useEffect, Component, useRef } from 'react'
import axios from 'axios'
import EmployeeTableRow from './EmployeeTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';
import Table from 'react-bootstrap/Table';
import { EmployeePrint } from './EmployeePrint';
import ReactToPrint from 'react-to-print';


import '../components/CSS/listmain.css';

function EmployeeList(props) {
   const componentRef = useRef();

    //read hook
    const [employee, setEmployee] = useState([]);
  
    //insert hook
    const [data, setData] = useState({
        name: '',
        lname: '',
        NIC: '',
        phoneno:'',
        address:'',
        gender:'',
        birthday:'',
        jobrole:'',

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
      .get("http://localhost:5000/employee/")
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return employee.map((object, i) => {
      return <EmployeeTableRow obj={object} key={i} />;
    });
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

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/employee/add`, data)
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

      <ReactToPrint

 documentTitle='Our Employees'

trigger={() => <Button style={{float:'right'}}>Print</Button>}

content={() => componentRef.current} ></ReactToPrint>


      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter first name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter first name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter last name:</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={data.lname}
                placeholder="Enter last name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter NIC:</Form.Label>
              <Form.Control
                type="text"
                name="NIC"
                value={data.NIC}
                placeholder="Enter NIC"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>



            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter phone number:</Form.Label>
              <Form.Control
                type="text"
                name="phoneno"
                value={data.phoneno}
                placeholder="Enter phone number"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={data.address}
                placeholder="Enter address"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Gender:</Form.Label>
              <Form.Control as = "select"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="male">Male</option>
               <option value="empfemaleloyee">Female</option>
              </Form.Control>
  

            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter birthday:</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={data.birthday}
                placeholder="Enter birthday"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter job role:</Form.Label>
              <Form.Control as = "select"
                  name="jobrole"
                  value={data.jobrole}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="doctor">Doctor</option>
               <option value="employee">Employee</option>
              </Form.Control>
  

            </Form.Group>

            



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Employee List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

        {
        //-------------------------Side Menue Buttons-------------------
        }
         
    
        <div className='tablestyle'>
            <div className='buttonframe'>
            <table className='buttonstyle'>
              <tr>
                    <td>       
                        <Link onClick={handleShow} className="nav-link">
                            <p>Add Employee</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/employeeViewAll" className="nav-link">
                            <p>View all Employee</p>
                        </Link>                 
                    </td>
                </tr>

                <tr>
                    <td>       
                        <Link  className="nav-link">
                            <p>Create Accounts</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/accounts" className="nav-link">
                            <p>View All Accounts</p>
                        </Link>                 
                        </td>
                </tr>
            </table>
            </div>
            {
          //-------------------------Display data from database-------------------
        }

<EmployeePrint ref={componentRef}>
        <Table responsive className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>
            <td>
              <b>NIC</b>
            </td>
            <td>
              <b>Phone no</b>
            </td>
            <td>
              <b>Address</b>
            </td>
            <td>
              <b>Gender</b>
            </td>
            <td>
              <b>Birthday</b>
            </td>
            <td>
              <b>Job role</b>
            </td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </Table>
        </EmployeePrint>

      </div>
    </div>

   

  );
}
export default withRouter(EmployeeList);