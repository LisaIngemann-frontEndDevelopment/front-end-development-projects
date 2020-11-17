import React from "react";
import PropTypes from "prop-types";

function MaxGuests({ number }) {
	let maxGuestsClass = "maxGuests-many";
	
	if (number < 4) {
		maxGuestsClass = "maxGuests-few";
	}

	return <span className={maxGuestsClass}>{number}</span>;
}

MaxGuests.propTypes = {
	number: PropTypes.number.isRequired,
};

export default MaxGuests;
