import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ErrorMessage from "./ErrorMessage";
import SentMessage from "./SentMessage";
import {Helmet} from "react-helmet";

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters long"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters long"),
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
    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema
    });

    function onSubmit(data, event) {
        console.log(data);

        event.target.reset();

        setValidated(true);

        setTimeout(() => setValidated(false), 3000);
    }

    return (
        <>
        	<Helmet>
                <title>Games | Contact</title>
            </Helmet>

            <div className="container-form">
                <h1>Contact</h1>
                <SentMessage displayMessage={validated} />
                <Form onSubmit={handleSubmit(onSubmit)}> 
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="firstName" placeholder="Enter your first name" ref={register} />
                        {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" placeholder="Enter your last name" ref={register} />
                        {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" placeholder="Enter your email" ref={register} />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" name="message" placeholder="Enter your message" rows="3" ref={register} />
                        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                    </Form.Group>

                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </>
    );
}

export default Contact;