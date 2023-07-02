import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <br />
      <br />

      <MDBBtn className="m-1" style={{ backgroundColor: "#3b5998" }} href="#">
        <MDBIcon fab icon="facebook-f" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#55acee" }} href="#">
        <MDBIcon fab icon="twitter" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#ac2bac" }} href="#">
        <MDBIcon fab icon="instagram" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#c61118" }} href="#">
        <MDBIcon fab icon="pinterest" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#ed302f" }} href="#">
        <MDBIcon fab icon="youtube" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#481449" }} href="#">
        <MDBIcon fab icon="slack-hash" />
      </MDBBtn>

      <MDBBtn className="m-1" style={{ backgroundColor: "#333333" }} href="#">
        <MDBIcon fab icon="github" />
      </MDBBtn>

      <br />
      <br />
<Row>
      <Col style={{ width: "10px" }}>
      <p> 
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
          hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam
          nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nulla posuere. Donec vitae dolor Nullam tristique diam non turpis
          Cras placerat accumsan nulla Nullam rutrum Nam vestibulum accumsan
          nisl.
        </p>
      </Col>
      <Col>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
          hendrerit tempor tellus. Donec pretium posuere tellus. Proin quam
          nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nulla posuere. Donec vitae dolor Nullam tristique diam non turpis
          Cras placerat accumsan nulla Nullam rutrum Nam vestibulum accumsan
          nisl.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Turpis cursus in hac habitasse platea dictumst. Sed cras ornare arcu
          dui. Venenatis tellus in metus vulputate eu. Enim praesent elementum
          facilisis leo vel fringilla est ullamcorper. Auctor urna nunc id
          cursus metus aliquam eleifend mi in. Cras sed felis eget velit. Nisl
          condimentum id venenatis a condimentum vitae. Eu volutpat odio
          facilisis mauris sit amet massa. Venenatis a condimentum vitae sapien
          pellentesque habitant. Netus et malesuada fames ac turpis egestas
          integer eget. At erat pellentesque adipiscing commodo. Lacinia quis
          vel eros donec ac odio. Est pellentesque elit ullamcorper dignissim
          cras tincidunt lobortis feugiat vivamus.
        </p>
      </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
