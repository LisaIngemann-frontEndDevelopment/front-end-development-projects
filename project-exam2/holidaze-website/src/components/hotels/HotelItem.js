import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import MaxGuests from "./MaxGuests";

function HotelItem({ id, name, image, price, maxGuests }) {
    return (
        <Link to={"hotelsDetail/" + id}>
            <Card className="card-hotel">
                <div className="card-img"><Card.Img variant="top"  style={{ backgroundImage: `url(${image})` }}/></div>
                <Card.Body>
                    <h4>{name}</h4>
                    <p><b>Price: </b>{price}</p>
                    <p><b>Rooms available: </b><MaxGuests number={maxGuests} /></p>
                        <Button variant="card" block>
                            View Details
                        </Button>
                </Card.Body>
            </Card>
        </Link>
    );
}

HotelItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
};

export default HotelItem;