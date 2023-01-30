import classes from "./Welcome.module.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice"; 

const Welcome = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const history = useHistory()


  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);

        
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
          <button onClick={() => dispatch(authActions.logout())}>Logout</button>
          </div>
        
      </header>
      <div className={classes.actions}>
        <button onClick={verifyEmailHandler}>Verify Email</button>
      </div>
      <div className={classes.actions}>
        <button onClick={() => history.push('/expense')}>Add Expense</button>
      </div>
    </main>
  );
};

export default Welcome;
