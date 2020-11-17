import React, { useState, useEffect } from "react";
import { BASE_URL, headers } from "../../../constants/api";
import AccordionMessageItem from "./AccordionMessageItem";
import { Link } from "react-router-dom";
import { Container, Row, Col, Accordion, Spinner } from "react-bootstrap";

import styles from "./Messages.module.scss";

function Messages() {
	const [messages, setMessages] = useState([]);
	const [serverError, setServerError] = useState(false);
	const [loading, setLoading] = useState(true);
	
	const url = BASE_URL + "contacts";
	const options = { headers };

	useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                if(json.error) {
                    setServerError(true);
                }
                else {
					setMessages(json);
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
						<h2>Messages</h2>
					</Col>
				</Row>

				<Row>
					<Accordion>
						{messages.map((message, index) => {
							return <AccordionMessageItem 
								key={index} 
								event={index + 1} 
								id={message.id} 
								name={message.name} 
								email={message.email} 
								message={message.message} 
								created={message.createdAt}
							/>
						})}
					</Accordion>
				</Row>
			</Container>
		</>
	);
}

export default Messages;