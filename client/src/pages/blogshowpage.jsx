import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogshow = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/blogshow') // Make sure your backend supports this route
      .then(res => {
        setBlogs(res.data);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
      });
  }, []);

  return (
    <div className="container-fluid  bg-success p-2 text-dark bg-opacity-25">
      <h2 className="text-center mb-4 p-2">Latest Blogs</h2>
      <div className="row">
        {blogs.map((blog, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <Link to={`/blog/${blog._id}`}  className="text-decoration-none text-reset">
            <div className="card blog-card h-100 shadow-sm d-flex dlex-column justify-content-between border border-dark">
              {blog.image && (
                <img
                  src={`https://expresso-q4wxuboqm-tfprome-651233fe.vercel.app${blog.image}`}
                  className="card-img-top blog-img"
                  alt="Blog"
                />
              )}
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title font-weight-bold">{blog.title}</h5>
                <p className="card-text">
                  {typeof blog.content === 'string' && blog.content.length > 100
                    ? `${blog.content.substring(0, 100)}...`
                    : blog.content}
                </p>
                {blog.name && (
                  <p className="blog-author">— {blog.name}</p>
                )}
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='footer'>
      <footer className=" bg-dark text-white" style={{ margin: 0, padding: 0, width:'100%' }}>
      <div className="container-fluid text-center px-3 py-4 pb-2">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About</h5>
            <p className="small">
              A platform to share, explore, and inspire through powerful blogs.
              Create your voice and reach the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/blog" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p className="small">
              📧 bloghub@example.com <br />
              📍 123 Blog Street, Writer's City
            </p>
          </div>
        </div>

        <hr className="bg-white" />
        <p className="mb-0 small">© {new Date().getFullYear()} BlogHub. All rights reserved.</p>
      </div>
    </footer></div>
    </div>
    
  );
};

export default Blogshow;
