import React, { useState } from "react";

const ExpenseContext = React.createContext({
    isLoggedIn: false
})


export const ExpenseContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    }

    const contextData = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        token: token
    }

    return (
        <ExpenseContext.Provider value={contextData}>
            {props.children}
        </ExpenseContext.Provider>
    )
}


export default ExpenseContext