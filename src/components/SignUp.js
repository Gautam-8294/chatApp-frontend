import React, { useState } from 'react'
import '../style/signup.css'
import axios from '../api/axios.js'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    // axios.post("/signup")
    const [detail, setDetail] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleInput =(event)=>{
        setDetail({...detail, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event)=>{
        console.log(detail)
        event.preventDefault();
        axios.post("signup",detail)
        .then((response)=>{
          console.log(response)
          if(response.data.message === "User already Exist"){
            alert("User already exist");
          }
          navigate("/login");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className='signup_page'>
      <Link to ='/login'><button name="login"  className="signup_button">Login</button></Link>
      <form onSubmit={handleSubmit} method="post">
        <div className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Let's create your account!</div>
            <div className="input-container ic1">
              <input name="username" id="firstname" className="input" type="text" placeholder=" " onChange={handleInput} required autoComplete='off'/>
              <div className="cut"></div>
              <label for="firstname" className="placeholder">Username</label>
            </div>
            <div className="input-container ic1">
              <input name="userId" id="lastname" className="input" type="text" placeholder=" " onChange={handleInput} required autoComplete='off'/>
              <div className="cut"></div>
              <label for="firstname" className="placeholder">User Id</label>
            </div>
            <div className="input-container ic2">
              <input name="email" id="email" className="input" type="email" placeholder=" " onChange={handleInput}  required/>
              <div className="cut"></div>
              <label for="email" className="placeholder">Email</label>
            </div>
            <div className="input-container ic2">
              <input name="password"  className="input" type="password" placeholder=" " onChange={handleInput} required/>
              <div className="cut cut-short"></div>
              <label for="password" className="placeholder">Password</label>
            </div>
            
          </div>
            <button type="text" className="submit">Sign Up</button>
    </form>
    </div>
  )
}

export default SignUp
