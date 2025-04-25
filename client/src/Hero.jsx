import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';  // Slick CSS
import 'slick-carousel/slick/slick-theme.css';  // Slick theme CSS
import logo1 from './assets/blog1.jpg'
import logo2 from './assets/blog2.jpg'
import logo3 from './assets/blog3.jpg'
import logo4 from './assets/blog4.jpg'
import { useNavigate } from 'react-router-dom';
import "././assets/img-cover.css"

const Hero = () => {
  const navigate=useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <section className="hero-section">
        <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">Welcome to Expresso</h1>
        <p className="hero-subtitle">Explore Our Latest Posts & Services</p>
        <button className='btn btn-danger' onClick={()=>{navigate('/blog')}}>Express your thoughts</button>
      </div></div>
      {/* Slick Carousel */}
      <div className='hero-slider-container'>
      <Slider {...settings} className="hero-slider">
        <div className="cover-container">
          <img src={logo1}className="cover-image" alt="Slide 1" />
        </div>
        <div  className="cover-container">
          <img src={logo2} className="cover-image"alt="Slide 2" />
        </div>
        <div  className="cover-container">
          <img src={logo3} className="cover-image"alt="Slide 3" />
        </div>
        <div  className="cover-container">
          <img src={logo4} className="cover-image" alt="Slide 4" />
        </div>
      </Slider></div>
    </section>
  );
};

export default Hero;
