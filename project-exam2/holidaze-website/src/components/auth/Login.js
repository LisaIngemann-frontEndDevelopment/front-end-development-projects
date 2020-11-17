import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import ErrorMessage from "../contact/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

import styles from "./Auth.module.scss";

function LoginUser() {
    const { user, pass, login, clearUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(<FiEye size={25} />);
    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    function onSubmit(data) {
        login(data.username, data.password);
        history.push("/admin");
    }

    function RemoveUser() {
        clearUser();
        history.push("/register");
    }

    const initialValues = {
        username: user,
        password: pass
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
                <h1>Log In</h1>
                <Form.Group>
                    <Row>
                        <Col sm={6}>
                            <Form.Control 
                                className={styles.input} 
                                type="text" 
                                defaultValue={initialValues.username} 
                                name="username" 
                                placeholder="Username*" 
                                ref={register({
                                    validate: value => value === user
                                })}
                            />
                            {errors.username && <ErrorMessage>Please enter correct username</ErrorMessage>}
                        </Col>
                        <Col sm={6} className={styles.password}>
                            <Form.Control 
                                className={styles.input} 
                                type={show ? "text" : "password"} 
                                defaultValue={initialValues.password} 
                                name="password" 
                                placeholder="Password*" 
                                ref={register({
                                    validate: value => value === pass
                                })}
                            />
                            {errors.password && <ErrorMessage>Please enter correct password</ErrorMessage>}
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
                <Button 
                    className={styles.button} 
                    variant="delete" 
                    onClick={RemoveUser}>
                    <i className="icon-error"></i> Remove User
                </Button>
            </Form>
        </Container>
    )
}

export default LoginUser;