"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Check if localStorage is available and get initial booking state
const initialBookingActiveState =
  typeof window !== "undefined" &&
  localStorage.getItem("bookingActive") === "true";

// const initialBookingActiveState = localStorage?.getItem('bookingActive') === 'true';

interface BookingState {
  bookingActive: boolean;
  bookingInActive: boolean;
  selectedService: string;
  selectedName: string;
  selectedServiceFromHome: string | null;
  working_hours: any;
  offerId: null | number;
  offerDetailData: any;
}

const initialState: BookingState = {
  bookingActive: initialBookingActiveState, // Load initial state from localStorage
  bookingInActive: false, // Assuming bookingInActive starts as false
  selectedService: "Bartender",
  selectedName: "",
  selectedServiceFromHome: "",
  working_hours: {},
  offerId: null,
  offerDetailData: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setEmpty: (state) => {
      state = {
        bookingActive: initialBookingActiveState, // Load initial state from localStorage
        bookingInActive: false, // Assuming bookingInActive starts as false
        selectedService: "Bartender",
        selectedName: "",
        selectedServiceFromHome: "",
        working_hours: {},
        offerId: null,
        offerDetailData: null,
      };
    },
    setBookingActive: (state) => {
      state.bookingActive = true;
      state.bookingInActive = false;
    },
    setBookingInactive: (state) => {
      state.bookingActive = false;
      state.bookingInActive = true;
    },
    setSelectedServiceName: (state, action) => {
      state.selectedService = action.payload;
    },
    setSelectedServiceNameFromHome: (state, action) => {
      state.selectedServiceFromHome = action.payload;
    },
    setSelectedServiceNameFromHomeClear: (state) => {
      state.selectedServiceFromHome = null;
    },
    setSelectedLocationName: (state, action) => {
      state.selectedName = action.payload;
    },
    setSelectedWorkingHours: (state, action) => {
      state.working_hours = action.payload;
    },
    setOfferDetailData: (state, action) => {
      state.offerDetailData = action.payload;
    },
    setOffersId: (state, action) => {
      state.offerId = action.payload;
    },
  },
});

export const {
  setOffersId,
  setSelectedServiceNameFromHomeClear,
  setOfferDetailData,
  setBookingActive,
  setBookingInactive,
  setSelectedServiceName,
  setSelectedLocationName,
  setSelectedWorkingHours,
  setSelectedServiceNameFromHome,
  setEmpty,
} = bookingSlice.actions;

// Selectors
export const selectBooking = (state: RootState) => state.booking;
export const selectBookingActive = (state: RootState) =>
  state.booking.bookingActive;
export const selectBookingInActive = (state: RootState) =>
  state.booking.bookingInActive;
export const selectOfferDetailData = (state: RootState) =>
  state.booking.offerDetailData;

export default bookingSlice.reducer;
