import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:5000');
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
    setIsExpanded(true); // Show "Show Less" button when more comments are visible
  };

  const showLess = () => {
    setVisibleCount(4); // Reset to 4 comments
    setIsExpanded(false); // Hide the "Show Less" button when collapsed
  };

  return (
    <div className="container my-5" id="comments">
      <h3 className="text-center mb-4">What People Are Saying</h3>
      <div className="comments-list">
        {comments.slice(0, visibleCount).map((comment, index) => (
          <div
            key={index}
            className="comment-item"
            data-aos="fade-right"
            data-aos-delay={`${index * 100}`} // Animation delay for each comment
          >
            <h6>{comment.name}</h6>
            <p>{comment.message}</p>
            <small className="text-muted">
              {new Date(comment.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
      {visibleCount < comments.length && !isExpanded && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={loadMore}>
            Show More
          </button>
        </div>
      )}
      {isExpanded && (
        <div className="text-center">
          <button className="btn btn-outline-secondary" onClick={showLess}>
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
