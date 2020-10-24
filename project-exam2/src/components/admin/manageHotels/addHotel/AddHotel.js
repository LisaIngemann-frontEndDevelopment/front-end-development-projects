import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BASE_URL, headers } from "../../../../constants/api";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import ErrorMessage from "../../../contact/ErrorMessage";
import SentMessage from "../../../contact/SentMessage";

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

function AddHotel() {
	const [validated, setValidated] = useState(false);
	const [serverError, setServerError] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema
	});
	const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop -120)  
	const myRef = useRef(null);

    async function onSubmit(data, event) {
		let selfCatering = data.selfCatering;
        const selfCateringUpdate = (() => {
            if (selfCatering === "Yes") {
                return true;
            } else {
                return false;
            }
        })();
        let addEstablishment = {
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

        const url = BASE_URL + "establishments";
        const options = { headers, method: "POST", body: JSON.stringify(addEstablishment) };
		
        await fetch(url, options).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setServerError(true);
                throw new Error("Bad response from server");
			}
			scrollToRef(myRef);
        }).catch((error) => {
          	console.log(error)
        });

		setValidated(true);
		setTimeout(() => setValidated(false), 3000);
		event.target.reset();
	}
	
	if(serverError) {
        return <Container>
                <p className="fetchErrorP">An error occured while trying to submit your data. Reload the page and try again or go to
                    <Link to="/" className="fetchErrorLink"> Home</Link>
                </p>
            </Container>
	}
	
	return (
		<Container ref={myRef} className={styles.container}>
				<SentMessage displayMessage={validated} text="New hotel was successfully added"/>					
				<Form onSubmit={handleSubmit(onSubmit)}>	
					<Row>
						<Col md={12}>
							<Form.Label className={styles.label}>Information</Form.Label>
						</Col>
					</Row>
					<Form.Group className={styles.inputGroups} >
						<Row>
							<Col md={6}>
								<Form.Control type="text" name="name" placeholder="Name of hotel" ref={register} />
								{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
							</Col>
							<Col md={6}>
								<Form.Control type="text" name="email" placeholder="Email" ref={register} />
								{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
							</Col>
						</Row>
					</Form.Group>

					<Form.Group className={styles.input}>
						<Row>
							<Col md={6}>
								<Form.Control type="text" name="image" placeholder="image url" ref={register} />
								{errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
							</Col>
							<Col md={6}></Col>
						</Row>
					</Form.Group>

					<Form.Group className={styles.inputGroups}>
						<Row>
							<Col md={6}>
								<Form.Control type="text" name="price" placeholder="Price per guest" ref={register} />
								{errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
							</Col>
							<Col md={6}>
								<Form.Control type="text" name="maxGuests" placeholder="Number of guests allowed" ref={register} />
								{errors.maxGuests && <ErrorMessage>{errors.maxGuests.message}</ErrorMessage>}
							</Col>
						</Row>
					</Form.Group>

					<Form.Group className={styles.input}>
						<Row>
							<Col md={6}>
								<Form.Label>Does hotel have self catering?</Form.Label>
								<Form.Control as="select" name="selfCatering" ref={register}>
									<option>Yes</option>
									<option>No</option>
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
								<Form.Control type="text" name="lat" placeholder="Latitude" ref={register} />
								{errors.lat && <ErrorMessage>{errors.lat.message}</ErrorMessage>}
							</Col>
							<Col md={6}>
								<Form.Control type="text" name="lng" placeholder="Longitude" ref={register} />
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
							placeholder="Description of hotel" 
							ref={register} 
						/>
						{errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
					</Form.Group>

					<Button type="submit" variant="primary-up" className={styles.button}>
						<i className="add icon-error"></i>Add Hotel
					</Button>
				</Form>
		</Container>
	);
}

export default AddHotel;