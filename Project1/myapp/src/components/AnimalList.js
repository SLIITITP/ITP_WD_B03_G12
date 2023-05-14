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
      return <  AnimalTableRow obj={object} key={i} />;
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
        <Button style={{ float: "right" }}>Print Preview</Button>
      </Link>
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Animal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Name:</Form.Label>
              <Form.Control
                type="text"
                name="animal_name"
                value={data.first_name}
                placeholder="Enter Animal Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Animal Type:</Form.Label>
              <Form.Control
                type="text"
                name="animal_type"
                value={data.animal_type}
                placeholder="Enter Animal Type"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Breed:</Form.Label>
              <Form.Control
                type="text"
                name="animal_breed"
                value={data.animal_breed}
                placeholder="Enter Animal Breed"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Animal Gender:</Form.Label>
              <Form.Control
                type="text"
                name="animal_gender"
                value={data.animal_gender}
                placeholder="Enter Animal Breed"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>DOB:</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                value={data.DOB}
                placeholder="Enter DOB"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>




            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Animal List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            <tr>
              <td>
                <Link  className="nav-link">
                  <p>Add User</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/regUser" className="nav-link">
                  <p>View all Users</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Add Animal</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/animals" className="nav-link">
                  <p>View all Animal</p>
                </Link>
              </td>
            </tr>
            <tr>
            
            <td>
              <Link to="/animals" className="nav-link">
                <p>Add Animal Type </p>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/animaltype" className="nav-link">
                <p>View all Animal Types</p>
              </Link>
            </td>
          </tr>
          </table>
        </div>

        {
          //-------------------------Display data from database-------------------
        }
        <table className="table table-striped" style={{ width: "54em" }}>
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
              <b>DOB</b>
            </td>
            <td>
              <b>Date</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(AnimalList);
