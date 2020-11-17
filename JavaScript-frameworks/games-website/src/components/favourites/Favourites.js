import React from "react";
import FavouriteList from "./FavouriteList";
import {Helmet} from "react-helmet";

function Favourites() {
	return (
		<>
		    <Helmet>
                <title>Games | Favourites</title>
            </Helmet>

			<h1>Favourite Games</h1>
			<FavouriteList />
		</>
	);
}

export default Favourites;