import React, { useContext, useEffect, useRef, useState } from "react";
import ExpenseContext from "../store/cart-context";
import classes from "./ContactDetails.module.css";

const ContactDetails = () => {
  
  const ctx = useContext(ExpenseContext);
  const fullNameRef = useRef();
  const photoUrl = useRef();
  

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json()
      ctx.profileHandler(data)
      console.log(data)
    }
    
  },[ctx.token]);

  console.log(ctx.token,ctx.profile );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredfullName = fullNameRef.current.value;
    const enteredphotoUrl = photoUrl.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
            displayName: enteredfullName,
            photoUrl: enteredphotoUrl,
            // deleteAttribute: null,
            returnSecureToken: true,
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
      const data = await response.json();
      ctx.login(data.idToken);
      console.log(data.idToken);
    } catch (err) {
      alert(err);
    }
  };
  
  let Name = ''
  let url = ''
  
  async function fetchData(){
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json()
    
    // Name = await data.users.displayName;
    // url = await data.users.photoUrl;
    ctx.profileHandler(data);
  }
  

  return (
    <div className={classes.auth}>
      <h1>Contact Details</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label>Full Name</label>
          <input type="text" required ref={fullNameRef} value={ctx.profile.users.displayName}/>
        </div>
        <div className={classes.control}>
          <label>Profile Photo Url</label>
          <input type="text" required ref={photoUrl} value={ctx.profile.users.photoUrl} />
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
      <div className={classes.actions}>
        <button onClick={fetchData}>Edit</button>
      </div>
    </div>
  );
};

export default ContactDetails;
