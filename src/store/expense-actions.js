
import { expenseActions } from "./expense-slice";


export const fetchExpenseData = (email) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://expense-9578f-default-rtdb.firebaseio.com/${email}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const expenseData = await fetchData();

      dispatch(
        expenseActions.replaceExpense({
          expenseItem: expenseData.expenseItem || [],
          totalAmount: expenseData.totalAmount,
        })
      );
    } catch (error) {
      // alert(error);
    }
  };
};

export const sendExpenseData = (expense, email) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-9578f-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            expenseItem: expense.expenseItem,
            totalAmount: expense.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      alert(error);
    }
  };
};
