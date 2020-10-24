import React from "react";
import PropTypes from "prop-types";

function GameGenres({ genres }) {
    return (
        <>
            <p><b>Genres</b></p>
            <ul>
                {genres.map((genre, index) => {
                    return <li key={index}>{genre.name}</li>
                })}
            </ul>
        </>
    );
}

GameGenres.propTypes = {
    genres: PropTypes.array.isRequired
};

export default GameGenres;