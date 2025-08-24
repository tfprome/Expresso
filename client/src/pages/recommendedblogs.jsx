import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';

const RecommendedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    axios.get('/blogshow')
      .then((res) =>{
        setBlogs(res.data)
        setLoading(false);
      } )
      .catch(err => console.error('Error fetching recommended blogs:', err));
  }, []);

  const NextArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{
        right: '-30px',
        zIndex: 2,
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: '10px',
        position: 'absolute',
        top: '40%',
        cursor: 'pointer',
      }}
    >
      <FaArrowRight size={20} color="black" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{
        left: '-50px',
        zIndex: 2,
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: '10px',
        position: 'absolute',
        top: '40%',
        cursor: 'pointer',
      }}
    >
      <FaArrowLeft size={20} color="black" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="container mt-5 position-relative">
      <h4 className="mb-4">Recommended Blogs</h4>
      {loading?
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
   :<Slider {...settings}>
        {blogs.map(blog => (
          <div key={blog._id} className="px-2">
            <div
              className="card shadow-sm d-flex flex-column justify-content-between"
              style={{ height: '360px', width: '95%', margin: 'auto', overflow:'hidden' }}
            >
              {blog.image && (
                <img
                  src={`https://expresso-q4wxuboqm-tfprome-651233fe.vercel.app/${blog.image.replace(/^\/+/, '')}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title mb-2">{blog.title}</h6>
                <p className="card-text" style={{ fontSize: '0.85rem', flexGrow: 1,         textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        marginBottom: 'auto' }}>
                  {blog.content && blog.content.length > 80
                    ? blog.content.substring(0, 80) + '...'
                    : blog.content}
                </p>
                
                <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-outline-primary mt-2 w-50">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>}
    </div>
  );
};

export default RecommendedBlogs;
