import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ExpenseContext from "../store/cart-context";
const Welcome = (props) => {
  const ctx = useContext(ExpenseContext);
  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: ctx.token,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);

        const data = await response.json();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <main>
      <header className={classes.header}>
        <h1 className={classes["header-title"]}>
          Welcome to Expense Tracker!!
        </h1>
        <Link className={classes["header-link"]} to="/contact">
          Your profile is incomplete.
          <span className={classes["header-span"]}>Complete Now</span>
        </Link>
        <div className={classes.actions}>
          <button onClick={ctx.logout}>Logout</button>
          </div>
        
      </header>
      <div className={classes.actions}>
        <button onClick={verifyEmailHandler}>Verify Email</button>
      </div>
    </main>
  );
};

export default Welcome;
