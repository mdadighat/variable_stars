import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface StarDataState {
    stars: [],
    starCount: number,
    error: any,
    selectedStar: {
        name: string;
    } | null
}

const initialState: StarDataState = {
    stars: [],
    starCount: 0,
    error: null,
    selectedStar: null
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
        },
    setSelectedStarInfo: (state, action: PayloadAction<{
        name: string;
        auid: string;
        ra?: number;
        dec?: number;
        varType?: string;
        maxMag?: number;
        minMag?: number;
        period?: number;
    }>) => {
        state.selectedStar = action.payload
    }
    },
})

// Action creators are generated for each case reducer function
export const { updateStars, updateStarCount, setError, setSelectedStarInfo } = starDataSlice.actions

export default starDataSlice.reducer