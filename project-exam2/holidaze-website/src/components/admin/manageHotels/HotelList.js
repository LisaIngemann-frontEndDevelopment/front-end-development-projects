import React, { useState, useEffect } from "react";
import { BASE_URL, headers } from "../../../constants/api";
import { Container, Row, Card, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./HotelList.module.scss";

function HotelList() {
	const [hotels, setHotels] = useState([]);
	const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);
    const urlFetch = BASE_URL + "establishments";
    const options = { headers };

	useEffect(() => {
        fetch(urlFetch, options)
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
                <p className="fetchErrorP">There was an error, we could not catch up to the data! Try reloading the page or go 
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
	}
	
	return (
		<Container className={styles.container}>
			<Row className={styles.header}>
				<Col md={12}>
					<h3>Hotel List</h3>
				</Col>
				<Col>
					<p>Choose a hotel to edit</p>
				</Col>
			</Row>
			<Row>
				{hotels.map((hotel,index) => {
					return (
						<Col sm={6} md={4} xl={3} key={index} className={styles.card}>
							<Link to={`/edit/${hotel.id}`}>
							<Card className="card-hotelList">
								<Card.Body>
									<h4 className={styles.h4}>{hotel.name}</h4>
								</Card.Body>
							</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default HotelList;