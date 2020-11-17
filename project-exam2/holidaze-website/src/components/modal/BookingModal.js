import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { 
    Button, 
    Modal, 
    Form, 
    Col, 
    Row } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import ErrorMessage from "../contact/ErrorMessage";
import SentMessage from "../contact/SentMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL, headers } from "../../constants/api";

import styles from "./BookingModal.module.scss";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "First name must be at least 2 characters long"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    maxGuests: yup
        .number()
        .required("Number of guests are required"),
});

function BookingModal(props) {
    const [serverError, setServerError] = useState(false);
    const [validated, setValidated] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let maxGuests = props.maxGuests;

    async function onSubmit(data, event) {
        let checkIn = startDate.toString();
        let checkOut = endDate.toString();
        let sendEnquiry = {
            "name": data.name,
            "email": data.email,
            "establishmentId": props.id,
            "checkIn": checkIn,
            "checkOut": checkOut
        }

        const url = BASE_URL + "enquiries";
        const options = { headers, method: "POST", body: JSON.stringify(sendEnquiry) };

        for(let i=0; data.maxGuests > i; i++) {
            await fetch(url, options).then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    setServerError(true);
                    throw new Error("Bad response from server");
                }
                return response;
            }).catch((error) => {
                console.log(error)
            });
        }

        event.target.reset();

        if(!serverError) {
            setValidated(true);
            setTimeout(() => {
                setValidated(false)
                props.onHide(false)
            }, 3500);  
        }
    }

    return (
        <Modal
            {...props}
            aria-labelledby="booking-modal"
            size="lg"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Book Hotel Room at {props.name}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}> 
                <Modal.Body>
                    {serverError 
                        ?
                            <>
                                <SentMessage displayMessage={validated} text="An error occured while trying to book a room. ">
                                    Please try again or come back later.
                                </SentMessage>
                            </>
                        :
                            <>
                                 <SentMessage displayMessage={validated} text="Room was succesfully booked." />
                            </>
                    }
                    <Form.Group>
                        <Row>
                            <Col lg="6">
                                <Form.Control className={styles.input} type="text" name="name" placeholder="Name*" ref={register} />
                                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                            </Col>
                            <Col lg="6">
                                <Form.Control className={styles.input} type="text" name="email" placeholder="Email*" ref={register} />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col lg="6">
                            <Form.Label>Number of Guests</Form.Label>
                                <Form.Control as="select" name="maxGuests" ref={register}>
                                    {[...Array(maxGuests)].map((e, i) => 
                                        <option key={e}>{i + 1}</option>
                                    )}
                                </Form.Control>
                                <div className="selectArrow">
									<IoIosArrowDown size={25} />
								</div>
                                {errors.maxGuests && <ErrorMessage>{errors.maxGuests.message}</ErrorMessage>}
                            </Col>
                            <Col lg="6">
                                <p className={styles.p}>{props.price} kr per room for 1 night</p>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col lg="6">
                                <Form.Label>Checkin Date</Form.Label>
                                <div className={styles.customDatePickerWidth}>
                                    <DatePicker 
                                        className={styles.dateInput}
                                        selected={startDate} 
                                        onChange={date => setStartDate(date)}
                                        minDate={new Date()}
                                        showDisabledMonthNavigation
                                        name="checkIn" 
                                        ref={register.value} 
                                    />
                                    {errors.checkIn && <ErrorMessage>{errors.checkIn.message}</ErrorMessage>}
                                </div>
                                <div className="dateIcon">
                                    <i className="icon-enquiry"></i>
                                </div>
                            </Col>
                            <Col lg="6">
                                <Form.Label>Checkout Date</Form.Label>
                                <div className={styles.customDatePickerWidth}>
                                    <DatePicker 
                                        className={styles.dateInput}
                                        selected={endDate} 
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        name="checkOut"  
                                        ref={register} 
                                    />
                                    {errors.checkOut && <ErrorMessage>{errors.checkOut.message}</ErrorMessage>}
                                </div>
                                <div className="dateIcon">
                                    <i className="icon-enquiry"></i>
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary-up">Book Room</Button>
                </Modal.Footer>
            </Form>
        </Modal>

    );
}

export default BookingModal;