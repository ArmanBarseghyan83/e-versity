import { createSlice } from '@reduxjs/toolkit';
import decode from 'jwt-decode';

const initialState = {
  idToken: localStorage.getItem('id_token')
  ? localStorage.getItem('id_token')
  : null,
  isTokenExpired : localStorage.getItem('id_token')
  ? decode(localStorage.getItem('id_token')).exp < Date.now() / 1000
  : true,
  userId: localStorage.getItem('id_token')
    ? decode(localStorage.getItem('id_token')).data?._id
    : null, 
  isAdmin: localStorage.getItem('id_token')
  ? decode(localStorage.getItem('id_token')).data?.isAdmin
  : null,
  isInstructor: localStorage.getItem('id_token')
  ? decode(localStorage.getItem('id_token')).data?.isInstructor
  : null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.idToken = action.payload;
      localStorage.setItem('id_token', action.payload);
      state.userId = decode(localStorage.getItem('id_token')).data._id;
      state.isInstructor = decode(localStorage.getItem('id_token')).data.isInstructor;
      state.isAdmin = decode(localStorage.getItem('id_token')).data.isAdmin;
      state.isTokenExpired = false
    },
    removeUserInfo: (state, action) => {
      state.idToken = null;
      localStorage.removeItem('id_token');
      state.userId = null;
      state.isInstructor = null;
      state.isAdmin = null
      state.isTokenExpired = true
    },
  },
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;
