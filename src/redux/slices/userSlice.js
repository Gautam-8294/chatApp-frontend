import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../api/axios.js'
import {user} from "../../components/Login";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const initialState = {
    friend: [],
    user: {},
    loading: false,
    loadingFriends: false,
    error: '',
    friendId:''
}


export const getUserDetails = createAsyncThunk('user/getUserDetails',async ()=>{
    const response = await axios.get("user");
        // .catch((err)=>{
        //     console.log(err);
        // })
        return response.data
        
})
export const getFriends = createAsyncThunk('user/getFriends',async ()=>{
    const response = await axios.get("friend");
        // .catch((err)=>{
        //     console.log(err);
        // })
        return response.data

        
})
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setFriendArray: (state,action)=>{
            // state.friend = action.payload;
            // state.friend = [...state.friend,action.payload];
            state.friend = action.payload;
        },
        setFriendId: (state,action)=>{
            state.friendId = action.payload;
        }
    },
    extraReducers:(builder)=>{
     builder.addCase(getUserDetails.pending, state=>{
        state.loading = true
     })   
     builder.addCase(getUserDetails.fulfilled, (state, action)=>{
        state.loading = false
        if(action.payload !== "Token is missing"){
        state.user = action.payload }

     })
     builder.addCase(getUserDetails.rejected, (state, action)=>{
        state.loading = false
        state.user = {}
        state.error = action.error.message
        // navigate('/error',{state:{error:action.error.message}})

     })




     builder.addCase(getFriends.pending, state=>{
        state.loadingFriends = true
     })   
     builder.addCase(getFriends.fulfilled, (state, action)=>{
        state.loadingFriends = false
        if(action.payload !== "Token is missing"){
            state.friend = action.payload }

     })
     builder.addCase(getFriends.rejected, (state, action)=>{
        state.loadingFriends = false
        state.friend = []
        state.error = action.error.message

     })
    }
})


// console.log("This is cartSlice",cartSlice);
// console.log("This is user",cartSlice.cart);

// export const  {clearCart} = cartSlice.actions; 
export const  {setFriendArray, setFriendId} = userSlice.actions; 
export default userSlice.reducer;