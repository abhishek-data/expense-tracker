import { useEffect, useRef } from "react";

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
  
  const editExpenseHandler = (data) => {
    amountRef.current.value = data.amount;
    descriptionRef.current.value = data.description;
    categoryRef.current.value = data.category;
    dispatch(expenseActions.editExpense(data))
  } 


  const themeHandler = () => {
    dispatch(themeAction.toggleTheme({value: true}))
  }
  useEffect(() => {
    if(totalAmount < 10000) {
      dispatch(themeAction.toggleTheme({value: false}))
    }
  })

  console.log(expenseItem)
  const handleDownload = () => {
    const csvData = expenseItem.map((data) => `${data.amount},${data.category},${data.description},${data.id}\n`).join("");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
            return <ExpenseInput data={data} key={data.id} onEdit={editExpenseHandler}/>;
          })}
        </ul>
      </div>
      <div className={classes.list}>
        <span className={classes.listitem}>Total Expense: ₹{totalAmount}.00</span>
      </div>
      <div className={classes.actions}>
        {totalAmount > 10000 && <button onClick={themeHandler}>Activate Premium</button>}
        {totalAmount > 10000 && theme && <button onClick={handleDownload}>Download File</button>}
      </div>
      
    </div>
  );
};

export default DailyExpense;
