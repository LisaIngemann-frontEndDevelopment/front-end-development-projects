// Get favourites and if there is no array create an empty one in localstorage
export function getFavourites() {
	let favourites = localStorage.getItem("favourites");

	return favourites ? JSON.parse(favourites) : [];
}

// See if the id of the game is in the favourites array
export function isFavourite(id) {
	const favourites = getFavourites();
	if (favourites.length === 0) {
		return false;
	}

	// Find method to return first result
	const existingFav = favourites.find((fav) => {
		return fav.id === id;
	});

	// If existingFav return true else false
	return !!existingFav;
}

export function saveFavourite(favourite) {
	const favourites = getFavourites();
	favourites.push(favourite);
	localStorage.setItem("favourites", JSON.stringify(favourites));
}

export function removeFavourite(id) {
	const favourites = getFavourites();
	const editedFavourites = favourites.filter((fav) => {
		return fav.id !== id;
	});
	localStorage.setItem("favourites", JSON.stringify(editedFavourites));
}