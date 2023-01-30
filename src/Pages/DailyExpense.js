import { useRef } from "react";

import classes from "./DailyExpense.module.css";
import ExpenseInput from "./ExpenseInput";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-slice";
import { themeAction } from "../store/theme-slice";

const DailyExpense = () => {
  const {expenseItem, editExpenseItem,totalAmount} = useSelector((state) => state.expense);
  const theme = useSelector(state => state.theme.darkTheme)


  const dispatch = useDispatch();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expenseData = {
      amount: Number(amountRef.current.value),
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      id: Math.random().toString(),
    };
    dispatch(expenseActions.addExpense(expenseData));
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  const themeHandler = () => {
    dispatch(themeAction.toggleTheme())
  }

  return (
    <div className={classes[theme ?"dark-theme": '']}>
      <div className={classes.auth}>
        <h1>Daily Expense</h1>
        <form onSubmit={expenseSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              required
              ref={amountRef}
              defaultValue={editExpenseItem.amount}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionRef}
              defaultValue={editExpenseItem.description}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className={classes.select}
              ref={categoryRef}
              defaultValue={editExpenseItem.category}
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <ul>
          {expenseItem.map((data) => {
            return <ExpenseInput data={data} key={data.id} />;
          })}
        </ul>
      </div>
      <div className={classes.list}>
        <span className={classes.listitem}>Total Expense: ₹{totalAmount}.00</span>
      </div>
      <div className={classes.actions}>
        {totalAmount > 10000 && <button onClick={themeHandler}>Activate Premium</button>}
        {theme && <button>Donload File</button>}
      </div>
      
    </div>
  );
};

export default DailyExpense;
