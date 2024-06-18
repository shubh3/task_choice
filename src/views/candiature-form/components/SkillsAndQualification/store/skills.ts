import { createSlice } from '@reduxjs/toolkit'


export type SkillsState = {
    certifications: [Object];
    skills:[];
}

export const SLICE_NAME = 'SkillsForm'


const initialState: SkillsState = {
    certifications: [{ certName: '', issuingOrg: '', dateIssued: '' }],
    skills: []
}

const SkillsSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateSkillsData(state, action) {
            const {certifications, skills} = action.payload;
            state.certifications = certifications;
            state.skills = skills;
        },
    }

})

export default SkillsSlice.reducer
export const { updateSkillsData } = SkillsSlice.actions;
