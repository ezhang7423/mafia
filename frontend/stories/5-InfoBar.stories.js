import React from 'react';
import {text} from "@storybook/addon-knobs";
import InfoBar from "../components/InfoBar";

export default{
    title: 'InfoBar',
    component: InfoBar
};

export const aRoom = () => {
    const roomNum = text("Room", "1")
    return <InfoBar room = {roomNum} />
};