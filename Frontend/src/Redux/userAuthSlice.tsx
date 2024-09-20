import { createSlice } from '@reduxjs/toolkit';

  const initialState= {
     userAuthStatus:localStorage.getItem("userToken")?true:false 
  }

export const userAuthSlice = createSlice({
  name: 'counter',
  initialState,

  reducers:{

   login:(state,action)=>{
        console.log('hiiiii shaham login')
       state.userAuthStatus=true
       localStorage.setItem("userToken",action.payload)   
   },

   logout:(state)=>{
      console.log("hiiiiiiiiii shahamslaam")
       state.userAuthStatus=false
       localStorage.removeItem("userToken");
   }

  },
});

export const {login,logout} = userAuthSlice.actions;
export default userAuthSlice.reducer;
