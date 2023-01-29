import React, { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Layout/Header";
import ContactDetails from "./Pages/ContactDetails";
import DailyExpense from "./Pages/DailyExpense";
import Welcome from "./Pages/Welcome";
import ExpenseContext from "./store/cart-context";

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  
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
        {!isLoggedIn && <Redirect to="/"/>}
      </Route>
      <Route path="/contact">
        <ContactDetails />
      </Route>
      <Route path="/expense">
        <DailyExpense/>
      </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
