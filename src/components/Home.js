import React from 'react'
import '../style/home.css'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const handleLoginButton = (event)=>{
    console.log(event);
    navigate("/login")
  }
  const handleSignUpButton = (event)=>{
    console.log(event);
    navigate("/signup")
  }

  
  return (
    <div className='body_container' style={{ marginTop: "40px" }}>
      <div>Welcome Home</div>
      <button onClick={handleLoginButton}>Login</button>
      <button onClick={handleSignUpButton}>SignUp</button>
    </div>
  )
}

export default Home
