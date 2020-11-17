import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import FavouriteButton from "../favourites/FavouriteButton";

function GameItem({ id, name, image, rating, released }) {
    return (
        <Card className="card-game">
            <div className="card-img"><Card.Img variant="top" style={{ backgroundImage: `url(${image})` }}/></div>
            <Card.Body>
                <h2>{name}</h2>
                <p><b>Rating: </b><Rating rating={rating} /></p>
                <p><b>Release Date: </b>{released}</p>
                <Link to={"game/" + id}>
                    <Button variant="secondary" block>
                        View Details
                    </Button>
                </Link>
            </Card.Body>
            <div className="favouriteButton">
                <FavouriteButton game={{ id, name, image, rating, released }} />
            </div>
        </Card>
    );
}

GameItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    released: PropTypes.string.isRequired
};

export default GameItem;