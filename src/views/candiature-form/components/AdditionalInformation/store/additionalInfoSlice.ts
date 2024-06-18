import { createSlice } from '@reduxjs/toolkit'


export type AdditionalInfoState = {
    step:number
}

export const SLICE_NAME = 'AdditionalInfo'


const initialState: AdditionalInfoState = {
    step:0
}

const AdditionalInfoSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateStep(state, action) {
            state.step = action.payload;
        },
    }

})

export default AdditionalInfoSlice.reducer
