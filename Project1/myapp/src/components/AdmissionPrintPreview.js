import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import e from "cors";
import "../components/CSS/listmain.css";
import ReactToPrint from 'react-to-print';
import { AdmissionPrint} from "./AdmissionPrint";
import PrintHeader from "./PrintHeader";



function AdmissionPrintPreview(props){


  const componentRef = useRef(); 



  //read hook
  const [admission, setAdmission] = useState([]);
  


  // get data from DB

  useEffect(() => {
    axios
      .get("http://localhost:5000/admission/")
      .then((response) => {
        setAdmission(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 

  const tabRow = () => {
    return admission.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.first_name}</td>
        <td>{object.last_name}</td>
        <td>{object.contact_no}</td>
        <td>{object.weight}</td>
        <td>{object.diagnosis}</td>
         <td>{object.shelter_type}</td>
        <td>{object.special_notes}</td>
        <td>{object.shelter_no}</td>
        <td>{object.admitted_date}</td>
      </tr>
    ));
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admission/get/count")
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
      documentTitle='Our Admissions' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
       <AdmissionPrint ref={componentRef}>

       <PrintHeader/>
     



      <h1 align="center">Admission List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>


    

        {
          //-------------------------Display data from database-------------------
        }

       
        <table className="table table-striped">
          <tr>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>

            <td>
              <b>Contact No</b>
            </td>

            <td>
              <b>Weight</b>
            </td>

            <td>
              <b>Diagnosis</b>
            </td>

            <td>
              <b>Shelter Type</b>
            </td>

            <td>
              <b>Special Notes</b>
            </td>

            <td>
              <b>Shelter No</b>
            </td>


          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </AdmissionPrint>
    </div>
    
  );
};

export default withRouter(AdmissionPrintPreview);
