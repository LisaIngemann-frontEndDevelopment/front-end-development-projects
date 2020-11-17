import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GameItem from "../game/GameItem";
import Search from "./Search";
import { BASE_URL } from "../../constants/api";
import {Helmet} from "react-helmet";

function GameList() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(json => {
                setGames(json.results);
                setFilteredGames(json.results);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    function filterGames(inputValue) {
        const lowerCaseInput = inputValue.toLowerCase();
    
        const filteredArray = games.filter(function (result) {
            const lowercaseName = result.name.toLowerCase();
    
            if (lowercaseName.match(lowerCaseInput)) {
                return true;
            } else {
                return false;
            }
        });

        setFilteredGames(filteredArray);
    };
    
    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    	// if the filtered results array is empty (what the user typed in doesn't match any results), display a message
	if (filteredGames.length === 0) {
		return (
			<>
				<Search handleSearch={filterGames} />
				<div>No results</div>
			</>
		);
	}

    return (
        <>
        	<Helmet>
                <title>Games</title>
            </Helmet>

            <Search handleSearch={filterGames} />
            <Row>
                {filteredGames.map(game => {
                    const { id, name, background_image, rating, released } = game;

                    return (
                        <Col sm={6} md={4} xl={3} key={id}>
                            <GameItem id={id} name={name} image={background_image} rating={rating} released={released} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

export default GameList;