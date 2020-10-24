import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import styles from "./TypeAhead.module.scss";

function TypeAheadInput({ options }) { 
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if(wrap && !wrap.contains(event.target))
            setDisplay(false);
    }

    const setHotel = hotel => {
        setSearch(hotel);
        setDisplay(false);
    }
    
    function onSubmit(search) {     
        history.push("/hotels", {params: search});
    }
    
    return (
        <Form ref={wrapperRef} className={styles.inputContainer} onSubmit={() => onSubmit(search)}>
            <input 
                id="typeAhead"
                className={styles.input}
                name="typeAhead"
                type="text" 
                onClick={() => setDisplay(true)} 
                placeholder="Search for a hotel..." 
                value={search}
                onChange={event => setSearch(event.target.value)}
                autoComplete="off"
            />
            <Button type="submit" variant="search" className={styles.btnSearch}><i className="icon icon-search"></i></Button>
            {display && (
                options.filter(name => name.name.toLowerCase().match(search.toLowerCase())).length > 0 ?
                <div className={styles.typeAheadContainer}>
                    {options
                        .filter(name => name.name.toLowerCase().match(search.toLowerCase()))
                        .map((v,i) => {
                            return <div 
                                className="option" 
                                key={i}
                                onClick={() => setHotel(v.name)}
                                tabIndex="0"
                            > 
                                <span>{v.name}</span>
                            </div>                         
                    })}
                </div>
            :
                <div className={styles.typeAheadContainerMatch}>No hotels by that name</div>
            )}
        </Form>
    );
}

TypeAheadInput.propTypes = {
    options: PropTypes.array.isRequired,
};

export default TypeAheadInput;