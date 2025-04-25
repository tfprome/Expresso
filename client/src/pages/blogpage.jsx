import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blog = (props) => {
  const [name,setName]=useState('')
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [image,setImage]=useState();
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('name', name)

    try{
      const data=await axios.post('/blog',formData, {headers: {'Content-Type': 'multipart/form-data'},})
      console.log("blog submitted:",data)
      setTitle('')
      setContent('')
  }
  catch(e){
    console.log('error submitting data:',e)
  }
  }

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const nameCookie = cookies.find(row => row.startsWith('username='));
    if (nameCookie) {
      const username = nameCookie.split('=')[1];
      setName(username);
    }
  }, []);
    return (
        
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Submit Your Blog</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label  className="form-label">Title</label>
                    <input type="text" className="form-control" id="name" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Blog</label>
                    <textarea type="text" className="form-control" id="content" onChange={(e)=>setContent(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                  <button type="submit" className="btn btn-primary w-100" onClick={()=>{navigate('/home')}} >Submit</button>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Blog;