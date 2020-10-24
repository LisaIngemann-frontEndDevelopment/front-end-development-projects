import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import GameGenres from "./GameGenres";
import GamePlatforms from "./GamePlatforms";
import { BASE_URL } from "../../constants/api";

function GameDetail() {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    const url = BASE_URL + "/" + id;

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setDetail(json))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [url]);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    }


    function createMarkup() { 
        return {__html: detail.description}; 
    };

    return (
        <>
            <Row>
                <Image className="detail-image" src={detail.background_image} />
                <Col className="detail-Col">
                    <h1>{detail.name}</h1>
                    <div className="detail-description" dangerouslySetInnerHTML={createMarkup()} />
                    <p><b>Website Link: </b><a href={detail.website} target="_blank" rel="noopener noreferrer">Go to Website</a></p>
                </Col>
            </Row>
            <Row className="detail-Row">
                <Col>
                    <GameGenres genres={detail.genres} />
                </Col>
                <Col>
                    <GamePlatforms platforms={detail.platforms} />
                </Col>
            </Row>
        </>
    );
}

export default GameDetail;