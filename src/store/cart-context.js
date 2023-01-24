import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
    isLoggedIn: false
})


export const ExpenseContextProvider = (props) => {
    
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null)
    const initialToken = localStorage.getItem('token')
    useEffect(() => {
        if(initialToken){
            setToken(initialToken)
        }
    },[])
    

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const profileHandler = (data) =>{
        setProfile(data)
    }

    const contextData = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        token: token,
        profile: profile,
        profileHandler: profileHandler

    }

    return (
        <ExpenseContext.Provider value={contextData}>
            {props.children}
        </ExpenseContext.Provider>
    )
}


export default ExpenseContext