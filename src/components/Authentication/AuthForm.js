import React, { useRef, useState } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

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

    try{
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
        let errorMessage = 'Authentication Failed'
        throw new Error(errorMessage);
      }
      const data = await response.json()
      console.log(data.idToken)
      console.log('User has successfully signed up')
    }catch(err){
      alert(err)
    }

    

  };

  return (
    <div className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInput} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInput} required/>
        </div>
        <div className={classes.actions}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
