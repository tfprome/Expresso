import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Blogdetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/blog/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading blog...</div>;
  if (!blog) return <div className="text-center mt-5 text-danger">Blog not found.</div>;

  return (
    <div className="container mt-4">
      {blog.image && (
        <img
          src={`http://localhost:5000/${blog.image.replace(/^\/+/, '')}`}
          alt={blog.title}
          className="img-fluid mb-4"
          style={{ maxHeight: '500px', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
        />
      )}

      <h1 className="mb-3">{blog.title}</h1>
      {blog.name && (
        <p className="text-muted mb-4">By {blog.name}</p>
      )}
      <div className="fs-5" style={{ whiteSpace: 'pre-line' }}>
        {blog.content}
      </div>

      <Link to="/blogshow" className="btn btn-outline-secondary mt-5">← Back to Blogs</Link>
    </div>
  );
};

export default Blogdetails;
