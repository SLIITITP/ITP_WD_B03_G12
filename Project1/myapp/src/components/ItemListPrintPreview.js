import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import ItemsTableRow from './ItemsTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';
import ReactToPrint from 'react-to-print'; 
import { ItemPrint } from './ItemPrint';


import '../components/CSS/listmain.css';
import { ItemListPrint } from './ItemListPrint';


function ItemList(props){
  const [service, setService] = useState([]);


    //read hook
    const [item, setItem] = useState([]);



    //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/item/")
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
        <td>{object.name}</td>
        <td>{object.category}</td>
        <td>{object.price}</td>
        <td>{object.Supplier}</td>
        <td>{object.description}</td>
        <td>{object.qty}</td>
        <td>{object.manufacture_date}</td>
        <td>{object.expire_date}</td>
      </tr>
    ));
  };
  

  
  
  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/item/get/count")
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
      documentTitle='Our Item list' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>

        <ItemPrint ref={componentRef}>

        <PrintHeader/>

        <h1 align="center">Service List</h1>
        <h4 className="text-right">
            <b>Total: {count}</b>
        </h4>
      
        

      
        {
          //-------------------------Display data from database---------------------
        }
        
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>name</b>
            </td>
            <td>
              <b>category</b>
            </td>
            <td>
              <b>price</b>
            </td>
            <td>
              <b>Supplier</b>
            </td>
            <td>
              <b>description</b>
            </td>
            <td>
              <b>qty</b>
            </td>
            <td>
              <b>manufacture_data</b>
            </td>
            <td>
              <b>expire_data</b>
            </td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
     </ItemPrint>
      
       </div>
   );
};
export default withRouter(ItemList);