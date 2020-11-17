import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Spinner, Row, Col, Button, Container } from "react-bootstrap";
import HotelItem from "../hotels/HotelItem";
import { BASE_URL, headers } from "../../constants/api";
import { AuthContext } from "../../context/AuthContext";
import TypeAheadInput from "./TypeAhead";

import styles from "./Home.module.scss";

function Home() {
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);

    const { loggedIn, user } = useContext(AuthContext);

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
                }   
            })
            .catch(error => {
                setServerError(true);
                console.log(error);
            }) 
            .finally(() => setLoading(false)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    if(serverError) {
        return <Container>
                <p className="fetchErrorP">There was an error, we could not catch up to the data! Try reloading the page or come back later.
                </p>
            </Container>
    }

    return (
        <>
            <Helmet>
                <title>Holidaze</title>
                <meta name="keywords" content="holidaze hotel booking,hotel,B&amp;B,guesthouse,establishment,accommodation,booking,bergen city,management,establishment owners,admin,contact,hotels" />
            </Helmet>

            <Container fluid className={styles.container}>
                <section className={styles.backgroundImg}>
                    <Row>
                        <div className={styles.headerContent}>
                            <h1 className={styles.h1}>Holidaze, Hotel Booking In Bergen City</h1>
                            <TypeAheadInput options={hotels} />
                        </div>
                        <div className={styles.backgroundWave}></div>
                    </Row>
                </section>
            </Container>

            <Container className={styles.containerHotels}>
                <section>
                    <Row className={styles.h2}>
                        <h2>Take a Look at Our Hotels</h2>
                    </Row>
                    <Row>
                        {hotels.slice(0, 3).map((hotel, i) => {
                            return (
                                <Col sm={12} md={6} lg={4} key={i}>                       
                                    <HotelItem 
                                        id={hotel.id} 
                                        name={hotel.name} 
                                        image={hotel.image} 
                                        price={hotel.price} 
                                        maxGuests={hotel.maxGuests} 
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/hotels">                   
                                <Button variant="primary-centered" className={styles.centeredButton}>See All Hotels</Button>   
                            </Link>
                        </Col>
                    </Row>
                </section>
            </Container>
                
            <Container className={styles.holidazeIs} fluid>
                <section className={styles.section}>
                    <div className={styles.holidaze}>
                        <h2>Holidaze Is</h2>
                        <p>Holidaze is a company that offers hotels, B&amp;B's and guesthouses in Bergen City. We offer these services for 
                            consumers and hotel managers.</p>
                    </div>
                    <Row>
                        <Col md={6} className={styles.sectionSmall}>
                            <h3 className={styles.h3}>Hotel Booking</h3>
                            <p className={styles.p}>At Holidaze we choose the best hotels in the city. We value the quality and 
                                affordability that they can provide. If you ever find yourself without a place 
                                to stay just take a look at our hotels and find one that suits your needs.</p>
                            <Link to="/hotels">
                                <Button className={styles.center} variant="primary-sideways">Book a Hotel Room</Button>
                            </Link>
                        </Col>
                        <Col md={6}>
                                <h3 className={styles.h3}>Hotel Management</h3>
                                <p className={styles.p}>For establishment managers we offer an admin page where you can 
                                    manage your own establishments. Log in and visit the admin page to 
                                    update, delete or add a new hotel to our list.</p>
                            {loggedIn ? 
                                <Link to="/admin/manageHotels">
                                    <Button className={styles.center} variant="primary-sideways">Manage Hotels</Button>
                                </Link>
                            :   user ? 
                                    <Link to="/login">
                                        <Button variant="primary-sideways">Log In</Button>
                                    </Link> 
                                :
                                    <Link to="/register">
                                        <Button variant="primary-sideways">Log In</Button>
                                    </Link>                              
                            }
                        </Col>
                    </Row>
                </section>
            </Container>
        </>
    );
}

export default Home;