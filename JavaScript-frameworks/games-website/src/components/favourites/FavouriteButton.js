import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { saveFavourite, removeFavourite, isFavourite } from "../../utils/favourites";

function FavouriteButton({ game }) {
	const { id } = game;

	const [isAFavourite, setIsAFavourite] = useState(false);

	// Check if clicked game id is in favourites
	useEffect(() => {
		const isFav = isFavourite(id);
		setIsAFavourite(isFav);
	}, [id]);

	function save() {
		saveFavourite(game);
		setIsAFavourite(true);
	}

	function remove() {
		removeFavourite(id);
		setIsAFavourite(false);
	}

	// Return icon depending on whether the game is already a favourite
	if (isAFavourite) {
		return <FaHeart className="favourite" size={40} onClick={remove} />;
	}
	return <FaRegHeart className="favourite" size={40} onClick={save} />;
}

FavouriteButton.propTypes = {
	game: PropTypes.object.isRequired,
};

export default FavouriteButton;