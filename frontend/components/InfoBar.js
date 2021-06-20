import React from 'react';
import Link from "next/link";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

const InfoBar = (props) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h3>{`Village: ${props.room}`}</h3>
            </div>
            <div className="rightInnerContainer">
                <h5>{'Esc '}</h5>
                <div>&nbsp;&nbsp;</div>
                <Link href="/">
                    <div><img src={closeIcon} /></div>
                </Link>
            </div>
            <style jsx>{`
                .infoBar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: black;
                    border-radius: 4px 4px 0 0;
                    height: 25px;
                    width: 100%;
                }

                .leftInnerContainer {
                    flex: 0.5;
                    display: flex;
                    align-items: center;
                    margin-left: 2%;
                    color: white;
                }

                .rightInnerContainer {
                    display: flex;
                    flex: 0.5;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 2%;
                    color: white;
                }

                .onlineIcon {
                    margin-right: 5%;
                }
            `}</style>
        </div>
    );
};

export default InfoBar;
