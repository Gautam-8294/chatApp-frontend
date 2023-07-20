import React, { useEffect, useState } from 'react'
import '../style/leftcontainer.css'
import axios from '../api/axios.js'
import { Chaticon, Communityicon, Filtericon, Menuicon, Searchicon, Statusicon } from '../assets/communityicon.js'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends, getUserDetails, setFriendArray, setFriendId } from '../redux/slices/userSlice'


let socket;
// const ENDPOINT = "http://localhost:5000";
// const ENDPOINT = "https://chat-app-gautam-8294.vercel.app/";
const ENDPOINT = "https://chatapp-fqlj.onrender.com/";
socket = io(ENDPOINT);
const SearchBoX = ({ placeholder }) => {
    return (
        <div className='search_box_container'>
            <div className='search_box'>
                <Searchicon />
                <input type='search' placeholder={placeholder} />
            </div>
            <div>
                <Filtericon />
            </div>
        </div>
    );
}

const LeftContainer = () => {
    axios.defaults.withCredentials = true;
    const user = useSelector(state=>state.user.user)
    const friend = useSelector(state=>state.user.friend)
    const friendId = useSelector(state=>state.user.friendId)
    const [addFriendClass, setAddFriendClass] = useState("add_friend");
    const [addFriend, setAddFriend] = useState({friendId:""});
    const [isAdd, setIsAdd] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
  
    
    const handleLogout = async()=>{
        try{
            axios.post("/logout",{isLogout: "true"}).then((response)=>{
                console.log(response);
            }).catch(err=>{
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
        window.localStorage.clear();
        document.cookie = "jwt_token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        dispatch(getUserDetails());
        dispatch(getFriends());
        navigate("/login");
    }
    const handleRightContainer = (event) => {
        event.preventDefault();
        if (event.type === "click") {
            console.log("event hai", event);
            console.log("Phase", event.eventPhase);
            console.log("even is mine", event.currentTarget.getAttribute('friendhai'));
            const uniqueId = event.currentTarget.getAttribute('friendhai');
            dispatch(setFriendId(uniqueId));
            console.log(uniqueId);
            
            socket.emit("join chat",uniqueId)

        }
    }

    

    
    const add_friend_dropdown = {
        display: "block",
    }
    const handleFriend = async(event) => {
        setIsAdd(()=>{setIsAdd(!isAdd)});
        console.log(isAdd);
        isAdd ? setAddFriendClass(  add_friend_dropdown) : setAddFriendClass("add_friend") 
        return (
            <div className={addFriendClass}><input type='search' placeholder='Add Friend' /></div>
        )
    }
    const handleAddFriend = async (event) => {
        event.preventDefault();
        console.log(addFriend);
        try {
            axios.post("addfriend", {myId:user.id,myName:user.name,addFriend}).then((response) => {
                console.log(response);
                dispatch(getFriends());
            }).catch((err) => { 
                if(err.response.data.message ==="User doesn't exist"){
                    alert("User doesn't Exist")
                }
                console.log(err); 
            })
        }
        catch (err) {
            console.log(err);
        }
        
    }
    

    
    

    
    return (
        <div className='left_container_main'>
            <div className='profile'>
                <div className='profile_image'><img src='./logo512.png' /></div>
                <div className='profile_right'>
                    <div>{user.name}</div>
                    <div className="community_icon" onClick={handleFriend}><Communityicon /></div>
                    <div><Statusicon /></div>
                    <div><Chaticon /></div>
                    <div><Menuicon /></div>
                    <button style={{color:"rgba(0, 255, 213, 0.884)", border:"1px solid rgba(0, 255, 213, 0.884)"}} onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className={addFriendClass}>
                <div className='search_box_container'>
                    <div className='search_box'>
                        <Searchicon />
                        <form onSubmit={handleAddFriend}  method='post'><input type='search'  placeholder="Add Friend" name="friendId" onKeyUp={(event)=>{ setAddFriend({...addFriend, [event.target.name]: event.target.value}) }} /></form>
                        
                    </div>
                </div>
            </div>
            <SearchBoX placeholder="Search or start new chat" />



            <div className='left_container_friend_container'>
                
                <div className='left_container_message_container'>
                    {friend.map((da) => {
                        // console.log(da.id);
                        return (
                            <div className='left_container_message ' key={da.id} friendhai={da.id} onClick={handleRightContainer}>
                                <div className='profile_image'>
                                    <img src='./logo512.png' />
                                </div>
                                <div className='left_container_message_right'>
                                    <div className='left_container_friend_name' >{da.name}{da.id === user.id ? <span style={{color: "rgba(12, 240, 202, 0.884)"}}>(yourself)</span>: null}</div>
                                    <div className='left_container_last_message'>{!da.message[0] ? "Tap to Start Chat" : da.message[da.message.length - 1].messageContent}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>



            </div>
        </div>
    )
}
export default LeftContainer;
