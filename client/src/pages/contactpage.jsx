import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/contact', { message }, { withCredentials: true });
      setStatus('✅ Message sent successfully!');
      setIsError(false);
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Something went wrong. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" id="contact">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4">📬 Contact Us</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Send Message</button>
          </div>
          {status && (
            <div className={`mt-3 alert ${isError ? 'alert-danger' : 'alert-success'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
