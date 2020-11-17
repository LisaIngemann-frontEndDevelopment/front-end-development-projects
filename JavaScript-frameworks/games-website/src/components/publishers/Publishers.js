import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from "../accordion/AccordionItem";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL_PUBLISHERS } from "../../constants/api";
import {Helmet} from "react-helmet";

function Publishers() {
    const [publishers, setPublishers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(BASE_URL_PUBLISHERS)
            .then(response => response.json())
            .then(json => {
                setPublishers(json.results);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation="border" className="spinner" />;
    };

    return (
        <>
            <Helmet>
                <title>Games | Publishers</title>
            </Helmet>

            <h1>Publishers</h1>
            <Accordion defaultActiveKey="1">
                {publishers.map((publisher, index) => {
                      return <AccordionItem key={index} event={index + 1} name={publisher.name} count={publisher.games_count} games={publisher.games} />
                })}
            </Accordion>
        </>
    );
}

export default Publishers;