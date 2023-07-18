import {useEffect, useState} from 'react'
import { useNavigate ,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Error = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
const {error} = useSelector(state=>state.user);

useEffect(()=>{
  if(error===''){
    navigate("/user")
  }
},[user])

console.log(location.state);
  return (
    <div>
     {location.state ?<div> {location.state.error} </div>: null}.......
    </div>
  )
}

export default Error
