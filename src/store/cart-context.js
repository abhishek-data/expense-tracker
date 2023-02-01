import React, { useState } from "react";

const ExpenseContext = React.createContext({});

export const ExpenseContextProvider = (props) => {
  const [profile, setProfile] = useState(null);

  const profileHandler = (data) => {
    setProfile(data);
  };

  const contextData = {
    profile: profile,
    profileHandler: profileHandler,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
