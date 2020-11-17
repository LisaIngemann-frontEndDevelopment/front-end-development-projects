import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import ErrorMessage from "../contact/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

import styles from "./Auth.module.scss";

function Register() {
    const { register, handleSubmit, errors } = useForm();
    const { registerUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(<FiEye size={25} />);

    const history = useHistory();

    function onSubmit(data) {
        registerUser(data.username, data.password);
        history.push("/admin");
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Toggle password visibility
        </Tooltip>
    );

    const showHidePassword = () => {
        setShow(show ? false : true);
        setEyeIcon(show ? <FiEye size={25} /> : <FiEyeOff size={25} />)
    };

    return (
        <Container className={styles.container}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <Form.Group>
                    <Row>
                        <Col sm={6}>
                            <Form.Control 
                                className={styles.input} 
                                type="text" 
                                name="username" 
                                placeholder="Username*" 
                                ref={register({
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                            {errors.username && <ErrorMessage>Username must be longer than 2 characters</ErrorMessage>}
                        </Col>
                        <Col sm={6} className={styles.password}>
                            <Form.Control 
                                className={styles.input} 
                                type={show ? "text" : "password"} 
                                name="password" 
                                placeholder="Password*"
                                ref={register({
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                            {errors.password && <ErrorMessage>Password must be longer than 2 characters</ErrorMessage>}
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                            <span onClick={showHidePassword}>
                                {eyeIcon}
                            </span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Form.Group>               
                <Button 
                    className={styles.button} 
                    type="submit" 
                    variant="primary-up">Log In</Button>
            </Form>
        </Container>
    );
}

export default Register;
