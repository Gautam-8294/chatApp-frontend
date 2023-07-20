import React from 'react'
import '../style/user.css'
import { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
// import { user } from './Login'
import axios from '../api/axios.js'
import { useSelector, useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import io from "socket.io-client"
import { getFriends, getUserDetails } from '../redux/slices/userSlice'
import store from '../redux/store'

// const ENDPOINT = "http://localhost:5000";
// const ENDPOINT = "https://chat-app-gautam-8294.vercel.app/";
const ENDPOINT = "https://chatapp-fqlj.onrender.com/";
let socket;
// console.log(document.cookie.split("=")[1]);
// console.log(window.localStorage.getItem('jwt_token'));

const User = () => {
    axios.defaults.withCredentials = true;
    const [socketConnected, setSocketConnected] = useState(false);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {user, friend,error} = useSelector(state=>state.user)

    
    useEffect(()=>{
        dispatch(getUserDetails());
        dispatch(getFriends());
    },[])
    
    useEffect(() => {
        
        socket = io(ENDPOINT);
        socket.emit("setup",user)
        socket.on("connect",()=>{
            const engine = socket.io.engine;
            socket.auth = user.id;
            console.log(socket.id);
            engine.on("close", (reason) => {
                console.log(reason);
            });
            
            socket.io.on("reconnect", () => {
                console.log("reconn");
            });
            
        });
        
        
    },[user])  
    useEffect(()=>{
        if(error !== ""){
            navigate('/error',{state:{error:error}})
            
        }
    },[user])
    // useEffect(()=>{
    //     if(error === ""){
    //         navigate('/error',{state:{error:error}})
    //         socket.on("connect",()=>{
    //             navigate("/user")
    //         })
    //     }
    // },[])
    
    useEffect(() => {
        socket.on("message recieved",(newMessageRecieved)=>{
            console.log(newMessageRecieved);
            dispatch(getFriends());
        })
        
        
    })

    
    
    
    return (
        <div className='body_container' style={{ marginTop: "40px" }}>
            <LeftContainer />
            <RightContainer />
        </div>
    )
}

export default User
