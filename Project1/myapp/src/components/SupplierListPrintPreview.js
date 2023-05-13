import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { withRouter } from './withRouter';
import ReactToPrint from 'react-to-print'; 
import PrintHeader from "./PrintHeader";
import { SupplierPrint } from './SupplierPrint';
import '../components/CSS/listmain.css';

function SupplierListPrintPreview(props) {

  const componentRef = useRef(); 

    //read hook
    const [item, setItem] = useState([]);
  

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const tabRow = () => {
    return item.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.company_name}</td>
        <td>{object.person1_first_name}</td>
        <td>{object.person1_last_name}</td>
        <td>{object.Person2_first_name}</td>
        <td>{object.Person2_last_name}</td>
         <td>{object.email1}</td>
        <td>{object.email2}</td>
        <td>{object.contact_no1}</td>
        <td>{object.contact_no2}</td>
        <td>{object.registerd_date}</td>
      </tr>
    ));
  };



  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier/get/count")
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
      documentTitle='Our Supplier list' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
     
     <SupplierPrint ref={componentRef}>

     <PrintHeader/>


      <h1 align="center">Supplier List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

             
            {
          //-------------------------Display data from database-------------------
        }
       
        <table className="table table-striped" >
          <tr>
            <td>
              <b>company_name</b>
            </td>
            <td>
              <b>first_name</b>
            </td>
            <td>
              <b>last_name</b>
            </td>
            <td>
              <b>email1</b>
            </td>
            <td>
              <b>contact_no1</b>
            </td>
            <td>
              <b>contact_no2</b>
            </td>
            <td>
              <b>registerd_data</b>
            </td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </SupplierPrint>
      </div>
   
  );
}
export default withRouter(SupplierListPrintPreview);
