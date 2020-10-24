import React from "react";
import { Helmet } from "react-helmet";
import { Nav, Col, Row, Container } from "react-bootstrap";
import {
	Switch,
	Route,
	useRouteMatch,
	NavLink
  } from "react-router-dom";
import ManageHotels from "./manageHotels/ManageHotels";
import Messages from "./messages/Messages";
import Enquiries from "./enquiries/Enquiries";

import styles from "./Admin.module.scss";

function Admin() {
	let { path, url } = useRouteMatch();

	return (
		<>
		    <Helmet>
                <title>Holidaze | Admin</title>
                <meta name="keywords" content="holidaze hotels,admin,administrate establishment,add hotel form,edit hotel,messages,enquiries,manage hotels, delete message,delete enquiry" />           
			</Helmet>

			<Container>
				<Row>
					<Col ms={12}>
						<h1 className={styles.h1}>Admin</h1>
						<div className={styles.p}>
							<p>On the admin page you can check messages and enquiry resquests sent by user or manage hotels.</p>
							<p>Choose catergory below.</p>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className={styles.nav} md={12}>
						<Nav variant="pills" className="justify-content-center" defaultActiveKey="link-1">
							<NavLink to={`${url}/messages`} className={[styles.link, "nav-link"].join(' ')}>
								<i className="icon-message"></i>Messages
							</NavLink>
							<NavLink to={`${url}/manageHotels`} className={[styles.link, "nav-link"].join(' ')}>
								<i className="icon-hotel"></i>Manage Hotels
							</NavLink>
							<NavLink to={`${url}/enquiries`} className={[styles.link, "nav-link"].join(' ')}>
								<i className="icon-booking"></i>Enquiries
							</NavLink>
						</Nav>
					</Col>

					<Switch>
						<Route exact path={path}>
						</Route>
						<Route path={`${path}/enquiries`}>
							<Enquiries />
						</Route>
						<Route path={`${path}/messages`}>
							<Messages />
						</Route>
						<Route path={`${path}/manageHotels`}>
							<ManageHotels />
						</Route>
					</Switch>
				</Row>
			</Container>
		</>
	);
}

export default Admin;