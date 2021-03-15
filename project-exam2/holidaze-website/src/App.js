import React from "react";
import "./sass/style.scss";
import Layout from "./components/layout/Layout";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <>
            <div className="page-wrapper">
                <Layout />
            </div>
            <Footer />
        </>
    );
}

export default App;

