import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const existingUser = localStorage.getItem("user") || null;
    const existingPassword = localStorage.getItem("password") || null;
    const existingLoggedIn = localStorage.getItem("loggedIn") || null;

    const [user, setUser] = useState(JSON.parse(existingUser));
    const [pass, setPass] = useState(JSON.parse(existingPassword));
    const [loggedIn, setLoggedIn] = useState(existingLoggedIn);

    function registerUser(username, password) {
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("password", JSON.stringify(password));
        localStorage.setItem("loggedIn", "yes");

        setUser(username);
        setPass(password);
        setLoggedIn("yes");
    }

    function login() {
        localStorage.setItem("loggedIn", "yes");
        setLoggedIn("yes");
    }

    function clearUser() {
        localStorage.removeItem("user");
        localStorage.removeItem("password");
        setUser("");
        setPass("");
    }

    function logout() {
        setLoggedIn(null);
        localStorage.removeItem("loggedIn");
    }

    return <AuthContext.Provider value={{ user, pass, loggedIn, registerUser, clearUser, logout, login }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
