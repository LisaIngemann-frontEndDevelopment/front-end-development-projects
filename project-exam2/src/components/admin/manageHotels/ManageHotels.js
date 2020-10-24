import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import {
	Switch,
	Route,
	useRouteMatch,
	NavLink
} from "react-router-dom";
import AddHotel from "./addHotel/AddHotel";
import HotelList from "./HotelList";

import styles from "./ManageHotels.module.scss";

function ManageHotels() {
	let { path, url } = useRouteMatch();

	return (
		<Container>
			<Row>
				<Col ms={12}>
					<h2 className={styles.h2}>Manage Hotels</h2>
					<p className="text-center">Choose an action</p>
				</Col>
			</Row>
			<Row>
				<Col className={styles.nav} md={12}>
					<Nav fill variant="tabs" className="justify-content-center">
						<Nav.Item>
							<NavLink to={`${url}/addHotel`} className="nav-link">
								Add A New Hotel
							</NavLink>
						</Nav.Item>
						<Nav.Item>
							<NavLink to={`${url}/hotelList`} className="nav-link">
								Edit An Existing Hotel
							</NavLink>
						</Nav.Item>
					</Nav>
				</Col>

				<Switch>
					<Route exact path={path}>
					</Route>
					<Route path={`${path}/addHotel`}>
						<AddHotel />
					</Route>
					<Route path={`${path}/hotelList`}>
						<HotelList />
					</Route>
				</Switch>
			</Row>
		</Container>

	);
}

export default ManageHotels;