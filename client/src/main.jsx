import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import App from './App.jsx'
axios.defaults.baseURL = 'https://expresso-q4wxuboqm-tfprome-651233fe.vercel.app';
// axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
