import React, { useState, useEffect,useRef} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ReactToPrint from 'react-to-print';
import { withRouter } from "./withRouter";
import {PrescriptionPrint} from "./PrescriptionPrint"
import PrintHeader from "./PrintHeader";
import "../components/CSS/listmain.css";

function PrescriptionListPrintPreview(props) {
  //read hook
  const [prescription, setPrescription] = useState([]);
  const componentRef = useRef(); 

  
  

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/prescription/")
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const tabRow = () => {
    return prescription.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.DoctorID}</td>
        <td>{object.PetID}</td>
        <td>{object.PetName}</td>
        <td>{object.Illness}</td>
        <td>{object.Medicine}</td>
         <td>{object.Date}</td>
        
      </tr>
    ));
  };

  //taking count 
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/prescription/get/count")
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
      documentTitle='Our Prescriptions' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
       <PrescriptionPrint ref={componentRef}>

       <PrintHeader/>
     
     
      

      

      <h1 align="center">Prescription List </h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

     

    
       

        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped" >
          <tr>
            <td>
              <b>DoctorID</b>
            </td>
            <td>
              <b>PetID</b>
            </td>
            <td>
              <b>PetName</b>
            </td>
            <td>
              <b>Illness</b>
            </td>
            <td>
              <b>Medicine</b>
            </td>
            <td>
              <b>Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
          </table>
        </PrescriptionPrint>
      </div>
  
  );
}

export default withRouter( PrescriptionListPrintPreview);
