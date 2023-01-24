import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";
const Welcome = (props) => {
  return (
    <header className={classes.header}>
      <h1 className={classes["header-title"]}>Welcome to Expense Tracker!!</h1>
      <Link className={classes["header-link"]} to="/contact">
        Your profile is incomplete.
        <span className={classes["header-span"]}>Complete Now</span>
      </Link>
    </header>
  );
};

export default Welcome;
