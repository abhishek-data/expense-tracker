
import classes from './ExpenseInput.module.css'
import { expenseActions } from '../store/expense-slice';
import { useDispatch } from 'react-redux';


const ExpenseInput = (props) => {
  const dispatch = useDispatch()
  const editExpenseHandler = (data) => {
    dispatch(expenseActions.editExpense(data))
  } 
  
  const deleteExpenseHandler = (data) => {
    dispatch(expenseActions.deleteExpense(data))
  }

  return (
    <li key={props.data.__id} className={classes.list}>
      <span className={classes.listitem}>Amount: ₹{props.data.amount}.00</span>
      <span className={classes.listitem}>description: {props.data.description}</span>
      <span className={classes.listitem}>Category: {props.data.category}</span>
      <button className={classes.listitem} onClick={() => editExpenseHandler(props.data)}>Edit</button>
      <button className={classes.listitem} onClick={() => deleteExpenseHandler(props.data)}>Delete</button>
    </li>
  );
};

export default ExpenseInput;
