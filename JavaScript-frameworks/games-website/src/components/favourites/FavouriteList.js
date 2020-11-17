import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import GameItem from "../game/GameItem";
import { getFavourites } from "../../utils/favourites";

function FavouriteList() {
	const [favourites, setFavourites] = useState([]);

	// Get favourites from localstorage
	useEffect(() => {
		const favs = getFavourites();
		setFavourites(favs);
	}, []);

	return (
		<>
			{favourites.length === 0 && <div className="favouriteMessage">You have not choosen any favourites yet.</div>}

			<Row>
				{favourites.map((fav) => {
					return (
						<Col key={fav.id} lg={4} md={6} sm={12}>
							<GameItem id={fav.id} name={fav.name} image={fav.image} rating={fav.rating} released={fav.released} />
						</Col>
					);
				})}
			</Row>
		</>
	);
}

export default FavouriteList;