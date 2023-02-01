import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {signup: false, isAuthenticated: false, token: null, email: null},
    reducers: {
        signUp(state) {
            state.signup = !state.signup
        },
        login(state, action) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.email = action.payload.email
        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
            state.email = null
        }
    }
})



export const authActions = authSlice.actions
export default authSlice