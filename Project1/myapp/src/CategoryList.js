import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CategoryTableRow from './CategoryTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';


import '../components/CSS/listmain.css';

function CategoryList(props) {
    //read hook
    const [item, setItem] = useState([]);
  
    //insert hook
    const [data, setData] = useState({
        name: '',
        description: '',
      
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
      .get("http://localhost:5000/category/")
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return item.map((object, i) => {
      return <CategoryTableRow obj={object} key={i} />;
    });
  };

  //taking count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/get/count")
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
    console.log(data)
    axios
      .post(`http://localhost:5000/category/add`, data)
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
            Add New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>category_name:</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={data.category}
                placeholder="Enter category Name"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={data.description}
                placeholder="Add description"
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

      <h1 align="center">Category List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>

      {
        //-------------------------Side Menue Buttons-------------------
      }
      
    
        <div className='tablestyle'>
            <div className='buttonframe'>
            <table className='buttonstyle'>
              <tr>
                    <td>       
                        <Link className="nav-link">
                            <p>Add Item</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/store" className="nav-link"> 
                            <p>View Item</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link onClick={handleShow} className="nav-link">
                            <p>Add Category</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/categories" className="nav-link">
                            <p>View Categories</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link   className="nav-link">
                            <p>Add Supplier</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/supplier" className="nav-link">
                            <p>View Suppliers</p>
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
              <b>category</b>
            </td>
            <td>
              <b>description</b>
            </td>
           

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default withRouter(CategoryList);