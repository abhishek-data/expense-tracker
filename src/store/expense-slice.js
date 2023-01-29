import { createSlice } from "@reduxjs/toolkit";


const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expense: []
    },
    reducers: {
        replaceExpense(state, action) {
            state.expense = action.payload
        },
        addExpense(state, action) {
            state.expense = state.expense.push(action.payload)
        }
    }
})


export const expenseActions = expenseSlice.actions
export default expenseSlice