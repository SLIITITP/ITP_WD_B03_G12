import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import ReactToPrint from 'react-to-print';
import "../components/CSS/listmain.css";
import {AppointmentPrint} from "./AppointmentPrint";
import PrintHeader from "./PrintHeader";

function AppoinmentListPreview(props) {
  //read hook

  const [application, setApplication] = useState([]);

  


  

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments/")
      .then((response) => {
        setApplication(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  


  const tabRow = () => {
    return application.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.name}</td>
        <td>{object.email}</td>
        <td>{object.phone}</td>
        <td>{object.petName}</td>
        <td>{object.Species}</td>
        <td>{object.Breed}</td>
        <td>{object.Reason}</td>
        <td>{object.note}</td>
      </tr>
    ));
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const componentRef = useRef(); 

 

  return (
    <div>
   
       <ReactToPrint

documentTitle='Our Appoinments'

trigger={() => <Button style={{float:'right'}}>Print</Button>}
content={() => componentRef.current} ></ReactToPrint>

<AppointmentPrint ref={componentRef}>

<PrintHeader/>

      

      <h1 align="center">Appiontment List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

    
       
        {
          //-------------------------Display data from database-------------------
        }
       
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
              <b>Phone</b>
            </td>
            <td>
              <b>Pet Name</b>
            </td>
            <td>
              <b>Species</b>
            </td>
            <td>
              <b>Breed</b>
            </td>
            <td>
              <b>Reason</b>
            </td>
            <td>
              <b>Note</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </AppointmentPrint>
     
    </div>
  );
}

export default withRouter(AppoinmentListPreview);
