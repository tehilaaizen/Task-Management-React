import { createSlice } from "@reduxjs/toolkit";
const User=createSlice({
    name:"userConection",
    initialState:{
        name:"TehilaTzipi",
        email:"z0548409683@gmail.com",
        password:"123",
        connected:false
    },
    reducers:{
            setConnected: (state, action) => {
                state.connected = !state.connected;
            }

    } 
})
export const { setConnected } = User.actions;
export default User.reducer;