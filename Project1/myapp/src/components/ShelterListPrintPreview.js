import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import ReactToPrint from 'react-to-print';
import {ShelterPrint} from "./ShelterPrint"
import PrintHeader from "./PrintHeader";





function ShelterListPrintPreview(props){

  const componentRef = useRef(); 

     //read hook

  const [shelter, setShelter] = useState([]);

  




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
    return shelter.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.shelter_id }</td>
        <td>{object.shelter_type}</td>
        <td>{object.special_details}</td>
     
      </tr>
    ));
  };
;

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




  return(
    <div>
      

        <ReactToPrint
      documentTitle='Our Shelters' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
 <ShelterPrint ref={componentRef}>

<PrintHeader/>


<h1 align="center">Shelter List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>
   

     
    


      {
          //-------------------------Display data from database-------------------
        }

    

        <table className="table table-striped">
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


  

    
  );
}
export default withRouter( ShelterListPrintPreview);