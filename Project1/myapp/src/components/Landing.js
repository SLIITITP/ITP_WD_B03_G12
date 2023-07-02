import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isParagraphVisible: false,
    };
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
      <Carousel>
   <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to Happy Paws!</h2>
          {isParagraphVisible && (
            <p style={{ textAlign: 'center', fontSize: '18px', color: 'black', fontStyle: 'italic' }}>
              Working with animals, despite the regular contretemps, adds up to a rewarding and fulfilling life, which is confirmed by the fact that most vets seem to be happy men.
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
      
      
    );
  }
}

export default Landing;
