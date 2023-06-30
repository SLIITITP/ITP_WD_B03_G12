import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimalTableRow from "./AnimalTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";

function AnimalList(props) {
  //read hook
  const [animal, setAnimal] = useState([]);

  //insert hook
  const [data, setData] = useState({
    owner_ID: "",
    animal_name: "",
    animal_type: "",
    animal_breed: "",
    animal_gender: "",
    DOB: "",
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
      .get("http://localhost:5000/animal/")
      .then((response) => {
        setAnimal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return animal.map((object, i) => {
      return <AnimalTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/animal/get/count")
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
      .post(`http://localhost:5000/animal/add`, data)
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
      <Link to="/animalPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>
          Print Preview
        </Button>
      </Link>
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <h1 align="center">Animal List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped">
          <tr>
            <td>
              <b>Animal Name</b>
            </td>
            <td>
              <b>Animal Type</b>
            </td>
            <td>
              <b>Animal Breed</b>
            </td>
            <td>
              <b>Animal Gender</b>
            </td>
            <td>
              <b>DateOfBirth</b>
            </td>
            <td>
              <b>Owner</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(AnimalList);
