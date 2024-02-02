import { createSlice } from '@reduxjs/toolkit';
import decode from 'jwt-decode';

const initialState = {
  idToken: localStorage.getItem('id_token')
    ? localStorage.getItem('id_token')
    : null,
  userId: localStorage.getItem('id_token')
    ? decode(localStorage.getItem('id_token')).data?._id
    : null,
  isTokenExpired : localStorage.getItem('id_token')
  ? decode(localStorage.getItem('id_token')).exp < Date.now() / 1000
  : true,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.idToken = action.payload;
      localStorage.setItem('id_token', action.payload);
      state.userId = decode(localStorage.getItem('id_token')).data._id;
      state.isTokenExpired = false
    },
    removeUserInfo: (state, action) => {
      state.idToken = null;
      localStorage.removeItem('id_token');
      state.userId = null;
      state.isTokenExpired = true
    },
  },
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;
