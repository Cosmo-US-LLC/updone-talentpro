"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import loginStyles from '../../_components/booking/booking.module.css'



// Create the context with an initial value of undefined
const AuthContext = createContext<any | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within provider');
    }
    return context;
};

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false); // Start with registration form hidden
    const [close, setClose] = useState(true)

    return (
        <AuthContext.Provider value={{setShowLoginForm,showLoginForm,setShowRegisterForm,showRegisterForm,setClose,close,loginStyles}}>
            {children}
        </AuthContext.Provider>
    );
};
