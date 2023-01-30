import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Layout/Header";
import ContactDetails from "./Pages/ContactDetails";
import DailyExpense from "./Pages/DailyExpense";
import Welcome from "./Pages/Welcome";
import { authActions } from "./store/auth-slice";
import { fetchExpenseData, sendExpenseData } from "./store/expense-actions";
import './App.css'


let isInitial = true;

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const expense = useSelector(state => state.expense)
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch(authActions.login({ token: savedToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("token", token);
  },[token]);


  useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (expense.changed) {
      dispatch(sendExpenseData(expense));
    }
  }, [expense, dispatch]);

  console.log(isLoggedIn);
  return (
    <Fragment>
      {/* <Header/> */}
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn && <AuthForm />}
          {isLoggedIn && <Redirect to="/welcome" />}
        </Route>
        <Route path="/welcome">
          {isLoggedIn && <Welcome />}
          {!isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/contact">
          <ContactDetails />
        </Route>
        <Route path="/expense">
          <DailyExpense />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
