import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter"; 
import ReactToPrint from 'react-to-print'; 
import "../components/CSS/listmain.css";

import { ServicePrint } from "./ServicePrint";
import PrintHeader from "./PrintHeader"
function ServicePrintPreview(props) {
 
  
  //read hook
  const [service, setService] = useState([]);



  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/service/")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return service.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.service_name}</td>
        <td>{object.service_price}</td>
      </tr>
    ));
  };
  
  

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get/count")
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
      documentTitle='Our Services' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
     
    
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }
    
    <ServicePrint ref={componentRef}>
    <PrintHeader/>
      <h1 align="center">Service List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>
      

        {
          //-------------------------Display data from database-------------------
        }
        
        <table className="table table-striped">
          <tr>
            <td>
              <b>Service Name</b>
            </td>
            <td>
              <b>Service Price</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </ServicePrint>
      </div>
      

    
  );
};

export default withRouter(ServicePrintPreview);
