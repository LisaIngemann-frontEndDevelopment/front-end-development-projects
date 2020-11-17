import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BASE_URL, headers, DELETE } from "../../../../../constants/api";

import styles from "./DeleteHotel.module.scss";

function DeleteHotel({ id }) {
    const [serverError, setServerError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    function checkDelete() {
        confirmAlert({
            title: "Confirm deletion",
            buttons: [
                {
                    label: "yes",
                    onClick: () => deleteHotel(),
                },
                {
                    label: "no",
                },
            ],
        });
    }

    async function deleteHotel() {
        const url = BASE_URL + "establishments/" + id;
        const options = { headers, method: DELETE };
        
        await fetch(url, options).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                setServerError(true);
                throw new Error("Bad response from server");
            }
            setSuccess(true);
        }).catch((error) => {
            console.log(error)
        });
    }

    if(success) {
        setTimeout(() => history.push("/admin/manageHotels/hotelList"), 3500);
        return <Container>
                <p className="fetchErrorP">Hotel was successfully deleted.</p>
            </Container>
    } 

    if(serverError) {
        setTimeout(() => history.push("/admin/manageHotels/hotelList"), 3500);
        return <p className="fetchErrorP">An error occured while trying to delete the Hotel. Try again or come back later.</p>
    } 

    return (
        <Button className={styles.delete} variant="delete" onClick={checkDelete}>
            <i className="icon-error"></i>Delete Hotel
        </Button>
    );
}

DeleteHotel.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DeleteHotel;
