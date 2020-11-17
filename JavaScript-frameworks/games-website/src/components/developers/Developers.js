import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from "../accordion/AccordionItem";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL_DEVELOPERS } from "../../constants/api";
import {Helmet} from "react-helmet";

function Developers() {
    const [developers, setDevelopers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(BASE_URL_DEVELOPERS)
            .then(response => response.json())
            .then(json => {
                setDevelopers(json.results);
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
                <title>Games | Developers</title>
            </Helmet>

            <h1>Developers</h1>
            <Accordion>
                {developers.map((developer, index) => {
                      return <AccordionItem event={index} name={developer.name} count={developer.games_count} games={developer.games} />
                })}
            </Accordion>
        </>
    );
}

export default Developers;