import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesTableRow from "./ServicesTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";

function ServicesList(props) {
  //read hook
  const [service, setService] = useState([]);

  //insert hook
  const [data, setData] = useState({
    service_name: "",
    service_price: "",
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
      .get("http://localhost:5000/service/")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return service.map((object, i) => {
      return <ServicesTableRow obj={object} key={i} />;
    });
  };

    //taking count
    const [count, setCount] = useState(0);

    useEffect(() => {
      axios
        .get("http://localhost:8000/service/get/count")
        .then((response) => {
          console.log(response)
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
      .post(`http://localhost:5000/service/add`, data)
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
      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Service Name:</Form.Label>
              <Form.Control
                type="text"
                name="service_name"
                value={data.service_name}
                placeholder="Enter New service"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Service Price</Form.Label>
              <Form.Control
                type="text"
                name="service_price"
                value={data.service_price}
                placeholder="Enter service Price"
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

      {
        //-------------------------Side Menue Buttons-------------------
      }
      <h1 align="center">Service List</h1>
      <h4 className="text-right"><b>Count:{count}</b></h4>
      <div className="tablestyle">
        <div className="buttonframe">
          <table className="buttonstyle">
            <tr>
              <td>
                <Link to="/invoiceAdd" className="nav-link">
                  <p>Issue Invoice</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/invoiceViewAll" className="nav-link">
                  <p>View all Invoices</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link onClick={handleShow} className="nav-link">
                  <p>Add a Service</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/services" className="nav-link">
                  <p>View Services</p>
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
              <b>Service Name</b>
            </td>
            <td>
              <b>Service Price</b>
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(ServicesList);
