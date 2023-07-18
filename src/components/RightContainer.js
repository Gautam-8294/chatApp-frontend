import React, { useEffect, useState } from 'react'
import '../style/rightcontainer.css'
import { Attachicon, Menuicon, Micicon, Searchicon, Smileyicon } from '../assets/communityicon'
import axios from '../api/axios.js'
import io from 'socket.io-client'
import {useDispatch, useSelector} from "react-redux"
import { getFriends, setFriendArray } from '../redux/slices/userSlice'

let socket;
// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://chat-app-gautam-8294.vercel.app/";
socket = io(ENDPOINT);
const RightContainer = () => {
    axios.defaults.withCredentials = true;
    const [currentMessage, setCurrentMessage] = useState([]);
    const [friend1, setFriend1] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user);
    const friend = useSelector(state=>state.user.friend);
    const friendId = useSelector(state=>state.user.friendId);
    useEffect(()=>{
        setFriend1(friend);

    },[friend])
    
    const handleMessageSubmit = async (event) => {
        
        event.preventDefault();
        
        const time = new Date();
        const messagetime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        const timestamp = time.getTime();
        const hello = {
            messageContent: 'how are me',
            time: '3:35:59',
            timestamp: '3:35:59',
          }
        
        
        
        console.log(friend);
        dispatch(setFriendArray(friend));
        socket.emit("new message",{myId:user.id,friendId:friendId, messageContent: currentMessage, timestamp: timestamp });
        axios.post("currentmessage", {messageFrom: user.id,messageTo:friendId, currentmessage: currentMessage, messagetime: messagetime, timestamp: timestamp }).then((response) => {
            console.log(response);
            dispatch(getFriends());
        }).catch(err => {
            console.log(err);
            return <>{err.message}</>
        })
        
        event.target[0].value = "";
    }
    
    
    
    
    return (
        <div className='right_container_main'>
            { friendId !== "" ? <div className='profile_info'>
                <div className='profile_image'><img src='logo512.png' /></div>
                {friend.map(profile => {
                    if (profile.id === friendId) {
                        return (
                            <div className='right_container_profile_name'>{profile.name}</div>
                        )
                    }
                })}

                <div className='right_container_profile_search'>
                    <div><Searchicon /></div>
                    <div><Menuicon /></div>
                </div>
            </div> : null}



            <div className='right_container_message_section'>
                {
                    friend.map((friendName) => {
                        if (friendName.id === friendId) {
                            return (
                                friendName.message.map((realMessage) => {
                                    return (
                                        <div className={"right_container_message"}>
                                            <div className='right_container_message_content'>{realMessage.messageContent}</div>
                                        </div>
                                    )
                                })
                            )
                        }
                    })
                }

            </div>


            {friendId !== "" ? <div className='right_container_footer'>
                <div>
                    <Smileyicon />
                </div>
                <div>
                    <Attachicon />
                </div>
                <div className='right_container_footer_input' name="currentmessage">
                    <form onSubmit={handleMessageSubmit} style={{display:'flex'}} method ="post" >
                        <input type='text' onKeyUp={(event)=>{setCurrentMessage(event.target.value)}} style={{marginRight:"5px"}}/>
                        <button type='submit' style={{borderRadius:"10px"}}>Send</button>
                    </form>
                </div>
                <div><Micicon /></div>
            </div>: null}

        </div>
    )
}

export default RightContainer
