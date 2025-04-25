import React from 'react';

const Service = () => {
  const services = [
    {
      title: 'Secure Login',
      description: 'Your data is protected with encrypted login and JWT-based authentication.',
      icon: '🔐',
    },
    {
      title: 'Easy Blog Creation',
      description: 'Write blogs with titles, images, and formatted content in just a few clicks.',
      icon: '📝',
    },
    {
      title: 'Image Uploads',
      description: 'Add life to your blogs with image uploads that enhance your storytelling.',
      icon: '📷',
    },
    {
      title: 'Live Blog Feed',
      description: 'See all the latest blogs from other users and stay inspired!',
      icon: '🔥',
    },
    {
      title: 'Mobile Friendly',
      description: 'Designed to look great on all screen sizes — phone, tablet, or desktop.',
      icon: '📱',
    },
    {
      title: 'Interactive UI',
      description: 'Smooth transitions and a clean interface make blogging a joy.',
      icon: '✨',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold display-5">🚀 What You Can Do on Our Blog Platform</h2>
      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm border-0 p-4 text-center service-card transition">
              <div className="fs-1 mb-3">{service.icon}</div>
              <h5 className="card-title fw-semibold">{service.title}</h5>
              <p className="card-text text-muted">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
