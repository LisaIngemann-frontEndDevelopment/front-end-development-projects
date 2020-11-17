import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { Accordion, Card, Button, Col, Row, Container } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { BASE_URL, headers } from "../../../constants/api";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";

import styles from "./Enquiry.module.scss";

function AccordionEnquiryItem({id, event, name, email, establishment, checkIn, checkOut, created}) {
    const [serverError, setServerError] = useState(false);
    const history = useHistory();

    function checkDelete() {
        confirmAlert({
            title: "Confirm deletion",
            buttons: [
                {
                    label: "yes",
                    onClick: () => deleteEnquiry(),
                },
                {
                    label: "no",
                },
            ],
        });
    }

    async function deleteEnquiry() {
        const url = BASE_URL + "enquiries/" + id;
        const options = { headers, method: "DELETE" };
        
        await fetch(url, options).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setServerError(true);
                throw new Error("Bad response from server");
            }
            history.push("/admin");
        }).catch((error) => console.log(error));
    }

    if(serverError) {
        setTimeout(() => history.push("/admin"), 3500);
        return <Container>
                <p className="fetchErrorP">An error occured while trying to delete enquiry. Try again or come back later.
                </p>
            </Container>
    } 

    return (
        <Card className="accordion-card">
            <Accordion.Toggle as={Card.Header} eventKey={event} className={event}>
                {name} <span className={styles.span}>{moment(created).format("ddd MMM DD YYYY")}<IoIosArrowDown /></span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={event}>
                <Card.Body>
                    <h3 className={styles.h3}>Enquiry from {name}</h3>
                    <Row>
                        <Col md={4}>
                            <p><b>Email:</b></p>
                            <p><b>Establishment ID:</b></p>
                            <p><b>Check In:</b></p>
                            <p><b>Check Out:</b></p>
                        </Col>
                        <Col md={8}>
                            <p>{email}</p>
                            <p>{establishment}</p>
                            <p>{moment(checkIn).format("ddd MMM DD YYYY")}</p>
                            <p>{moment(checkOut).format("ddd MMM DD YYYY")}</p>
                        </Col>
                    </Row>
                    <Button variant="delete" className={styles.button} onClick={checkDelete}>
                        <i className="icon-error"></i>Delete Enquiry
                    </Button>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

AccordionEnquiryItem.propTypes = {
    id: PropTypes.string.isRequired,
    event: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    establishment: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
};

export default AccordionEnquiryItem;