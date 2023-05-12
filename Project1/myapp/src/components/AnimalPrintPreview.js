import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimalTableRow from "./AnimalTableRow";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "./withRouter";

import "../components/CSS/listmain.css";
import { response } from "express";
import { set } from "mongoose";
import { AnimalPrint } from "./AnimalPrint";

function AnimalList(props) {


    //read hook
    const [animal, setAnimal] = useState([]);

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
    return service.map((object, i) => (
      <tr key={object._id}>
        <td style={{ display: "none" }}>{object._id}</td>
        <td>{object.animal_name}</td>
        <td>{object.animal_type}</td>
        <td>{object.animal_breed}</td>
        <td>{object.animal_gender}</td>
        <td>{object.DOB}</td>
        <td>{object.date}</td>
      </tr>
    ));
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


  const componentRef = useRef(); 
 
  return (
    <div>
      
      <ReactToPrint
      documentTitle='Our Animals' 
      trigger={() => <Button style={{float:'right'}}>Print</Button>}
      content={() => componentRef.current} ></ReactToPrint>
     
    <AnimalPrint ref={componentRef}>

    <PrintHeader/>
    
      <h1 align="center">AnimalList List</h1>
      <h4 className="text-right">
        <b>Total: {count}</b>
      </h4>
      
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
          </tr>
          <tbody>{tabRow()}</tbody>
        </table>
        </AnimalPrint>
      
    </div>
  );
};


export default withRouter(AnimalList);
