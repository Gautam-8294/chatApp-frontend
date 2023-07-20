import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'
import axios from '../api/axios.js'
import { useDispatch, useSelector } from 'react-redux'
import Home from './Home'

let user ={};
const Login = () => {
  axios.defaults.withCredentials =true;
  const navigate = useNavigate();
    const [detail, setDetail] = useState({
        email: "",
        password: ""
    })
    const [userDetail,setUserDetail] = useState({});
    const handleInput =(event)=>{
        setDetail({...detail, [event.target.name]: event.target.value})
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{axios.post("login",detail)
        .then((response)=>{
          // console.log(response);
          // setUserDetail(response.data.result);
          user = response.data.result;
          const token = response.data.jwt_token;
          // window.localStorage.setItem("user",JSON.stringify(user));
          window.localStorage.setItem("jwt_token",token);
          window.localStorage.setItem("isLoggedIn",true);
          document.cookie = `jwt_token=${token}`;
          console.log(response.cookies);
          navigate('/user');
        })
        .catch((err)=>{
            console.log(err);
            if(err.message ==="Request failed with status code 401"){
              alert("Wrong Credential");
            }else if(err.message ==="Request failed with status code 422"){
              alert("User doesn't exist");
            }

             navigate('/error',{state:{error:err.message}})
        })}catch(err){
          console.log(err);
        }
    }
  return (
    <div className='login_page'>
      <form onSubmit={handleSubmit} method="post">
        <div className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Log in your account!</div>
            <div className="input-container ic2">
              <input name="email" id="lastname" className="input" type="email" placeholder=" " onChange={handleInput} required/>
              <div className="cut"></div>
              <label for="email" className="placeholder">Email</label>
            </div>
            <div className="input-container ic2">
              <input name="password" id="email" className="input" type="password" placeholder=" " onChange={handleInput} required/>
              <div className="cut cut-short"></div>
              <label for="password" className="placeholder">Password</label>
            </div>
            <button name="" type="submit" className="submit">Log in</button>
          </div>
    </form>
    <Link to ='/signup'><button name="signup"  className="signup_button">Sign Up</button></Link>
    </div>
  )
// }
}
export {user}
export default Login