import React from "react";
import PropTypes from "prop-types";

function ErrorMessage({ children }) {
    return (
        <div className="error">{children}</div>
    );
}

ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorMessage;