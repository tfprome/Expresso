import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import App from './App.jsx'
axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
