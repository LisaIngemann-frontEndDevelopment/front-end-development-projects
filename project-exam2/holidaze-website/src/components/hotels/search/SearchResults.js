import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import HotelItem from "../HotelItem";
import styles from "./Search.module.scss";

function SearchResults({ searchItem, hotelsArray }) {
    const [filteredHotels, setFilteredHotels] = useState([]);

    function filterHotels(searchItem) {
        if(searchItem.length === 0) {
        } else {
            const lowerCaseInput = searchItem.toLowerCase();
            
            const filteredArray = hotelsArray.filter(function (result) {
                const lowercaseName = result.name.toLowerCase();
            
                if (lowercaseName.match(lowerCaseInput)) {
                    return true;
                } else {
                    return false;
                }
            });
        
            setFilteredHotels(filteredArray);
        }
    }

    useEffect(() => {
        filterHotels(searchItem); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(filteredHotels.length === 0) {
        return <p className={styles.p}>No results, go back <Link to="/">Home</Link> or search through all hotels below.</p>
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <p className="text-center">Search Result</p>
                </Col>
                {filteredHotels.map((hotel,i) => {
                    return (
                        <Col sm={12} md={6} key={i} className="mx-auto">
                            <HotelItem 
                                id={hotel.id} 
                                name={hotel.name} 
                                image={hotel.image} 
                                price={hotel.price} 
                                maxGuests={hotel.maxGuests}/>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

export default SearchResults;