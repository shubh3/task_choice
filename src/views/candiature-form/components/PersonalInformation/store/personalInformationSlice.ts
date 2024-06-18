import { createSlice } from '@reduxjs/toolkit'


export type personalInfoState = {
    name:string;
    email:string;
    phone:string;
    address:string;
}

export const SLICE_NAME = 'PersonalInfo'


const initialState: personalInfoState = {
    name:'',
    email:'',
    phone:'',
    address:''
}

const personalInfoSlice = createSlice({
    name: `${SLICE_NAME}`,
    initialState,
    reducers: {
        updateData(state, action) {
            const {name,email,phone, address} = action.payload
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
        },
    }

})

export default personalInfoSlice.reducer
export const { updateData } = personalInfoSlice.actions;
