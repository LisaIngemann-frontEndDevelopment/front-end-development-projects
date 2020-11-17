import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessage";
import SentMessage from "./SentMessage";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BASE_URL, headers } from "../../constants/api";

import styles from "./Contact.module.scss";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters long"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    message: yup
        .string()
        .required("Message is required")
        .min(10, "Message must be greater than 10 characters")
});

function Contact() {
    const [validated, setValidated] = useState(false);
    const [serverError, setServerError] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema
    });

    async function onSubmit(data, event) {
        const url = BASE_URL + "contacts";
        const options = { headers, method: "POST", body: JSON.stringify(data) };

        await fetch(url, options).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setServerError(true);
                throw new Error("Bad response from server");
            }
            window.scrollTo(0, 100);
        }).catch((error) => {
            console.log(error)
        });

        event.target.reset();
        setValidated(true);
        setTimeout(() => setValidated(false), 3000);
    }

    if(serverError) {
        return <Container>
                <p className="fetchErrorP">An error occured while trying to submit your data. Reload the page and try again or go 
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
    }
    
    return (
        <>
        	<Helmet>
                <title>Holidaze | Contact</title>
                <meta name="keywords" content="holidaze hotels,hotel,bergen city,contact form,contact holidaze" />
            </Helmet>

            <Container className={styles.container}>
                <div className="container-form">
                    <h1>Contact</h1>
                    <p className={styles.p}>Contact us to give feedback or report errors on the website.</p>
                    <SentMessage displayMessage={validated} text="Your message was sent."/>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group> 
                        <Row>
                            <Col className={styles.input} md={12} lg={6}>
                                <Form.Control type="text" name="name" placeholder="Enter your name" ref={register} />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                            </Col>

                            <Col md={12} lg={6}>
                                <Form.Control type="text" name="email" placeholder="Enter your email" ref={register} />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </Col>
                        </Row>
                    </Form.Group>

                        <Form.Group>
                            <Form.Control as="textarea" name="message" placeholder="Enter your message" rows="3" ref={register} />
                            {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                        </Form.Group>
                        <div className={styles.button}>
                            <Button type="submit" variant="primary-up">Send Message</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
}

export default Contact;