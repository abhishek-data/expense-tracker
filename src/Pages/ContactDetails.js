import React, { useContext, useEffect, useRef } from "react";
import ExpenseContext from "../store/cart-context";
import classes from "./ContactDetails.module.css";

const ContactDetails = () => {
  const ctx = useContext(ExpenseContext)  
  const fullNameRef = useRef();
  const photoUrl = useRef();
  console.log(ctx.token)
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredfullName = fullNameRef.current.value;
    const enteredphotoUrl = photoUrl.current.value;
    try{
        const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: ctx.token,
                displayName: enteredfullName,
                photoUrl: enteredphotoUrl,
                deleteAttribute: "DISPLAY_NAME",
                returnSecureToken: true
              }),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          if(!response.ok){
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          }
          const data = await response.json();
          console.log(data.displayName)
    }catch(err){
        alert(err)
    }
    
  };

  

  return (
    <div className={classes.auth}>
      <h1>Contact Details</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label>Full Name</label>
          <input type="text" required ref={fullNameRef}/>
        </div>
        <div className={classes.control}>
          <label>Profile Photo Url</label>
          <input type="url" required ref={photoUrl}/>
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
      <div className={classes.actions}>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default ContactDetails;
