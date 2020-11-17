import React from "react";
import PropTypes from "prop-types";

function SentMessage({ displayMessage, text, children }) {
	if (displayMessage) {
		return <div className="messageSent">{text}{children}</div>;
	}
	return null;
}

SentMessage.propTypes = {
	displayMessage: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default SentMessage;
