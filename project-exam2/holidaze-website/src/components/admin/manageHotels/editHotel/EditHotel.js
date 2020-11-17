import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Spinner, Button, Form, Container, Row, Col } from "react-bootstrap";
import { BASE_URL, headers, PATCH } from "../../../../constants/api";
import DeleteHotel from "./deleteHotel/DeleteHotel";
import ErrorMessage from "../../../contact/ErrorMessage";
import SentMessage from "../../../contact/SentMessage";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Helmet } from "react-helmet";

import styles from "../ManageHotels.module.scss";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "First name must be at least 2 characters long"),
    email: yup
        .string()
        .email("Please enter a valid email")
		.required("Email is required"),
	image: yup
        .string()
		.required("Image is required"),
	price: yup
		.number()
		.typeError("Please enter a number")
		.required("Price is required"),
	maxGuests: yup
		.number()
		.typeError("Please enter a number")
		.required("Max guests are required"),
	lat: yup
        .string()
        .matches(/^(-?\d+(\.\d+)?)$/,"Latitude example: -11.023")
		.required("Latitude is required"),
	lng: yup
        .string()
        .matches(/^(-?\d+(\.\d+)?)$/,"Longitude example: 11.023")
		.required("Longitude is required"),
    description: yup
        .string()
        .required("Description is required")
        .min(10, "Description must be greater than 10 characters")
});

function EditHotel() {
    const [serverError, setServerError] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema
    });
    const history = useHistory();
    const defaultState = {
        name: "",
        email: "",
    };
    const [hotel, setHotel] = useState(defaultState);
    
    let { id } = useParams();

    const options = { headers };
    const fetchUrl = BASE_URL + "establishments/" + id;

    useEffect(() => {
        fetch(fetchUrl, options)
            .then(response => response.json())
            .then(json => {
                if(json.error) {
                    setServerError(true);
                }
                else {
                    setHotel(json);
                }   
            })
            .catch(error => {
                setServerError(true);
                console.log(error);
            }) 
            .finally(() => setLoading(false)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(data, event) {
        let selfCatering = data.selfCatering
        const selfCateringUpdate = (() => {
            if (selfCatering === "Yes") {
                return true;
            } else {
                return false;
            }
        })();

        let updatedEstablishment = {
            "name": data.name,
            "email": data.email,   
            "image": data.image,
            "price": parseFloat(data.price),
            "maxGuests": parseFloat(data.maxGuests),
            "lat": parseFloat(data.lat),
            "lng": parseFloat(data.lng),
            "description": data.description, 
            "selfCatering": selfCateringUpdate,
        };

        const updateOptions = { headers, method: PATCH, body: JSON.stringify(updatedEstablishment) };

        await fetch(fetchUrl, updateOptions).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setSubmitError(true);
                throw new Error("Bad response from server");
            }
            setValidated(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                setValidated(false)
                history.push("/admin/manageHotels/hotelList");
            }, 2000);
        }).catch((error) => console.log(error));
    }

    if(serverError) {
        return <Container>
                <p className="fetchErrorP">There was an error, we could not catch up to the data! Try reloading the page or go 
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
    }
    
    if(submitError) {
        return <Container>
                <p className="fetchErrorP">An error occured while trying to submit your data. Reload the page and try again or go 
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
    }

    if(loading) {
        return <Spinner animation="border" className="spinner" />;
    }

    return (
        <>
            <Helmet>
                <title>Holidaze | Admin | Edit Hotel</title>
                <meta name="keywords" content="holidaze hotels,edit hotel form,hotel description,delete hotel,price,max guests,location" />
            </Helmet>

            <Container className={styles.container}>
                <Link className={styles.link} to="/admin/manageHotels">
                    &lt; Back to manage hotels
                </Link>
                <h1>Edit {hotel.name}</h1>
                <SentMessage displayMessage={validated} text="Hotel was edited"/>					
                <Form onSubmit={handleSubmit(onSubmit)}>	
                    <Row>
                        <Col md={12}>
                            <Form.Label className={styles.label}>Information</Form.Label>
                        </Col>
                    </Row>
                    <Form.Group className={styles.inputGroups} >
                        <Row>
                            <Col md={6}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" defaultValue={hotel.name} ref={register} />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                            </Col>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" defaultValue={hotel.email} placeholder="Email" ref={register} />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className={styles.input}>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Image url</Form.Label>
                                <Form.Control type="text" name="image" defaultValue={hotel.image} ref={register} />
                                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
                            </Col>
                            <Col md={6}></Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className={styles.inputGroups}>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" defaultValue={hotel.price} ref={register} />
                                {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
                            </Col>
                            <Col md={6}>
                                <Form.Label>Max guests</Form.Label>
                                <Form.Control type="text" name="maxGuests" defaultValue={hotel.maxGuests} ref={register} />
                                {errors.maxGuests && <ErrorMessage>{errors.maxGuests.message}</ErrorMessage>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className={styles.input}>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Self catering</Form.Label>
                                <Form.Control as="select" defaultValue={hotel.selfCatering ? "Yes" : "No"} name="selfCatering" ref={register}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Control>
                                <div className="selectArrow">
                                    <IoIosArrowDown size={25} />
                                </div>
                            </Col>
                            <Col md={6}></Col>
                        </Row>
                    </Form.Group>

                    <div className={styles.line}></div>

                    <Form.Label className={styles.label}>Location</Form.Label>

                    <Form.Group className={styles.inputGroups}>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control type="text" name="lat" defaultValue={hotel.lat} ref={register} />
                                {errors.lat && <ErrorMessage>{errors.lat.message}</ErrorMessage>}
                            </Col>
                            <Col md={6}>
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control type="text" name="lng" defaultValue={hotel.lng} ref={register} />
                                {errors.lng && <ErrorMessage>{errors.lng.message}</ErrorMessage>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <div className={styles.line}></div>

                    <Form.Label className={styles.label}>Description</Form.Label>

                    <Form.Group className={styles.input}>
                        <Form.Control 
                            as="textarea" 
                            rows="5" 
                            name="description" 
                            defaultValue={hotel.description} 
                            ref={register} 
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </Form.Group>

                    <Button type="submit" variant="primary-up" className={[styles.button, styles.buttonEdit].join(' ')}>
                        <FaEdit size={25}/> Edit Hotel
                    </Button>
                </Form>
                <DeleteHotel id={id} />
			</Container>
        </>
    );
}

export default EditHotel;
