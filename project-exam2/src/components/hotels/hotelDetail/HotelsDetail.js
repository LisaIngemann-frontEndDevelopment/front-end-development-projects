import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Row, Container, Col, Image, Button } from "react-bootstrap";
import { BASE_URL, headers } from "../../../constants/api";
import BookingModal from "../../modal/BookingModal";
import { Helmet } from "react-helmet";

import styles from "./HotelsDetail.module.scss";

function HotelsDetail() {
    const [detail, setDetail] = useState("");
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    let { id } = useParams();

    const url = BASE_URL + "establishments/" + id;
    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                if(json.error) {
                    setServerError(true);
                }
                else {
                    setDetail(json);
                }   
            })
            .catch(error => {
                setServerError(true)
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
        <>
            <Helmet>4
                <title>Holidaze | Hotels | Detail</title>
                <meta name="keywords" content="holidaze hotels,hotel,book room,bergen city,price,number of guests,hotel email,map,location,hotel description,booking form" />
            </Helmet>

            <Container className={styles.container}>
                <Link className={styles.link} to={"/hotels"}>
                    &lt; Back to Hotels
                </Link>
                <h1 className={styles.h1}>{detail.name}</h1>
                <Row>
                    <Col sm={12} md={6}>
                    <Image className={styles.image} src={detail.image} />
                    </Col>
                    <Col sm={12} md={6}>
                        <div>
                            <h2 className={styles.h2}>Price</h2>
                            <p>{detail.price} kr per room (1 person) for 1 night.</p>
                        </div>

                        <div>
                            <h2 className={styles.h2}>About {detail.name}</h2>
                            <p>{detail.description}</p>
                            {detail.selfCatering 
                                ? <p>{detail.name} has self catering.</p> 
                                : <p>{detail.name} does not have self catering.</p>
                            }
                        </div>

                        <div>
                            <h2 className={styles.h2}>Email &amp; Location</h2>
                            <p><b>Hotel Email: </b><a className={styles.a} href={`mailto:${detail.email}`}>{detail.email}</a></p>
                        </div>

                        <div>
                            <p className={styles.map}>Map:</p>
                            <iframe
                                title="map"
                                width="100%"
                                height="300"
                                frameBorder="0"                                
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAJN4MFB9YMgKpeN3QrJzTIpNcO5HKikxs&q=${detail.lat},${detail.lng}`} 
                                allowFullScreen>
                            </iframe>
                        </div>
                        
                        <Button variant="primary-up" className={styles.button} onClick={() => setModalShow(true)}>
                            <i className="icon-enquiry"></i> Book a Room
                        </Button>
                    </Col>
                </Row>

                <BookingModal 
                    id={detail.id} 
                    name={detail.name} 
                    price={detail.price} 
                    maxGuests={detail.maxGuests} 
                    show={modalShow} 
                    onHide={() => setModalShow(false)} 
                />
            </Container>
        </>
    );
}

export default HotelsDetail;