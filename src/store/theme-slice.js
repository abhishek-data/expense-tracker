import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name: 'theme',
    initialState: {darkTheme: false},
    reducers: {
        toggleTheme(state, action) {
            state.darkTheme = action.payload.value
        }
    }
})


export const themeAction = themeSlice.actions
export default themeSlice