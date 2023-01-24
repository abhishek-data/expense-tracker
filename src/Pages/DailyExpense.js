import { useRef, useState } from "react";
import classes from "./DailyExpense.module.css";

const DailyExpense = () => {
  const [expense, setExpense] = useState([]);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    setExpense((prev) => [...prev, expenseData]);
  };

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
            <input type="text" id="description" required ref={descriptionRef} />
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
          {expense.map((data) => {
            return (
              <li key={data.description} className={classes.list}>
                <span className={classes.listitem}>Amount: {data.amount}</span>
                <span className={classes.listitem}>description: {data.description}</span>
                <span className={classes.listitem}>Category: {data.category}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DailyExpense;
