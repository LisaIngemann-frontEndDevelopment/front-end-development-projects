import React from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Container } from "react-bootstrap";

import styles from "./Search.module.scss";

function Search({ handleSearch }) {
    return (
        <Container className={styles.container}>
            <InputGroup className={styles.input}>
                <FormControl
                    type="text"
                    placeholder="Search by name..."
                    onChange={function (e) {
                        handleSearch(e.target.value);
                    }} 
                />
            </InputGroup>
        </Container>
    );
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default Search;