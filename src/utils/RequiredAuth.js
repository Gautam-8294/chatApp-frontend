import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import User from '../components/User'
import { useSelector } from 'react-redux'
const RequiredAuth = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    return ()=>{};
  },[])
  const loading = useSelector(state=>state.user.loading);
  // const handleLoginButton = (event)=>{
  //   console.log(event);
  //   navigate("/login")
  // }
  if(!document.cookie && (document.cookie.split("=")[1] !== window.localStorage.getItem('jwt_token'))){
    return (
      <Navigate to="/login" />
    
    )
  }
  
  // if(loading===false && window.localStorage.getItem("isLoggedIn")!== true){
  //   return (
  //     <Navigate to="/login" />
    
  //   )
  // }
  
  return <User />;
}

export default RequiredAuth
