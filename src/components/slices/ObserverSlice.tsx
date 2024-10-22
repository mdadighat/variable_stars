import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ObserverState {
  dateTime: string;
  latitude: number | null;
  longitude: number | null;
}

const initialState: ObserverState = {
  dateTime: "",
  latitude: null,
  longitude: null
}

export const observerSlice = createSlice({
  name: 'observer',
  initialState,
  reducers: {
    updateDateTime: (state, action: PayloadAction<string>) => {
      state.dateTime = action.payload
    },
    updateLatitude: (state, action: PayloadAction<number>) => {
        state.latitude = action.payload
    },
    updateLongitude: (state, action: PayloadAction<number>) => {
        state.longitude = action.payload
    } 
  },
})

// Action creators are generated for each case reducer function
export const { updateDateTime, updateLatitude, updateLongitude } = observerSlice.actions

export default observerSlice.reducer