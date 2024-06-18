import { createSlice } from '@reduxjs/toolkit'


export type WorkExperienceState = {
    experiences:[Object];
}

export const SLICE_NAME = 'WorkExperienceForm'


const initialState: WorkExperienceState = {
    experiences: [{ companyName: '', jobTitle: '', duration: '' }]
}

const WorkExperienceSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateWorkData(state, action) {
            state.experiences = action.payload;
        },
    }

})

export default WorkExperienceSlice.reducer
export const { updateWorkData } = WorkExperienceSlice.actions;
