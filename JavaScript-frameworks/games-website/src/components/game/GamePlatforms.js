import React from "react";
import PropTypes from "prop-types";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { RiSwitchLine } from "react-icons/ri";
import { FaMobileAlt } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { DiApple } from "react-icons/di";
import { IoMdPhoneLandscape } from "react-icons/io";
import { FaLinux } from "react-icons/fa";

function GamePlatforms({ platforms }) {
    return (
        <>
            <p><b>Platforms</b></p>
            <ul className="platformList">
                {platforms.map((plat, index) => {
                    switch(plat.platform.name.substring(0,2)) {
                        case "Pl":
                            return <li key={index}><FaPlaystation />{plat.platform.name}</li>
                        case "Xb":
                            return <li key={index}><FaXbox />{plat.platform.name}</li>
                        case "Ni":
                            return <li key={index}><RiSwitchLine />{plat.platform.name}</li>
                        case "iO":
                            return <li key={index}><FaMobileAlt />{plat.platform.name}</li>
                        case "PC":
                            return <li key={index}><FaWindows />{plat.platform.name}</li>
                        case "An":
                            return <li key={index}><DiAndroid />{plat.platform.name}</li>
                        case "ma":
                            return <li key={index}><DiApple />{plat.platform.name}</li>
                        case "Li":
                            return <li key={index}><FaLinux />{plat.platform.name}</li>
                        case "PS":
                            return <li key={index}><IoMdPhoneLandscape />{plat.platform.name}</li>
                        default:
                            return <li className="iconlessPlatform" key={index}>{plat.platform.name}</li>
                    }
                })}
            </ul>
        </>
    );
}

GamePlatforms.propTypes = {
    platforms: PropTypes.array.isRequired
};

export default GamePlatforms;