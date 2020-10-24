import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from "react-bootstrap/Card";
import { IoIosArrowDown } from "react-icons/io";

function AccordionItem( {event, name, count, games} ) {
    return (
        <Card className="accordion-card">
            <Accordion.Toggle as={Card.Header} eventKey={event}>
                {name} <span className="accordion-info">More information <IoIosArrowDown /></span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={event}>
                <Card.Body>
                    <h2>Games</h2>
                    <p>Count: <span className="count">{count}</span></p>
                    <p>Examples</p>
                    <ul>
                        {games.map(function(game, index){
                            return <li key={index}>{game.name}</li>
                        })}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default AccordionItem;