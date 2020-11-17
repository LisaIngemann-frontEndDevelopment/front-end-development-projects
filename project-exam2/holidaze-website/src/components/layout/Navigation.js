import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../auth/Logout";
import { Navbar, Nav } from "react-bootstrap";

import styles from "./Layout.module.scss";

function Navigation() {
    const { loggedIn, user } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false); 
    const [icon, setIcon] = useState(styles.menuShape); 

    function setIconStyle() {
        if(expanded) {
            setIcon(styles.menuShape)
            return icon
        } else {
            setIcon(styles.errorShape)
            return icon
        }
    }

    function setIconStyleMenu() {
        setIcon(styles.menuShape)
        return icon
    }

    return (
        <header className={styles.layout}>
            <Navbar expanded={expanded} expand="lg">
                <NavLink to="/" exact>
                    <Navbar.Brand 
                        onClick={() => {
                            setExpanded(false); 
                            setIconStyleMenu();
                        }}
                    >
                        <img src="./images/logo.svg" alt="Holidaze logo" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle 
                    onClick={() => {
                        setExpanded(expanded ? false : "expanded");
                        setIconStyle();
                    }} 
                    aria-controls="basic-navbar-nav" 
                >
                    <div className={icon} />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav 
                        onClick={() => {
                            setExpanded(false); 
                            setIconStyleMenu();
                        }} 
                        className="container-fluid"
                    >
                        <NavLink to="/" exact className={[styles.link, "nav-link"].join(' ')}>
                            HOME
                        </NavLink>
                        <NavLink to="/hotels" exact className={[styles.link, "nav-link"].join(' ')}>
                            HOTELS
                        </NavLink>
                        <NavLink to="/contact" className={[styles.link, "nav-link"].join(' ')}>
                            CONTACT
                        </NavLink>
                        {loggedIn ? (
                            <>  
                                <NavLink to="/admin" className={[styles.link, "nav-link"].join(' ')}>
                                    ADMIN
                                </NavLink>
                                <Logout/>
                            </>
                        ) : (
                            user ? (
                                <NavLink to="/login" className={[styles.logInOut, "nav-link"].join(' ')}>
                                    LOG IN
                                </NavLink>
                            ) : (
                                 <NavLink to="/register"  className={[styles.logInOut, "nav-link"].join(' ')}>
                                    LOG IN
                                </NavLink>
                            )
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Navigation;