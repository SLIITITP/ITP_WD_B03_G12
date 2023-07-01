import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import "../components/CSS/listmain.css";
import OrderListTableRow from "./OrderListTableRow";

function OrderList(props) {
  //read hook
  const [adminOrder, setAdminOrder] = useState([]);

  //insert hook
  const [data, setData] = useState({
    selectedItem: "",
    selectedItemQty: "",
    totalPrice: "",
    paymentMethod: "",
    orderStates: "",
    orderDate: "",
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
      .get("http://localhost:5000/adminOrder/")
      .then((response) => {
        setAdminOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return adminOrder.map((object, i) => {
      return <OrderListTableRow obj={object} key={i} />;
    });
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

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/adminOrder/add`, data)
      .then((res) => {
        alert(`Added Successfully`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const componentRef = useRef();
  return (
    <div>
 <Link to="/store" className="nav-link">
<button className="material-icons floating-btn" onClick={handleShow}>
        add
      </button> 
      </Link>
     
                
                
                
      <Link to="/orderListPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>Print Preview</Button>
      </Link>

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

      <h1 align="center">Order List</h1>
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
          <tr class="table-header">
            <td>
              <b>Items</b>
            </td>
            <td>
              <b>Item Qty</b>
            </td>
            <td>
              <b>Total (LKR)</b>
            </td>
            <td>
              <b>Payment Method</b>
            </td>
            <td>
              <b>Order State</b>
            </td>
            <td>
              <b>Order Date</b>
            </td>
            <td> </td>
            <td> </td>
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(OrderList);
