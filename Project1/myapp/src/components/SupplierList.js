import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SupplierTableRow from "./SupplierTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import { Alert } from "react-bootstrap";

function SupplierList(props) {
  //Form validation
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name field
    if (data.company_name.trim() === "") {
      newErrors.company_name = "Company name is required";
      isValid = false;
    }

    if (data.person1_first_name.trim() === "") {
      newErrors.person1_first_name = "First name is required";
      isValid = false;
    }

    if (data.person1_last_name.trim() === "") {
      newErrors.person1_last_name = "Last name is required";
      isValid = false;
    }

    if (data.email1.trim() === "") {
      newErrors.email1 = "Email is required";
      isValid = false;
    }

    if (data.contact_no1.trim() === "") {
      newErrors.contact_no1 = "Contact no is required";
      isValid = false;
    }

    if (data.contact_no2.trim() === "===") {
      newErrors.contact_no2 = "Contact no is required";
      isValid = false;
    }

    if (data.registerd_date.trim() === "") {
      newErrors.registerd_date = "registerd date is required";
      isValid = false;
    }

    /* if (data.expire_date === "select") {
      newErrors.expire_date = "Expire date is required";
      isValid = false;
    }*/

    setErrors(newErrors);
    return isValid;
  };

  //read hook
  const [item, setItem] = useState([]);

  //insert hook
  const [data, setData] = useState({
    company_name: "",
    person1_first_name: "",
    person1_last_name: "",
    person2_first_name: "",
    person2_last_name: "",
    email1: "",
    email2: "",
    contact_no1: "",
    contact_no2: "",
    registerd_date: "",
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
      .get("http://localhost:5000/supplier/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return item.map((object, i) => {
      return <SupplierTableRow obj={object} key={i} />;
    });
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

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    console.log(data);

    if (validateForm()) {
      axios
        .post(`http://localhost:5000/supplier/add`, data)
        .then((res) => {
          alert(`Added Successfully`);
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          alert(`Already have`);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <button className="material-icons floating-btn" onClick={handleShow}>
        add
      </button> 

      <Link to="/supplierListPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>

      {
        //-------------------------Insert form using bootstrap Modal-------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>company_name:</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={data.company_name}
                placeholder="Enter company Name"
                onChange={handleChange}
                autoFocus
              />
              {errors.company_name && (
                <Alert variant="danger">{errors.company_name}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person1_first_name:</Form.Label>
              <Form.Control
                type="text"
                name="person1_first_name"
                value={data.person1_first_name}
                placeholder="Add person1 first name"
                onChange={handleChange}
                autoFocus
              />
              {errors.person1_first_name && (
                <Alert variant="danger">{errors.person1_first_name}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person1_last_name:</Form.Label>
              <Form.Control
                type="text"
                name="person1_last_name"
                value={data.person1_last_name}
                placeholder="Enter person1_last_name"
                onChange={handleChange}
                autoFocus
              />
              {errors.person1_last_name && (
                <Alert variant="danger">{errors.person1_last_name}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person2_first_name:</Form.Label>
              <Form.Control
                type="text"
                name="person2_first_name"
                value={data.person2_first_name}
                placeholder="Enter person2_first_name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>person2_last_name:</Form.Label>
              <Form.Control
                type="text"
                name="person2_last_name"
                value={data.person2_last_name}
                placeholder="Enter person2_last_name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>email1:</Form.Label>
              <Form.Control
                type="text"
                name="email1"
                value={data.email1}
                placeholder="Enter email1"
                onChange={handleChange}
                autoFocus
              />
              {errors.email1 && <Alert variant="danger">{errors.email1}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>email2:</Form.Label>
              <Form.Control
                type="text"
                name="email2"
                value={data.email2}
                placeholder="Enter email2"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>contact_no1:</Form.Label>
              <Form.Control
                type="text"
                name="contact_no1"
                value={data.contact_no1}
                placeholder="Enter contact_no1"
                onChange={handleChange}
                autoFocus
              />
              {errors.contact_no1 && (
                <Alert variant="danger">{errors.contact_no1}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>contact_no2:</Form.Label>
              <Form.Control
                type="text"
                name="contact_no2"
                value={data.contact_no2}
                placeholder="Enter contact_no2"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>registerd_data:</Form.Label>
              <Form.Control
                type="date"
                name="registerd_date"
                value={data.registerd_date}
                placeholder="Enter registerd_data "
                onChange={handleChange}
                autoFocus
              />
              {errors.registerd_date && (
                <Alert variant="danger">{errors.registerd_date}</Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Supplier List</h1>
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
          <tr style={{ textAlign: "center" }}>
            <td>
              <b>Company</b>
            </td>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Email1</b>
            </td>
            <td>
              <b>Contact 1</b>
            </td>
            <td>
              <b>Contact 2</b>
            </td>
            <td>
              <b>Reg Date</b> 
            </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default withRouter(SupplierList);
