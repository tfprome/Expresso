import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import Employeemodel from './models/employee.js'
import Blogmodel from './models/blogscheema.js'
import Comment from './models/commentschema.js'
import Admin from './models/adminmodel.js'
import upload from './middleware/multermiddleware.js'
import path from 'path';
import cookieParser from 'cookie-parser'


const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173', // Your frontend URL (change this if it's different)
  credentials: true}))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Use this to access the secret


mongoose.connect('mongodb://localhost:27017/employee')
.then(console.log('db connected'))

app.post('/login',(req,res)=>{
  const {email,password}=req.body
  Employeemodel.findOne({email:email})
  .then(user=>{
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
          if(err)
           res.json('wrong pass')
          else{
            const token=jwt.sign({id:user._id,},process.env.JWT_SECRET_KEY,{ expiresIn: '1h' });
            console.log(token)
            res.json({ message: "Login successful", token, user });
          }
        })
    }
    else{
      res.json("No Register record")
    }
  })

})


app.post('/signup',async(req,res)=>{
  const {name,email,password}=req.body;
  console.log('Received data:', { name, email, password });
  try{
    const existinguser= await Employeemodel.findOne({email:email})
    if(existinguser){
      return res.status(400).json('user already exists')
    }
    const hashedpassword= await bcrypt.hash(password,10)
    const newuser=new Employeemodel({name,email,password:hashedpassword})
    await newuser.save();
    res.status(201).json({ message: 'User created successfully' });
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Error during signup', error });
  }
})

app.post('/blog',upload.single('image'),async(req,res)=>{
  const {title,content,name}=req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; 
  console.log('Uploaded file:', req.file);
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  try{
    const newBlog=await Blogmodel.create({title,content,image,name})
    res.status(200).json(newBlog)
  }
  catch(e){
    console.log('error posting:',e)
  }
 
})

app.get('/blogshow',async(req,res)=>{
  const blogdata= await Blogmodel.find()
  return res.json(blogdata)
})


app.get('/blog/:id',async(req,res)=>{
  const blog=await Blogmodel.findById(req.params.id)
  if(!blog)
    return res.status(500).json('Blog not found')
  else
    return res.json(blog);
})

app.post('/contact', async (req, res) => {
  try {
    const { message } = req.body;
    const name = req.cookies.username; // <- username from cookie
    console.log('Received Message:', message);  // Log the message
    console.log('Received Username:', name);
    console.log(req.cookies) 

    if ( !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newComment = new Comment({name,message});

    await newComment.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // newest first
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // If you're not hashing the password, directly compare it
    if (password !== admin.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    // Fetch blogs and comments
    const blogs = await Blogmodel.find().sort({ createdAt: -1 });
    const comments = await Comment.find().sort({ createdAt: -1 });
    const admins = await Admin.find();
    // Respond with both blogs and comments data
     res.json({ blogs, comments,admins });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Optional: Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists with this email' });
    }

    // Create and save admin
    const newAdmin = new Admin({ name, email, password, createdAt: new Date() });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an admin
app.put('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email },
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete an admin
app.delete('/admin/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully', admin: deletedAdmin });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(5000,()=>{
    console.log('Server is running')
})