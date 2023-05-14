import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import { withRouter } from './withRouter';
import Table from 'react-bootstrap/Table';
import { EmployeePrint } from './EmployeePrint';
import ReactToPrint from 'react-to-print';
import PrintHeader from "./PrintHeader";
import '../components/CSS/listmain.css';

function EmployeeLoginPrintPreview(props) {


  const componentRef = useRef();

    //read hook
    const [employeelogin, setEmployeelogin] = useState([]);
  
    
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
    return employeelogin.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.email}</td>
        <td>{object.acctype}</td>
        <td>{object.reggdate}</td>
     
      </tr>
    ));
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

  

    return (
        <div>
     
     <ReactToPrint
      documentTitle='Our Employees' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>


<EmployeePrint ref={componentRef}>
<PrintHeader/>

      <h1 align="center">View all Accounts</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

       
    
        
           
            {
          //-------------------------Display data from database-------------------
        }



        <Table responsive className="table table-striped" >
          <tr>
            <td>
              <b>Email</b>
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
  

   

  );
}
export default withRouter(EmployeeLoginPrintPreview);