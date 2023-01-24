import React, { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";

import ExpenseContext from "../../store/cart-context";



const AuthForm = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

  const ctx = useContext(ExpenseContext)
  const loginSignupHandler = () => {
    setIsLoggedIn(prev => !prev)
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    

    let url;
    if (isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        let errorMessage = "Authentication Failed";
        throw new Error(errorMessage);
      }
      const data = await response.json();

      ctx.login(data.idToken)
      console.log(data.idToken);
      console.log("User has successfully signed up");
    } catch (err) {
      alert(err);
    }
  };

  const forgotPasswordHandler = async() => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET" ,
            email: emailInput.current.value,
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
  }

  

  return (
    <div>
      <div className={classes.auth}>
        <h1>{isLoggedIn? "Login": "SignUp"}</h1>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailInput}  required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordInput} required />
          </div>
          <div className={classes.actions}>
            <button type="submit">{isLoggedIn? "Login": "SignUp"}</button>
          </div>
          <div className={classes.actions}>
            <button type="button" onClick={forgotPasswordHandler}>{isLoggedIn && "Forgot Password"}</button>
          </div>
        </form>
      </div>
      <div className={classes.actions}>
        <button onClick={loginSignupHandler}>{isLoggedIn?"Dont have an account? SignUp":"Have an account? Login"}</button>
      </div>
    </div>
  );
};

export default AuthForm;
