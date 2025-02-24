import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Staff } from "@/app/lib/types"; // Assuming this path is correct and provides the Staff type
import { RootState } from "../store";

interface StaffState {
  staff: any | null;
  selectedStaffArray: any[];
  inviteCount: any | null;
  jobData: any;
  jobId: any;
}

const initialState: StaffState = {
  staff: null,
  selectedStaffArray: [],
  inviteCount: null,
  jobData: [],
  jobId: null,
};

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setEmpty: (state) => {
      state = {
        staff: null,
        selectedStaffArray: [],
        inviteCount: null,
        jobData: [],
        jobId: null,
      };
    },
    setStaff: (state, action: PayloadAction<any>) => {
      state.staff = action.payload;
    },
    setSelectedStaff: (state, action: PayloadAction<any>) => {
      state.selectedStaffArray = action.payload;
    },
    setInviteCount: (state, action: PayloadAction<any>) => {
      state.inviteCount = action.payload;
    },
    setJobData: (state, action: PayloadAction<any>) => {
      state.jobData = action.payload;
    },
    setJobId: (state, action: PayloadAction<any>) => {
      state.jobId = action.payload;
    },
  },
});

export const {
  setJobId,
  setStaff,
  setSelectedStaff,
  setInviteCount,
  setJobData,
  setEmpty
} = staffSlice.actions;

// Selector
export const selectStaff = (state: RootState) => state.staff; // Adjust as per your state structure

export default staffSlice.reducer;
