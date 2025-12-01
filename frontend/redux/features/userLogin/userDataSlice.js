import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const loginUser = createSlice({
  name: 'loginuser',
  initialState,
  reducers: {
    setLoginUser:(state,action)=>{
      state.value=action.payload;
    },
    logoutUser:(state)=>{
        state.value=null;
    },
    setJWT:(state,action)=>{
      if (state.value) {
        state.value.accessToken = action.payload;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoginUser, logoutUser,setJWT } = loginUser.actions

export default loginUser.reducer;