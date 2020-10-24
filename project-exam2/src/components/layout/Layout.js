import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import Admin from "../admin/Admin";
import Hotels from "../hotels/Hotels";
import ProtectedRoute from "../routes/ProtectedRoute";
import Register from "../auth/Register";
import Login from "../auth/Login";
import HotelsDetail from "../hotels/hotelDetail/HotelsDetail";
import { AuthContextProvider } from "../../context/AuthContext";
import Navigation from "./Navigation";
import EditHotel from "../admin/manageHotels/editHotel/EditHotel";

function Layout() {
    return (
        <AuthContextProvider>
            <Router basename="/holidaze">
                <Navigation />
                <main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/hotelsDetail/:id" component={HotelsDetail} />
                        <Route path="/hotels" component={Hotels} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <ProtectedRoute path="/edit/:id" component={EditHotel} />
                        <ProtectedRoute path="/admin">
                            <Admin />
                        </ProtectedRoute>                                    
                    </Switch>
                </main>
            </Router>
        </AuthContextProvider>
    );
}

export default Layout;