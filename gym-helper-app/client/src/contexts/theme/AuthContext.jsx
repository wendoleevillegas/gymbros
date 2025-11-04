import { createContext, useContext, useState } from 'react';

// Creating context
const AuthContext = createContext(null);

// Creating provider component
export const AuthProvider = ({ children }) => {
    // checking local storage for the initial state
    const [isAuth, setIsAuth] = useState(() => {
        return localStorage.getItem("isAuth") === "true";
    });

    // later on, isAuth will be replaced with the 'User' object, and we'll add 
    // login/logout functions that will call the API
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
        </AuthContext.Provider>
    );
};

// custom hook to use context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};