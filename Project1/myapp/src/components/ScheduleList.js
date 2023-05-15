import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import ScheduleTableRow from "./ScheduleTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";


function ScheduleList(props) {
  //read hook
  
  const [schedule, setSchedule] = useState([]);

  //insert hook
  const [data, setData] = useState({
    name:"",
    lname:"",     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Bootsrap Modal configurations

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get data from database
  useEffect(() => {
    axios
      .get("http://localhost:5000/schedules/")
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return schedule.map((object, i) => {
      return <ScheduleTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/schedules/get/count")
      .then((response) => {
        console.log(response);
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/schedules/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      
      <h1 align="center">Today's Schedule</h1>
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
              <b>Date & Time</b>
            </td>
           
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
       
      </div>
    
  );
}

export default withRouter(ScheduleList);
