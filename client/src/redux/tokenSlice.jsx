import { createSlice } from '@reduxjs/toolkit'
const i={
token:null,
user:{},
role:""
}
const tokenSlice = createSlice({
    name: 'token',
    initialState: i,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },
        logOut(state, action) {
            state.token = null;
            state.user = null;
            state.role = null;

        }
    }
})

export const { setToken, logOut,setUser,setRole } = tokenSlice.actions
export default tokenSlice.reducer