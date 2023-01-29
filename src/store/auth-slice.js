import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {signup: false, isAuthenticated: false, token: null},
    reducers: {
        signUp(state) {
            state.signup = !state.signup
        },
        login(state, action) {
            state.isAuthenticated = true
            state.token = action.payload.token
        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
        }
    }
})



export const authActions = authSlice.actions
export default authSlice