import { useContext, useEffect, useRef, useState } from "react";
import ExpenseContext from "../store/cart-context";
import classes from "./DailyExpense.module.css";
import ExpenseInput from "./ExpenseInput";

const DailyExpense = () => {
  //   const [expense, setExpense] = useState([]);
  const ctx = useContext(ExpenseContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  console.log(ctx.expense);

  const expenseSubmitHandler = async (event) => {
    event.preventDefault();
    const expenseData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      __id: Math.random().toString(),
    };
    
    // ctx.expenseHandler(expenseData);
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
      ctx.expenseHandler({id: data.name, ...expenseData})
      console.log(data)
    } catch (err) {
      alert(err);
    }
    // amountRef.current.value = "";
    // descriptionRef.current.value = "";
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(
          "https://expense-9578f-default-rtdb.firebaseio.com/expense.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const newData = [];
        for (let key in data) {
          newData.push({ id: key, ...data[key] });
          console.log(newData);
        }
        // setExpense((prev) => newData);
        ctx.expenseFetcher(newData);
      } catch (err) {
        alert(err);
      }
    };
    fetchExpense();
  }, []);

  console.log(ctx.expense)
  return (
    <div>
      <div className={classes.auth}>
        <h1>Daily Expense</h1>
        <form onSubmit={expenseSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" required ref={amountRef} defaultValue={ctx.expenseToEdit? ctx.expenseToEdit.amount: ''}/>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input type="text" id="description" required ref={descriptionRef} defaultValue={ctx.expenseToEdit? ctx.expenseToEdit.description: ''}/>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" className={classes.select} ref={categoryRef} defaultValue={ctx.expenseToEdit? ctx.expenseToEdit.category: ''}>
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
          {ctx.expense.map((data) => {
            return <ExpenseInput data={data} key={data.id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DailyExpense;
