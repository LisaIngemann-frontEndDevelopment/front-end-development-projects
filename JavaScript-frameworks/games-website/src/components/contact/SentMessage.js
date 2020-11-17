import React from "react";
import PropTypes from "prop-types";

function SentMessage({ displayMessage }) {
	// If true return a message
	if (displayMessage) {
		return <div className="messageSent">Your message was sent.</div>;
	}
	return null;
}

SentMessage.propTypes = {
	displayMessage: PropTypes.bool.isRequired,
};

export default SentMessage;
