import AuthContext from "./AuthContext";
import { useContext, useEffect, useState } from "react";

import React from 'react'

export const AuthState = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState(false);

    const fetchUser = async (token) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_PUBLIC_URL}/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
        )
        const res = await response.json();
          if(response.ok && res.success){
            setLoggedUser(res.user)
            setIsLoggedIn(true)
            return true;
          }
          return false;
    };
    useEffect(() => {
        const authToken = localStorage.getItem('token')
        if(authToken){
            const res = fetchUser(authToken);
            if(res){
                console.log(res)
                setStatus(false);
                setIsLoggedIn(true);
            }
        }
    }, [])
    


    const logout = () => {
        localStorage.removeItem('token');
        setLoggedUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedUser, isLoggedIn, setLoggedUser, setIsLoggedIn, fetchUser, logout, status }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};