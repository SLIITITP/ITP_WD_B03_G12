import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';

class Landing extends Component {
  render() {
    return (

      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../img/HomeSlide1.png"
          alt="First slide"
       
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../img/HomeSlide3.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
         
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../img/HomeSlide2.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     
    )
  }
}

export default Landing;
