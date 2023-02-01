import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Layout/Header";
import ContactDetails from "./Pages/ContactDetails";
import DailyExpense from "./Pages/DailyExpense";
import Welcome from "./Pages/Welcome";
import { authActions } from "./store/auth-slice";
import { fetchExpenseData, sendExpenseData } from "./store/expense-actions";
import "./App.css";

let isInitial = true;

const App = () => {
  const expense = useSelector((state) => state.expense);
  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      dispatch(authActions.login({ token: savedToken, email: savedEmail }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchExpenseData(email));
    }
  }, [dispatch, email, isAuthenticated]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (expense.changed) {
      dispatch(sendExpenseData(expense, email));
    }
  }, [expense, dispatch, email]);

  console.log(isAuthenticated);
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact>
          {!isAuthenticated && <AuthForm />}
          {isAuthenticated && <Redirect to="/welcome" />}
        </Route>
        <Route path="/welcome">
          {isAuthenticated && <Welcome />}
          {!isAuthenticated && <Redirect to="/" />}
        </Route>
        <Route path="/contact">
          {isAuthenticated && <ContactDetails />}
          {!isAuthenticated && <Redirect to="/" />}
        </Route>
        <Route path="/expense">
          {isAuthenticated && <DailyExpense />}
          {!isAuthenticated && <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
