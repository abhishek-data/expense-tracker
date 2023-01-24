import React, { Fragment, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthForm from "./components/Authentication/AuthForm";
import ContactDetails from "./Pages/ContactDetails";
import Welcome from "./Pages/Welcome";
import ExpenseContext from "./store/cart-context";

const App = () => {
  const ctx = useContext(ExpenseContext);
  console.log(ctx.isLoggedIn);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default App;
