// store/slices/dateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  selectedDate: Date | string | null;
  selectedTime: string;
  amPm: string;
  selectedHours: string;
  selectedLocation: string | null;
  title: string;
  eventDescription: string;
  selectedService: {
    name: string;
    id: number;
  };
  selectedTalents: [];
}

const initialState: DateState = {
  selectedDate: null,
  selectedTime: "",
  amPm: "PM",
  selectedHours: "", // Default value
  selectedLocation: null,
  title: "",
  eventDescription: "",
  selectedService: {
    name: "Bartender",
    id: 1,
  },
  selectedTalents: [],
};

const jobCreateSlice = createSlice({
  name: "jobCreate",
  initialState,
  reducers: {
    setEmpty: (state) => {
      state = {
        selectedDate: null,
        selectedTime: "",
        amPm: "PM",
        selectedHours: "", // Default value
        selectedLocation: null,
        title: "",
        eventDescription: "",
        selectedService: {
          name: "Bartender",
          id: 1,
        },
        selectedTalents: [],
      };
    },
    setSelectedDate(state, action: PayloadAction<Date | string | null>) {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setAmPm: (state, action: PayloadAction<string>) => {
      state.amPm = action.payload;
    },
    setSelectedHours: (state, action: PayloadAction<string>) => {
      state.selectedHours = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setEventDescription: (state, action: PayloadAction<string>) => {
      state.eventDescription = action.payload;
    },
    setSelectedService: (
      state,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      state.selectedService = action.payload;
    },
    setSelectedTalents: (state, action: PayloadAction<[]>) => {
      state.selectedTalents = action.payload;
    },
    resetJobCreate(state) {
      return { ...initialState };
    },
  },
});

export const {
  setTitle,
  setEventDescription,
  setSelectedService,
  setSelectedDate,
  setSelectedTime,
  setAmPm,
  setSelectedHours,
  setSelectedLocation,
  setSelectedTalents,
  resetJobCreate,
  setEmpty,
} = jobCreateSlice.actions;
export default jobCreateSlice.reducer;
