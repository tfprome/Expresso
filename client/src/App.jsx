import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Login';
import Contact from './pages/contactpage';
import Home from './pages/Home';
import Service from './pages/service';
import Blog from './pages/blogpage';
import './app.css'
import Blogshow from './pages/blogshowpage';
import Blogdetails from './pages/blogdetails';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from './layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AdminDashboard from './pages/admin';
import AdminLogin from './pages/adminlogin';



 
function App() {

useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);

  return (    
   <BrowserRouter>
   <Routes>
   <Route path='/admin' element={<AdminDashboard/>}></Route>
   <Route path='/adminlogin' element={<AdminLogin/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/' element={<Signup/>}></Route>
    <Route element={<Layout/>}>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/service' element={<Service/>}></Route>
    <Route path='/blog' element={<Blog/>}></Route>
    <Route path='/blogshow' element={<Blogshow/>}></Route>
    <Route path='/blog/:id' element={<Blogdetails/>}></Route>
    </Route>
    
    </Routes>

   </BrowserRouter>
  )
}

export default App
