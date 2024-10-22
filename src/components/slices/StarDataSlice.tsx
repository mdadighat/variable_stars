import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface StarDataState {
    stars: [],
    starCount: number,
    error: any
}

const initialState: StarDataState = {
    stars: [],
    starCount: 0,
    error: null
}

export const starDataSlice = createSlice({
  name: 'stars',
  initialState,
  reducers: {
    updateStars: (state, action: PayloadAction<[]>) => {
        state.stars = action.payload
        },
    updateStarCount: (state, action: PayloadAction<number>) => {
        state.starCount = action.payload
        },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateStars, updateStarCount, setError } = starDataSlice.actions

export default starDataSlice.reducer