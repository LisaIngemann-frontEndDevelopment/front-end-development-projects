import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import styles from "./Auth.module.scss";

function Login() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    function doLogout() {
        logout();
        history.push("/");
    }

    return <div className={[styles.logInOut, "nav-link"].join(' ')} onClick={doLogout}>LOG OUT</div>;
}

export default Login;
