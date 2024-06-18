import { createSlice } from '@reduxjs/toolkit'


export type EducationalInfoState = {
    ssc: Object;
    hsc: Object;
    graduation: Object;
    postGraduation: Object;
}

export const SLICE_NAME = 'EducationalInfo'


const initialState: EducationalInfoState = {

    ssc: { name: 'SSC', board: '', cgpa: '', year: '' },
    hsc: { name: 'HSC', board: '', cgpa: '', year: '' },
    graduation: { name: 'Graduation', board: '', cgpa: '', year: '' },
    postGraduation: { name: 'Post Graduation', board: '', cgpa: '', year: '' }

}

const EducationalInfoSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateEducationData(state, action) {
            const {ssc, hsc , graduation,  postGraduation} = action.payload;
            state.ssc = ssc;
            state.hsc = hsc;
            state.graduation = graduation;
            state.postGraduation = postGraduation;
        },
    }

})

export default EducationalInfoSlice.reducer
export const { updateEducationData } = EducationalInfoSlice.actions;
