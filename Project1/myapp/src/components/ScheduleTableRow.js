import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import EmployeeLoginTableRow from "./EmployeeLoginTableRow";

const ScheduleTableRow = (props) => {
  const [scheduleState] = useState({
    _id: props.obj._id,
    name:props.obj.name,
    lname:props.obj.lname,
    date:props.obj.date,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onDelete = (id) => {
    axios.get(`http://localhost:5000/ /delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };


  return (
    
      <tr>
        

        {
          //-------------------------Display All data -------------------
        }

        <td key={scheduleState._id} style={{ display: "none" }}>
          {" "}
        </td>
        <td>{scheduleState.name}</td>
        <td>{scheduleState.lname}</td>
        <td>{EmployeeLoginTableRow.date}</td>
       
       
        <td>
          <button
            type="submit"
            className="delete"
            onClick={() => onDelete(scheduleState._id)}
          >
            <Link className="nav-link">Delete</Link>
          </button>
        </td>
      </tr>
    
  );
};

export default withRouter(ScheduleTableRow);



