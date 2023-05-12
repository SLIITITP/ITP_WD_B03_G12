
import {Link} from "react-router-dom";
import { withRouter } from "./withRouter";
import "../components/CSS/navbar.css";

import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';

class PrintHeader extends Component {
  render() {
    const topic ={
        color:"blue",
        backgroundColor: "gray",
        textAlign: 'right',
        textTransform: 'uppercase',
        textDecorationLines: "line-through",
        textAlignmentsVertical:"auto"
    };
    const address ={
        color:"blue",
        textAlign: 'right',    
    }
    const contacts ={
        color:"blue",
        textAlign: 'right',
    }
    const img = {
       
    }
    return (
        <>

                <h1 style={topic}>Happy Paws Pet CLINIC</h1>
                <img style ={img} src="../img/appLogo.png" className="app-logo" alt="home" />                
                    <h4 style={address}>3147 patterson Street,Houston TX,772</h4>
                    <h6 style={contacts}>info@happypaws.com</h6>
                    <h6 style={contacts}>www.happypaws.com</h6>
                    <h6 style={contacts}>0112-354354</h6>
                    
        </>
        )
  }
}

export default PrintHeader;
