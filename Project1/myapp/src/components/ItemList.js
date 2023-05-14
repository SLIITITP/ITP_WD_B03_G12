import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import ItemsTableRow from './ItemsTableRow'
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from './withRouter';
import ReactToPrint from 'react-to-print'; 
import { ItemPrint } from './ItemPrint';


import '../components/CSS/listmain.css';



function ItemList(props) {
  const componentRef = useRef(); 
    //read hook
    const [item, setItem] = useState([]);
  
    //insert hook
    const [data, setData] = useState({
        name: '',
        category: '',
        price: '',
        Supplier:'',
        description:'',
        qty:'',
        manufacture_date:'',
        expire_date:'',
        image:'',

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
  const [fileName, setFileName] = useState('');
   const [file, setFile] = useState(null);

   const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');

    setData((prev) => ({
      ...prev,
      image: selectedFile ? selectedFile.name : '',
    }));


   };
  

  //send new data to database
  const handleClick = (e) => {
    e.preventDefault();
    console.log(data)

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success
      console.log('File uploaded successfully');
    } catch (error) {
      // Handle error
      console.log('Error uploading file:', error);
    }


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
  };

  

    return (
        <div>
           <ReactToPrint
      documentTitle='Our Item list' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>



            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
            </Form.Group>

           
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
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
      
    
        <div className='tablestyle'>
            <div className='buttonframe'>
            <table className='buttonstyle'>
              <tr>
                    <td>       
                        <Link onClick={handleShow} className="nav-link">
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
                        <Link  className="nav-link">
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
          //-------------------------Display data from database---------------------
        }
        <ItemPrint ref={componentRef}>
        <table className="table table-striped" style={{ width: "54em", height: "55em" }}>
          <tr >
          <td>
              <b>image</b>
            </td>
            <td>
              <b>name</b>
            </td>
            <td>
              <b>category</b>
            </td>
            <td>
              <b>price</b>
            </td>
            <td>
              <b>Supplier</b>
            </td>
            <td>
              <b>description</b>
            </td>
            <td>
              <b>qty</b>
            </td>
            <td>
              <b>manufacture_date</b>
            </td>
            <td>
              <b>expire_date</b>
            </td>

          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </ItemPrint>
      </div>
    </div>
  );
}


export default withRouter(ItemList);