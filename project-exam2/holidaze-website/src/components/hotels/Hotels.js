import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Spinner, Row, Col, Container } from "react-bootstrap";
import HotelItem from "./HotelItem";
import Search from "./search/Search";
import { BASE_URL, headers } from "../../constants/api";
import { Helmet } from "react-helmet";
import SearchResults from "./search/SearchResults";

import styles from "./Hotels.module.scss";

function Hotels() {
    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);

    const url = BASE_URL + "establishments";
    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                if(json.error) {
                    setServerError(true);
                }
                else {
                    setHotels(json);
                    setFilteredHotels(json);
                }   
            })
            .catch(error => {
                setServerError(true);
                console.log(error);
            }) 
            .finally(() => setLoading(false)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function filterHotels(inputValue) {
        const lowerCaseInput = inputValue.toLowerCase();
    
        const filteredArray = hotels.filter(function (result) {
            const lowercaseName = result.name.toLowerCase();
    
            if(lowercaseName.match(lowerCaseInput)) {
                return true;
            } else {
                return false;
            }
        });

        setFilteredHotels(filteredArray);
    };

    if(loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    if(serverError) {
        return <Container>
                <p className="fetchErrorP">There was an error, we could not catch up to the data! Try reloading the page or go 
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
    }

    return (
        <>  
        	<Helmet>
                <title>Holidaze | Hotels</title>
                <meta name="keywords" content="holidaze hotels,hotel,B&amp;B,guesthouse,establishment,accommodation,booking,bergen city,more information,price,max guests" />
            </Helmet>

            <Container>
                <h1>Hotels</h1>
                {location.state
                    && <SearchResults searchItem={location.state.params} hotelsArray={hotels} />
                }
                <Search handleSearch={filterHotels} />
                <Row>
                    {filteredHotels.length > 0 ?   
                        filteredHotels.map(hotel => {
                            const { id, name, image, price, maxGuests } = hotel;

                            return (
                                <Col sm={12} md={6} lg={4} xl={3} key={id}>
                                    <HotelItem 
                                        id={id} 
                                        name={name} 
                                        image={image} 
                                        price={price} 
                                        maxGuests={maxGuests} 
                                    />
                                </Col>
                            );
                        })
                        : <p className={styles.p}>No hotel by that name.</p>
                    }
                </Row>
            </Container>
        </>
    );
}

export default Hotels;