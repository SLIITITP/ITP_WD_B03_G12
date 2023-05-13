import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter } from "./withRouter";
import ReactToPrint from 'react-to-print';
import { UserPrint} from "./UserPrint";
import PrintHeader from "./PrintHeader";



import "../components/CSS/listmain.css";

function UsersListPrintPreview(props) {

  const componentRef = useRef();

    //read hook
    const [user, setUser] = useState([]);

 

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const tabRow = () => {
    return user.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.first_name}</td>
        <td>{object.last_name}</td>
        <td>{object.email}</td>
        <td>{object.password}</td>
        <td>{object.date}</td>
      </tr>
    ));
  };


  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/get/count")
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
trigger={() => <Button style={{float:'right'}}>Print</Button>}
content={() => componentRef.current} ></ReactToPrint>
 <UserPrint ref={componentRef}>
<PrintHeader/>
     


      <h1 align="center">Users List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

 
        {
          //-------------------------Display data from database-------------------
        }
       
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
              <b>Registered Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </UserPrint>
      </div>
   
  );
}

export default withRouter(UsersListPrintPreview);
