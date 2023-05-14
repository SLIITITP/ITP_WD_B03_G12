import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import ReactToPrint from "react-to-print";
import { OrderPrint } from "./OrderPrint";
import "../components/CSS/listmain.css";
import PrintHeader from "./PrintHeader";


function OrderListPrintPreview(props) {
  //read hook
  const [adminOrder, setAdminOrder] = useState([]);

  
  const componentRef = useRef();
  

  
  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/adminOrder/")
      .then((response) => {
        setAdminOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const tabRow = () => {
    return adminOrder.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.orderDate.substring(0, 10)}</td>
        <td>{object.paymentMethod}</td>
        <td>{object.selectedItem}</td>
        <td>{object.selectedItemQty}</td>
        <td>{object.totalPrice}</td>
        <td>{object.orderStates}</td>
        
       
        
         
        

      </tr>
    ));
  };



  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/adminOrder/get/count")
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
      documentTitle='Our Orders' 
      trigger={() => <Button style={{float:'right', backgroundColor:"black"}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
     
     <OrderPrint ref={componentRef}>
     <PrintHeader/>

      <h1 align="center">Order List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      
       

        {
          //-------------------------Display data from database-------------------
        }

          
        <table className="table table-striped">
          <tr class="table-info">
          <td >
              <b>OrderDate  </b>
            </td>
            <td>
              <b >PaymentMethod</b>
            </td>
            <td>
              <b>Selected Item</b>
            </td>
            <td>
              <b>SelectedItemQty</b>
            </td>
            <td>
              <b>TotalPrice</b>
            </td>
            
            <td>
              <b>OrderStates</b>
            </td>
           
            
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </OrderPrint>
      </div>
   
  );
}

export default withRouter(OrderListPrintPreview);
