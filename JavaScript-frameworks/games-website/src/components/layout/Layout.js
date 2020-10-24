import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import GameDetail from "../game/GameDetail";
import Favourites from "../favourites/Favourites";
import Publishers from "../publishers/Publishers";
import Developers from "../developers/Developers";

function Layout() {
    return (
        <Router basename="/games-rawgio">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container className="headerContainer">
                    <NavLink to="/" exact>
                        <Navbar.Brand>Games</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink to="/" exact className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/favourites" exact className="nav-link">
                                Favourites
                            </NavLink>
                            <NavLink to="/developers" className="nav-link">
                                Developers
                            </NavLink>
                            <NavLink to="/publishers" className="nav-link">
                                Publishers
                            </NavLink>
                            <NavLink to="/contact" className="nav-link">
                                Contact
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/game/:id" component={GameDetail} />
                    <Route path="/favourites" component={Favourites} />
                    <Route path="/developers" component={Developers} />
                    <Route path="/publishers" component={Publishers} />
                </Switch>
            </Container>
        </Router>
    );
}

export default Layout;