import { useRef } from "react";

import classes from "./DailyExpense.module.css";
import ExpenseInput from "./ExpenseInput";
import { useDispatch, useSelector } from "react-redux";
import {expenseActions} from '../store/expense-slice'

const DailyExpense = () => {

  const expenseItem = useSelector(state => state.expense.expenseItem)
  console.log(expenseItem)
  const dispatch = useDispatch()
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();


  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expenseData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      id: Math.random().toString(),
    };

    dispatch(expenseActions.addExpense(expenseData))
  }
    

  
  return (
    <div>
      <div className={classes.auth}>
        <h1>Daily Expense</h1>
        <form onSubmit={expenseSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" required ref={amountRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input type="text" id="description" required ref={descriptionRef}/>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" className={classes.select} ref={categoryRef}>
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
    </div>
  );
};

export default DailyExpense;
