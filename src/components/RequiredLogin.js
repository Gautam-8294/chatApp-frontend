import { Navigate, useNavigate } from 'react-router-dom'
import User from '../components/User'
import Login from './Login';




const RequiredLogin = () => {
  const navigate = useNavigate();



  const handleLoginButton = (event)=>{
    console.log(event);
    navigate("/login")
  }
 
  if(document.cookie && document.cookie.split("=")[0] === "jwt_token"){
    return (
      <Navigate to="/user" />
    
    )
  }
  
  
  return <Login/>;
}

export default RequiredLogin