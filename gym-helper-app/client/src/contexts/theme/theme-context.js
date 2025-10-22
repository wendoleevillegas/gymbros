import  { createContext, useContext } from "react";

//create theme context 
export const ThemeContext = createContext(null);

//template to use context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context ){
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context; //gives{ theme, toggleTheme }
};

