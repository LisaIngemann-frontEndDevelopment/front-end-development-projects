import React from "react";
import PropTypes from "prop-types";

function Rating({ rating }) {
	let ratingClass = "rating--good";
	
	// If rating is less than 4 add bad rating class
	if (rating < 4) {
		ratingClass = "rating--bad";
	}

	return <span className={ratingClass}>{rating}</span>;
}

Rating.propTypes = {
	rating: PropTypes.number.isRequired,
};

export default Rating;
