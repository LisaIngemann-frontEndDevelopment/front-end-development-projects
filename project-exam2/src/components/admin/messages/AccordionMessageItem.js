import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { BASE_URL, headers } from "../../../constants/api";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";

import styles from "./Messages.module.scss";

function AccordionMessageItem( {id, event, name, email, message, created} ) {
    const [serverError, setServerError] = useState(false);
    const history = useHistory();

    function checkDelete() {
        confirmAlert({
            title: "Confirm deletion",
            buttons: [
                {
                    label: "yes",
                    onClick: () => deleteMessage(),
                },
                {
                    label: "no",
                },
            ],
        });
    }

    async function deleteMessage() {
        const url = BASE_URL + "contacts/" + id;
        const options = { headers, method: "DELETE" };

        await fetch(url, options).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setServerError(true);
                throw new Error("Bad response from server");
            }
            history.push("/admin");
        }).catch((error) => {
            console.log(error)
        });
    }

    if(serverError) {
        setTimeout(() => history.push("/admin"), 3500);
        return <Container>
                <p className="fetchErrorP">An error occured while trying to delete message. Try again or come back later.</p>
            </Container>
    } 

    return (
        <Card className="accordion-card">
            <Accordion.Toggle as={Card.Header} eventKey={event} className={event}>
                {name} <span className={styles.span}>{moment(created).format("ddd MMM DD YYYY")}<IoIosArrowDown /></span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={event} >
                <Card.Body>
                    <h3 className={styles.h3}>{name} Says..</h3>
                    <p>{message}</p>
                    <p><b>Email:</b> <span>{email}</span></p>
                    <Button 
                        variant="delete" 
                        className={styles.button}
                        onClick={checkDelete}>
                        <i className="icon-error"></i>Delete Message
                    </Button>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

AccordionMessageItem.propTypes = {
    id: PropTypes.string.isRequired,
    event: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
};

export default AccordionMessageItem;