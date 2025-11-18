import { configureStore } from '@reduxjs/toolkit'
import loginUserReducers  from './features/userLogin/userDataSlice.js'

export const store = configureStore({
  reducer: {
    loginUser:loginUserReducers,
  },
})