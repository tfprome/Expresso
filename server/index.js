import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { fileURLToPath } from 'url'
import Employeemodel from './models/employee.js'
import Blogmodel from './models/blogscheema.js'
import Comment from './models/commentschema.js'
import Admin from './models/adminmodel.js'
import upload from './middleware/multermiddleware.js'
import path from 'path'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: '*'}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// ✅ MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// ================= AUTH ROUTES =================

// User Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  Employeemodel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          //console.log(result)
          if (err) return res.status(500).json('Server error');
          if (!result) return res.status(401).json('Wrong password');

          const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
          res.json({ message: "Login successful", token, user });
        });
      } else {
        res.status(404).json("No registered record");
      }
    })
});

// User Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await Employeemodel.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json('User already exists');
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new Employeemodel({ name, email, password: hashedpassword });
    await newuser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error during signup', error });
  }
});


// ================= BLOG ROUTES =================

// Create Blog
app.post('/blog', upload.single('image'), async (req, res) => {
  const { title, content, name } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  try {
    const newBlog = await Blogmodel.create({ title, content, image, name });
    res.status(200).json(newBlog);
  } catch (e) {
    console.log('Error posting blog:', e);
    res.status(500).json({ error: 'Error posting blog' });
  }
});

// Show all blogs
app.get('/blogshow', async (req, res) => {
  try {
    const blogdata = await Blogmodel.find();
    res.json(blogdata);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

// Single blog
app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blogmodel.findById(req.params.id);
    if (!blog) return res.status(404).json('Blog not found');
    return res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});


// ================= COMMENT ROUTES =================

// Add comment / contact message
app.post('/contact', async (req, res) => {
  try {
    const { message } = req.body;
    const name = req.cookies.username; // <- username from cookie
    if (!message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const newComment = new Comment({ name, message });
    await newComment.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Show all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }); // newest first
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= ADMIN ROUTES =================

// Admin login
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }
    // ⚠️ Plain text password (should hash in production)
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

// Fetch admin dashboard data
app.get('/admin', async (req, res) => {
  try {
    const blogs = await Blogmodel.find().sort({ createdAt: -1 });
    const comments = await Comment.find().sort({ createdAt: -1 });
    const admins = await Admin.find();
    res.json({ blogs, comments, admins });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new admin
app.post('/admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists with this email' });
    }
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
      { new: true }
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


// ================= SERVER =================
app.listen(5000, () => {
  console.log('🚀 Server is running on port 5000');
});
