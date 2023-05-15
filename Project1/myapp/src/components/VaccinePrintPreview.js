import React, { useState, useEffect,useRef} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import PrintHeader from "./PrintHeader";
import {VaccinePrint} from "./VaccinePrint"
import "../components/CSS/listmain.css";
import ReactToPrint from 'react-to-print';


function VaccinePrintPreview(props) {
   
  //read hook

  const [vaccine, setVaccine] = useState([]);

 
  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/vaccine/")
      .then((response) => {
        setVaccine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

   const tabRow = () => {
    return vaccine.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.vaccination_Name}</td>
        <td>{object.vaccine_Description}</td>
        <td>{object.date}</td>

      </tr>
    ));
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/vaccine/get/count")
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
      documentTitle='Our Vaccines' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
  
    
  
      <VaccinePrint ref={componentRef}>
     
     <PrintHeader/>

      <h1 align="center">Vaccine List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      

    
        

        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped" >
          <tr>
            <td>
              <b>Vaccination Name</b>
            </td>
            <td>
              <b>Vaccine Description</b>
            </td>
            <td>
              <b>Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </VaccinePrint>
      </div>
    
  
  );
}

export default withRouter(VaccinePrintPreview);
