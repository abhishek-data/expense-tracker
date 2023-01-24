import React, { Fragment, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import Header from "./components/Layout/Header";
import ContactDetails from "./Pages/ContactDetails";
import Welcome from "./Pages/Welcome";
import ExpenseContext from "./store/cart-context";

const App = () => {
  const ctx = useContext(ExpenseContext);
  console.log(ctx.isLoggedIn);
  return (
    <Fragment>
      {/* <Header/> */}
      <Switch>
      <Route path="/" exact>
        {!ctx.isLoggedIn && <AuthForm />}
        {ctx.isLoggedIn && <Redirect to="/welcome" />}
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/contact">
        <ContactDetails />
      </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
