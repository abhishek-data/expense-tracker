import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  isLoggedIn: false,
});

export const ExpenseContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [expense, setExpense] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const initialToken = localStorage.getItem("token");
  useEffect(() => {
    if (initialToken) {
      setToken(initialToken);
    }
  }, [initialToken]);

  const userIsLoggedIn = !!token;

  const expenseHandler = (data) => {
    setExpense((prev) => [...prev, data]);
  };

  const expenseFetcher = (data) => {
    setExpense(data)
  }
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const profileHandler = (data) => {
    setProfile(data);
  };

  const editExpenseHandler = async (editData) => {
    const editId = editData.id
    try {
      const response = await fetch(
        `https://expense-9578f-default-rtdb.firebaseio.com/expense/${editData.id}.json`,
        {
          method: "DELETE",

          headers: {
            "content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
      // const data = await response.json();
      setExpense(expense.filter((data) => data.id !== editId));
      setExpenseToEdit(editData);
    } catch (err) {
      alert(err);
    }
  };

  const deleteExpenseHandler = async (deleteData) => {
    
    try {
      const response = await fetch(
        `https://expense-9578f-default-rtdb.firebaseio.com/expense/${deleteData}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
      // const data = await response.json();
      setExpense(expense.filter((data) => data.id !== deleteData));
    } catch (err) {
      alert(err);
    }
  };

  const contextData = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    token: token,
    profile: profile,
    profileHandler: profileHandler,
    onEdit: editExpenseHandler,
    onDelete: deleteExpenseHandler,
    expenseHandler: expenseHandler,
    expense: expense,
    expenseFetcher: expenseFetcher,
    expenseToEdit: expenseToEdit
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
