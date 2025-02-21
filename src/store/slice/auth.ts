// counterSlice.ts
import axiosCall from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../store";

interface AuthState {
  token: string;
  user: any; // Change this based on user object structure
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  user: null,
  status: "idle",
  error: null,
};

// 🔹 Async Thunk: Fetch user details using token
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState }; // Access state
      const token = state.auth.token;

      if (!token) throw new Error("No token available");

      const response = await axiosCall.post("/profile");

      if (response?.data?.status) {
        dispatch(saveUser(response?.data?.data?.user));
        return response?.data?.data?.user;
      } else {
        dispatch(logout());
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (action.payload) {
        setTimeout(() => {
          store.dispatch(fetchUserDetails());
        }, 0);
      }
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { saveToken, saveUser, logout } = authSlice.actions;
export default authSlice.reducer;
