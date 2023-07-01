import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ItemsTableRow from "./ItemsTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";
import ReactToPrint from "react-to-print";
import { ItemPrint } from "./ItemPrint";
import { Alert } from "react-bootstrap";

import "../components/CSS/listmain.css";

function ItemList(props) {
  const componentRef = useRef();

  //Form validation
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name field
    if (data.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (data.category.trim() === "") {
      newErrors.category = "Category required";
      isValid = false;
    }

    if (data.price.trim() === "") {
      newErrors.price = "Price is required";
      isValid = false;
    }

    if (data.Supplier.trim() === "") {
      newErrors.Supplier = "Supplier is required";
      isValid = false;
    }

    if (data.description.trim() === "") {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (data.qty.trim() === "===") {
      newErrors.qty = "qty is required";
      isValid = false;
    }

    if (data.re_order.trim() === "===") {
      newErrors.re_order = "re order is required";
      isValid = false;
    }

    if (data.manufacture_date.trim() === "") {
      newErrors.manufacture_date = "manufacture date is required";
      isValid = false;
    }

    if (data.expire_date === "select") {
      newErrors.expire_date = "Expire date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //read hook
  const [item, setItem] = useState([]);

  //insert hook
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    Supplier: "",
    description: "",
    qty: "",
    re_order: "",
    manufacture_date: "",
    expire_date: "",
    image: "",
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
      .get("http://localhost:5000/item/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return item.map((object, i) => {
      return <ItemsTableRow obj={object} key={i} />;
    });
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

  //upload file
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");

    setData((prev) => ({
      ...prev,
      image: selectedFile ? selectedFile.name : "",
    }));
  };

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    console.log(data);

    const formData = new FormData();
    formData.append("file", file);

    try {
      axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle success
      console.log("File uploaded successfully");
    } catch (error) {
      // Handle error
      console.log("Error uploading file:", error);
    }

    if (validateForm()) {
      axios
        .post(`http://localhost:5000/item/add`, data)
        .then((res) => {
          alert(`Added Successfully`);
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <button className="material-icons floating-btn" onClick={handleShow}>
        add
      </button>

      <Link to="/category">
        <button
          className="material-icons floating-btn"
          style={{ marginBottom: "100px" }}
        >
          list
        </button>
      </Link>

      <Link to="/itemListPrintPreview" className="nav-link">
        <Button className="print-btn" style={{ float: "right" }}>
          Print Preview
        </Button>
      </Link>

      {
        //-------------------------Insert form using bootstrap Modal------------------
      }

      <Modal {...props} size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter Item Name"
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <Alert variant="danger">{errors.name}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>category:</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={data.category}
                placeholder="Select Category"
                onChange={handleChange}
                autoFocus
              />
              {errors.category && (
                <Alert variant="danger">{errors.category}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>price:</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={data.price}
                placeholder="Enter Price"
                onChange={handleChange}
                autoFocus
              />
              {errors.price && <Alert variant="danger">{errors.price}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Supplier:</Form.Label>
              <Form.Control
                type="text"
                name="Supplier"
                value={data.Supplier}
                placeholder="Enter Company Name"
                onChange={handleChange}
                autoFocus
              />
              {errors.Supplier && (
                <Alert variant="danger">{errors.Supplier}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={data.description}
                placeholder="Enter Item Description"
                onChange={handleChange}
                autoFocus
              />
              {errors.description && (
                <Alert variant="danger">{errors.description}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>qty:</Form.Label>
              <Form.Control
                type="text"
                name="qty"
                value={data.qty}
                placeholder="Enter Quantity"
                onChange={handleChange}
                autoFocus
              />
              {errors.qty && <Alert variant="danger">{errors.qty}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>re_order:</Form.Label>
              <Form.Control
                type="text"
                name="re_order"
                value={data.re_order}
                placeholder="Enter re order "
                onChange={handleChange}
                autoFocus
              />
              {errors.qty && <Alert variant="danger">{errors.re_order}</Alert>}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>manufacture_date:</Form.Label>
              <Form.Control
                type="date"
                name="manufacture_date"
                value={data.manufacture_date}
                placeholder="Enter Manufactured Date "
                onChange={handleChange}
                autoFocus
              />
              {errors.manufacture_date && (
                <Alert variant="danger">{errors.manufacture_date}</Alert>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>expire_date:</Form.Label>
              <Form.Control
                type="date"
                name="expire_date"
                value={data.expire_date}
                placeholder="Enter Expire Date"
                onChange={handleChange}
                autoFocus
              />
              {errors.expire_date && (
                <Alert variant="danger">{errors.expire_date}</Alert>
              )}
            </Form.Group>

            <Form.Control
              type="text"
              name="image"
              value={data.image}
              readOnly
              style={{ display: "none" }}
            />

            <div>
              <label>File:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <h1 align="center">Item List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }

      <div className="tablestyle">
        {
          //-------------------------Display data from database---------------------
        }

          <table className="table table-striped" style={{ height: "55em" }}>
            <tr  class="table-header" style={{ textAlign: "center" }}>
              <td> 
                <b>Item</b> 
              </td>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Category</b>
              </td>
              <td>
                <b>Price</b>
              </td>
              <td>
                <b>R Lvl</b>
              </td>
              <td style={{ width: "110px" }}>
                <b>MFD</b> 
              </td>
              <td style={{ width: "110px" }}>
                <b>EXP</b> 
              </td>
              <td></td>
              <td></td>
              <td></td> 
            </tr> 
            <tbody>{tabRow()}</tbody>
          </table>
      </div>
    </div>
  );
}

export default withRouter(ItemList);
