import { useContext } from 'react';
import ExpenseContext from '../store/cart-context';
import classes from './ExpenseInput.module.css'


const ExpenseInput = (props) => {
  const ctx = useContext(ExpenseContext)  

  return (
    <li key={props.data.__id} className={classes.list}>
      <span className={classes.listitem}>Amount: {props.data.amount}</span>
      <span className={classes.listitem}>description: {props.data.description}</span>
      <span className={classes.listitem}>Category: {props.data.category}</span>
      <button className={classes.listitem} onClick={() => ctx.onEdit(props.data)}>Edit</button>
      <button className={classes.listitem} onClick={() => ctx.onDelete(props.data.id)}>Delete</button>
    </li>
  );
};

export default ExpenseInput;
