import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenseItem: [],
    totalAmount: 0,
    changed: false,
    editExpenseItem: {}
  },
  reducers: {
    replaceExpense(state, action) {
      state.expenseItem = action.payload.expenseItem;
      state.totalAmount = action.payload.totalAmount;
    },
    addExpense(state, action) {
      state.changed = true;  
      state.expenseItem.push(action.payload);
      state.totalAmount = state.totalAmount + action.payload.amount;
    },
    editExpense(state, action) {
      state.changed = true;  
      const id = action.payload.id;
      state.expenseItem = state.expenseItem.filter((item) => item.id !== id);
      state.totalAmount = state.totalAmount - action.payload.amount;
      state.editExpenseItem = action.payload
    },
    deleteExpense(state, action) {
        state.changed = true;  
        const id = action.payload.id;
        state.expenseItem = state.expenseItem.filter((item) => item.id !== id);
        state.totalAmount = state.totalAmount - action.payload.amount;
        
      }
  }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
