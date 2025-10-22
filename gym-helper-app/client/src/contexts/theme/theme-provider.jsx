import { useEffect, useState } from "react";
import { ThemeContext } from "./theme-context";
// Helper function to detect the user's system theme (light or dark)
const getSystemTheme = () => {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};
// This component will wrap our app and provide "theme" data (light/dark)
export const ThemeProvider = ({ children }) => {
// We check localStorage first otherwise we fall back to the system theme.
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || getSystemTheme();
    });
// Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };
 // useEffect runs whenever "theme" changes
    useEffect(() => {
        const root = document.documentElement;
        if(theme === "dark"){
            root.classList.add("dark");
        } else{
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
// Provide the theme and toggle function to all children
    return (
        <ThemeContext.Provider value = {{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
