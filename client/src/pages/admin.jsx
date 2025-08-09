import React, { useEffect, useState, useRef } from 'react';
import { Layout, Menu, Table, Card, Typography, Spin,Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Refs for the sections
  const dashboardRef = useRef(null);
  const blogSectionRef = useRef(null);
  const commentSectionRef = useRef(null);
  const adminPanelRef = useRef(null);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const blogRes = await axios.get('/blogshow');
        console.log(blogRes)
        const commentRes = await axios.get('/');
        const adminRes = await axios.get('/admin');
     
        setBlogs(blogRes.data);
        setComments(commentRes.data.comments || commentRes.data);
        
        // Ensure adminRes.data is an array
        const adminData = Array.isArray(adminRes.data.admins) ? adminRes.data.admins : [];
        setAdmins(adminData);

        //console.log(adminRes.data);
        // console.log(Array.isArray(adminData) ? 'Data is an array' : 'Data is not an array');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const handleAdd = async () => {
    const name = prompt('Enter admin name:');
    const email = prompt('Enter admin email:');
    const password = prompt('Enter admin password:');
    if (!name || !email || !password) return alert("All fields are required");
  
    try {
      const res = await axios.post('/admin', { name, email, password });
      setAdmins((prev) => [...prev, res.data]);
      alert('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin');
    }
  };
  
  const handleUpdate = async (admin) => {
    const name = prompt('Update name:', admin.name);
    const email = prompt('Update email:', admin.email);
    if (!name || !email) return;
  
    try {
      const res = await axios.put(`/admin/${admin._id}`, { name, email });
      setAdmins((prev) =>
        prev.map((a) => (a._id === admin._id ? res.data : a))
      );
      alert('Admin updated successfully');
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Failed to update admin');
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this admin?');
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`/admin/${id}`);
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      alert('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Failed to delete admin');
    }
  };

  const handleLogout = () => {
    Cookies.remove('adminToken');
    Cookies.remove('adminName');
    console.log('You have been logged out.');
    navigate('/login');  // Redirect to login page (adjust the path as needed)
  };
  

  const blogColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'name', key: 'author' },
    {
      title: 'Images',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={`http://localhost:5000${image}`}  // DO NOT add `/uploads/` again
          alt="blog"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
  ];

  const commentColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  const menuItems = [
    { label: 'Dashboard', key: '1' },
    { label: 'Manage Blogs', key: '2' },
    { label: 'Manage Comments', key: '3' },
    { label: 'Admin Panel', key: '4' },
  ];

  const handleMenuClick = ({ key }) => {
    const sectionMap = {
      '1': dashboardRef,
      '2': blogSectionRef,
      '3': commentSectionRef,
      '4': adminPanelRef,
    };

    const sectionRef = sectionMap[key];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" items={menuItems} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header
          ref={dashboardRef}
          style={{
            background: '#fff',
            padding: '15px 20px',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            marginLeft: '200px',
            display:'flex',
            justifyContent:'space-between'
          }}
        >
          <Title level={3}>Admin Dashboard</Title>
          <button className='btn btn-danger' onClick={handleLogout}>
                  Logout
                </button>
        </Header>
        <Content style={{ marginLeft: 190, padding: '20px' }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Card ref={blogSectionRef} title="All Blogs" style={{ marginBottom: 20 }}>
                <Table columns={blogColumns} dataSource={blogs} rowKey="_id" pagination={{ pageSize: 4 }} />
              </Card>

              <Card ref={commentSectionRef} title="Latest Comments" style={{ marginBottom: 20 }}>
                <Table columns={commentColumns} dataSource={comments} rowKey="_id" pagination={{ pageSize: 4 }} />
              </Card>

              <Card ref={adminPanelRef} title="Admin Panel" style={{ padding: '5px' }}>
                <Card title="Admin Info" style={{ marginBottom: 20 }}>
                  <button className='btn btn-success' style={{ marginBottom: 10 }} onClick={handleAdd}>+ Add Admin</button>
                  <Table
                    dataSource={admins} // This will always be an array now
                    rowKey="_id"
                    pagination={{ pageSize: 4 }}
                    columns={[
                      { title: 'Name', dataIndex: 'name', key: 'name' },
                      { title: 'Email', dataIndex: 'email', key: 'email' },
                      {
                        title: 'Created At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (date) => new Date(date).toLocaleDateString(),
                      },
                      {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                          <>
                            <button className='btn btn-danger' onClick={()=>handleUpdate(record)}>Update</button>
                            <button className='btn btn-danger'onClick={()=>handleDelete(record._id)} style={{ marginLeft: 8 }}>Delete</button>
                          </>
                        ),
                      },
                    ]}
                  />
                </Card>
              </Card>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
