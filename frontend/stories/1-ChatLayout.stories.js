import React from 'react';
import ChatLayout from "../components/ChatLayout.js";

export default{
    title: 'ChatLayout',
    component: ChatLayout,
};

export const gameScreen = () => {
    return (<ChatLayout></ChatLayout>);
};