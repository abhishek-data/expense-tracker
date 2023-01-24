import { useEffect, useRef, useState } from "react";
import classes from "./DailyExpense.module.css";

const DailyExpense = () => {
  const [expense, setExpense] = useState([]);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  console.log(expense)

  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expenseData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      __id: Math.random().toString()
    };
    // setExpense((prev) => [...prev, expenseData]);
    try {
      const response = await fetch(
        "https://expense-9578f-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
      const data = await response.json();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchExpense = async() => {
      try {
        const response = await fetch("https://expense-9578f-default-rtdb.firebaseio.com/expense.json",
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const data = response.json();
        const newData = [];
        for(let key in data){
            newData.push({ id: key, ...data[key] })
        }
        setExpense(newData)
      } catch (err) {
        alert(err);
      }
    };
    fetchExpense()
  }, []);

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
                <span className={classes.listitem}>
                  description: {data.description}
                </span>
                <span className={classes.listitem}>
                  Category: {data.category}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DailyExpense;
