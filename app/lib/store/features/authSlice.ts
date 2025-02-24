"use client"
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Cookies from 'js-cookie'

interface AuthState {
  auth: any | null;
}

const initialState: AuthState = {
  auth: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmpty: (state) => {
      state = {
        auth: null
      }
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    clearAuth: (state) => {
      const isUpdoneDomain = window.location.hostname.includes('updone');

      // Remove the token cookie
      Cookies.remove('authToken', {
        path: '/',
        // ...(isUpdoneDomain && { domain: '.updone.com' }) // Add domain only if URL contains .updone.com
      });

      // Remove the authData cookie
      Cookies.remove('authData', {
        path: '/',
        // ...(isUpdoneDomain && { domain: '.updone.com' }) // Add domain only if URL contains .updone.com
      });

      // Clear the auth state
      state.auth = null;
    }
  },
});

export const { setAuth, clearAuth, setEmpty } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth; // Adjust as per your state structure

export default authSlice.reducer;
