import React from 'react';

import Navbar from '../Navbar';
import Hero from '../Hero';
import RecommendedBlogs from './recommendedblogs';
import RunYourBlogEfficiently from './4thcomp';
import CommentsSection from './5thcomp';

const Home = () => {
  return(
    <div>
      {/* <Navbar/> */}
      <Hero/>
      <RecommendedBlogs/>
      <RunYourBlogEfficiently/>
      <CommentsSection/>
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
)};

export default Home;