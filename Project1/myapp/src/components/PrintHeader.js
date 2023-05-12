import React from "react";
import { Link } from "react-router-dom";
import "../components/CSS/navbar.css";
 
const PrintHeader = () => {
  const topicStyle = {
    color: "blue",
    backgroundColor: "gray",
    textAlign: "right",
    textTransform: "uppercase",
    marginTop: "25px",
    verticalAlign: "auto",
  };

  const addressStyle = {
    color: "blue",
    textAlign: "right",
  };

  const contactsStyle = {
    color: "blue",
    textAlign: "right",
  };

  const imgStyle = {};

  return (
    <>
      <h1 style={topicStyle}>Happy Paws Pet CLINIC</h1>
      <div className="row" style={{marginBottom: "30px"}}> 
        <div className="col1"style={{ textAlign: "start" }}>
          <img
            style={imgStyle}
            src="../img/appLogo.png"
            className="app-logo"
            alt="home"
          />
        </div> 
        <div className="col">
          <h4 style={addressStyle}>3147 patterson Street, Houston TX, 772</h4>
          <h6 style={contactsStyle}>info@happypaws.com</h6>
          <h6 style={contactsStyle}>www.happypaws.com</h6>
          <h6 style={contactsStyle}>0112-354354</h6>
        </div>
      </div>
    </>
  );
};

export default PrintHeader;
 