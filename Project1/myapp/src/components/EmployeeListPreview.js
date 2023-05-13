import React, { useState, useEffect, Component, useRef } from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import { withRouter } from './withRouter';
import Table from 'react-bootstrap/Table';
import { EmployeePrint } from './EmployeePrint';
import ReactToPrint from 'react-to-print';
import PrintHeader from "./PrintHeader";


import '../components/CSS/listmain.css';

function EmployeeListPreview(props) {
   const componentRef = useRef();

    //read hook
    const [employee, setEmployee] = useState([]);
  

  

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
    return employee.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.name}</td>
        <td>{object.lname}</td>
        <td>{object.NIC}</td>
        <td>{object.phoneno}</td>
        <td>{object.address}</td>
        <td>{object.gender}</td>
        <td>{object.birthday}</td>
        <td>{object.jobrole}</td>
        <td>{object.date}</td>
       
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
        <div>
     

      <ReactToPrint

 documentTitle='Our Employees'

trigger={() => <Button style={{float:'right'}}>Print</Button>}

content={() => componentRef.current} ></ReactToPrint>
<EmployeePrint ref={componentRef}>
<PrintHeader/>

    
      <h1 align="center">Employee List</h1>
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
   

   

  );
}
export default withRouter(EmployeeListPreview);