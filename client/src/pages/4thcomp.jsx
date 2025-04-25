//import { Color } from "antd/es/color-picker";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo4th from '../assets/logo4th.png'

const RunYourBlogEfficiently = () => {
    const navigate=useNavigate();
  return (
    <div
      className="container-fluid py-5 px-4 mt-4"
      style={{ backgroundColor: "#f96f5d" }} // Close to the Wix coral-orange tone
    >
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-md-5 text-black">
          <h1 className="fw-bold mb-4 me-4 display-5">Run your blog more efficiently</h1>

          <div className="mb-4 me-4">
            <h4 className="fw-semibold text-dark">Schedule</h4>
            <p>
              Write when you feel inspired and schedule posts to go live at the best time for you.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fw-semibold text-dark">Collaborate</h4>
            <p>
              Give multiple writers and editors access to your blog platform so they can help manage your content.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fw-semibold text-dark">Blog anywhere</h4>
            <p>
              Download the app to write content and manage your blog anytime, anywhere.
            </p>
          </div>

          <button className="btn btn-dark btn- mt-3 rounded-pill px-4 py-2" onClick={()=>{navigate('/blog')}}>Start Blogging</button>
        </div>

        {/* Right Image Section */}
        <div className="col-md-7 d-flex justify-content-center mt-4 mt-md-0">
          <div className="position-relative ms-4">
            <img
              src={logo4th}
              alt="Blog Screenshot"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "90%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunYourBlogEfficiently;
