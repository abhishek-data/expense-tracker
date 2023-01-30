import React, { useContext, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import classes from "./ContactDetails.module.css";
import { profileActions } from "../store/profile-slice";

const ContactDetails = () => {
  const dispatch = useDispatch()
  const fullNameRef = useRef();
  const photoUrl = useRef();
  const token = useSelector(state => state.auth.token)
  const profile = useSelector(state => state.profile)

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
            idToken: token,
            displayName: enteredfullName,
            photoUrl: enteredphotoUrl,
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
      // ctx.login(data.idToken);
      console.log(data.idToken);
    } catch (err) {
      alert(err);
    }
  };



  async function fetchData() {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEkInMlsAIwZ557ZvqVbnr65QB4ab2siQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();

    dispatch(profileActions.replaceProfile(data));
  }

  useEffect(() => {
    fetchData()
  }, [token]);

  console.log(profile)
  return (
    <div className={classes.auth}>
      <h1>Contact Details</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label>Full Name</label>
          <input
            type="text"
            required
            ref={fullNameRef}
            
          />
        </div>
        <div className={classes.control}>
          <label>Profile Photo Url</label>
          <input
            type="text"
            required
            ref={photoUrl}
            
          />
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
