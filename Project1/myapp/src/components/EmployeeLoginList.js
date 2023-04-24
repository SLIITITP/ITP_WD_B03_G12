import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import EmployeeLoginTableRow from './EmployeeLoginTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';
import Table from 'react-bootstrap/Table';
import { EmployeePrint } from './EmployeePrint';
import ReactToPrint from 'react-to-print';


import '../components/CSS/listmain.css';

function EmployeeLoginList(props) {
  const componentRef = useRef();

    //read hook
    const [employeelogin, setEmployeelogin] = useState([]);
  
    //insert hook
    const [data, setData] = useState({
        email: '',
        password: '',
        acctype: '',
        

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
      .get("http://localhost:5000/accounts/")
      .then((response) => {
        setEmployeelogin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return employeelogin.map((object, i) => {
      return <EmployeeLoginTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/accounts/get/count")
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
      .post(`http://localhost:5000/accounts/add`, data)
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
            Create Accounts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={data.email}
                placeholder="Enter email"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={data.password}
                placeholder="Enter password"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Select account type:</Form.Label>
              <Form.Control as = "select"
                  name="acctype"
                  value={data.acctype}
                  onChange={handleChange}>
              <option value="select">Select</option>
              <option value="doctor">Doctor</option>
               <option value="admin">Admin</option>
               <option value="cashier">Cashier</option>
              </Form.Control>
  

            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={handleClick}>Create</Button>
          <Button variant='danger' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">View all Accounts</h1>
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
                        <Link to="/employeeAdd" className="nav-link">
                            <p>Add Employee</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/employees" className="nav-link">
                            <p>View all Employee</p>
                        </Link>                 
                    </td>
                </tr>

                <tr>
                    <td>       
                        <Link onClick={handleShow} className="nav-link">
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
              <b>Email</b>
            </td>
            <td>
              <b>Password</b>
            </td>
            <td>
              <b>Account type</b>
            </td>
            <td>
              <b>Date</b>
            </td>
   
          </tr>
          <tbody>{tabRow()}</tbody>
        </Table>
        </EmployeePrint>

      </div>
    </div>

   

  );
}
export default withRouter(EmployeeLoginList);