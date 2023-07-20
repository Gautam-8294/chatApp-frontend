import './App.css';
// import axios from './api/axios.js';
import Home from './components/Home';
// import Icon from '@mui/material/Icon';
// import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
// import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import User from './components/User';
import RequiredAuth from './utils/RequiredAuth';
import Error from './components/Error';
import RequiredLogin from './components/RequiredLogin';




function App() {

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const jwt_token = window.localStorage.getItem("jwt_token");

  useEffect(()=>{},[])

  const [hello, setHello] = useState([]);

  
  // isLoggedIn ? <User /> : <Login />
  
  return (
    <>
    {/* <Navbar /> */}
    {hello}
    <Routes>
      <Route path='/' element ={<Home />}></Route>
      <Route path='user' element ={<RequiredAuth />}></Route>
      <Route path='about' element ={<About />}></Route>
      <Route path='login' element ={<RequiredLogin />}></Route>
      <Route path='signup' element ={<SignUp />}></Route>
      <Route path='error' element ={<Error />}></Route>
    </Routes>
    </>
  );
}

export default App;
