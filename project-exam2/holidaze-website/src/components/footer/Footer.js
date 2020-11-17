import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { BiArrowToTop } from 'react-icons/bi';

import styles from "./Footer.module.scss";

function Footer() {
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.icons}>
                    <a href="https://twitter.com" ><FaTwitter className={styles.twitter}/></a>
                    <a href="https://www.facebook.com" ><FaFacebook className={styles.facebook}/></a>
                    <a href="https://www.instagram.com"><FaInstagram className={styles.instagram}/></a>
                </div>
                <div className={styles.copyright}>
                    <p>Copyright &copy; Holidaze</p>
                </div>
                <BiArrowToTop className={styles.scroll} onClick={scrollTop}/>
            </div>
        </footer>
    );
}

export default Footer;