import React, { useState, useEffect } from "react";
import { BASE_URL, headers } from "../../../constants/api";
import { Link } from "react-router-dom";
import AccordionEnquiryItem from "./AccordionEnquiryItem";
import { Container, Row, Col, Accordion, Spinner } from "react-bootstrap";

import styles from "./Enquiry.module.scss";

function Enquiries() {
	const [enquiries, setEnquiries] = useState([]);
	const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);
	
	const url = BASE_URL + "enquiries";
	const options = { headers };

	useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                if(json.error) {
                    setServerError(true);
                }
                else {
					setEnquiries(json);
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
		<>
			<Container className={styles.container}>
				<Row>
					<Col>
						<h2>Enquiries</h2>
					</Col>
				</Row>

				<Row>
					<Accordion>
						{enquiries.map((enquiry, index) => {
							return <AccordionEnquiryItem key={index} event={index + 1} id={enquiry.id} name={enquiry.name} email={enquiry.email} establishment={enquiry.establishmentId} checkIn={enquiry.checkIn} checkOut={enquiry.checkOut} created={enquiry.createdAt}/>
						})}
					</Accordion>
				</Row>
			</Container>
		</>
	);
}

export default Enquiries;