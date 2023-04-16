import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

function UpdateModel(props) {
  const onUpdate = (id) => {
    axios.put(`http://localhost:5000/service/update/${id}`).then((res) => {
      alert(`updating : ${id}`);
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onUpdate}>Update</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ServicesTableRow = (props) => {
  const [serviceState] = useState({
    service_name: props.obj.service_name,
    service_price: props.obj.service_price,
  });

  const [modalShow, setModalShow] = React.useState(false);

  const onDelete = (id) => {
    axios.get(`http://localhost:5000/service/delete/${id}`).then((res) => {
      alert(`Deleted Successfully : ${id}`);
      window.location.reload();
    });
  };

  const onUpdateReq = (serviceState) => {
    console.log(serviceState);
    setModalShow(true);
  };

  return (
    <tr>
      <UpdateModel show={modalShow} onHide={() => setModalShow(false)} />
      <td>{serviceState.service_name}</td>
      <td>{serviceState.service_price}</td>
      <td>
        <button
          type="submit"
          className="submit"
          onClick={() => onUpdateReq(serviceState)}
        >
          <Link className="nav-link">Update</Link>
        </button>
      </td>
      <td>
        <button
          type="submit"
          className="delete"
          onClick={() => onDelete(props.obj._id)}
        >
          <Link className="nav-link">Delete</Link>
        </button>
      </td>
    </tr>
  );
};

export default withRouter(ServicesTableRow);