import { createSlice } from '@reduxjs/toolkit'


export type CandiatureFormState = {
    step: number
}

export const SLICE_NAME = 'candiatureForm'


const initialState: CandiatureFormState = {
    step: 0
}

const CandiatureFormSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateStep(state, action) {
            state.step = action.payload;
        },
    }

})

export default CandiatureFormSlice.reducer
export const { updateStep } = CandiatureFormSlice.actions;
