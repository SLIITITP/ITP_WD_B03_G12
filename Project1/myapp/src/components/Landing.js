import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col } from "react-bootstrap";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isParagraphVisible: false,
    };

    this.dummySentences = [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Donec hendrerit tempor tellus.",
      "Donec pretium posuere tellus.",
      "Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.",
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      "Nulla posuere.",
      "Donec vitae dolor.",
      "Nullam tristique diam non turpis.",
      "Cras placerat accumsan nulla.",
      "Nullam rutrum.",
      "Nam vestibulum accumsan nisl.",
    ];
  }

  componentDidMount() {
    // Delaying the visibility of the paragraph using a timeout
    setTimeout(() => {
      this.setState({ isParagraphVisible: true });
    }, 2000);
  }

  render() {
    const { isParagraphVisible } = this.state;
    return (
      <div style={{ backgroundColor: "#f2f2f2", padding: "20px", borderRadius:"20px" }} >
        <Carousel>
          <div style={{padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Welcome to Happy Paws!
            </h2>
            {isParagraphVisible && (
              <p
                style={{  
                  textAlign: "center",
                  fontSize: "18px",
                  color: "black",
                  fontStyle: "italic",
                }}
              >
                Working with animals, despite the regular contretemps, adds up
                to a rewarding and fulfilling life, which is confirmed by the
                fact that most vets seem to be happy men.
              </p>
            )}
          </div>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../img/HomeSlide1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../img/HomeSlide3.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../img/HomeSlide2.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
   
        <Container style={{ marginTop:"20px" }}> 
          <Row className="show-grid" style={{ marginBottom:"60px"}}>   
            <Col    
              style={{ background: "#694fa029", borderRadius:"20px", marginRight: "5px" }}
            > 
              <br /> 
              {this.dummySentences.slice(0, 6).join(" ")}
            </Col>
            <Col
              style={{ background: "#694fa029", borderRadius:"20px", marginRight: "5px" }}
            >
              <br />
              {this.dummySentences.slice(0, 4).join(" ")}
            </Col>
            <Col
              style={{ background: "#694fa029", borderRadius:"20px", marginRight: "5px" }}
            >
              <br />
              {this.dummySentences.slice(0, 6).join(" ")}
            </Col>
            <Col  style={{ background: "#694fa029", borderRadius:"20px" }}>
              <br />
              {this.dummySentences.slice(0, 2).join(" ")}
              <br />
            </Col>
 
          </Row>
        </Container>
      </div>
    );
  }
}

export default Landing;
