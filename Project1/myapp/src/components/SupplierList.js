import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import SupplierTableRow from './SupplierTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';
import ReactToPrint from 'react-to-print'; 

import { SupplierPrint } from './SupplierPrint';
import '../components/CSS/listmain.css';

function SupplierList(props) {
  const componentRef = useRef(); 
    //read hook
    const [item, setItem] = useState([]);
  
    //insert hook
    const [data, setData] = useState({
        company_name: '',
        person1_first_name: '',
        person1_last_name: '',
        person2_first_name:'',
        person2_last_name:'',
        email1:'',
        email2:'',
        contact_no1:'',
        contact_no2:'',
        registerd_date:'',

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
    console.log(data)
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
  };

    return (
        <div>
           <ReactToPrint
      documentTitle='Our Supplier list' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
                        <Link to="/additem" className="nav-link">
                            <p>Add Category</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link to="/category" className="nav-link">
                            <p>View Categories</p>
                        </Link>                 
                    </td>
                </tr>
                <tr>
                    <td>       
                        <Link onClick={handleShow}   className="nav-link">
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
        <SupplierPrint ref={componentRef}>
        <table className="table table-striped" style={{ width: "54em" }}>
          <tr>
            <td>
              <b>company_name</b>
            </td>
            <td>
              <b>first_name</b>
            </td>
            <td>
              <b>last_name</b>
            </td>
            <td>
              <b>email1</b>
            </td>
            <td>
              <b>contact_no1</b>
            </td>
            <td>
              <b>contact_no2</b>
            </td>
            <td>
              <b>registerd_data</b>
            </td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </SupplierPrint>
      </div>
    </div>
  );
}
export default withRouter(SupplierList);