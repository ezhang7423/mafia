import React from 'react';
import {text} from "@storybook/addon-knobs";
import Messages from "../components/Messages";

export default{
    title: 'Messages',
    component: Messages,
};

export const someMessages = () => {
    const sent1 = text("Message 1", "Hello there");
    const user1 = text("User 1", "STAR WARS");
    const message1 = {user: user1, text: sent1};

    const sent2 = text("Message 2", "General Kenobi");
    const user2 = text("User 2", "DingDongYourOpinionIsWrong");
    const message2 = {user: user2, text: sent2};

    const sent3 = text("Message 3", "Ah, the negotiagtor");
    const user3 = text("User 3", "heh"); 
    const message3 = {user: user3, text: sent3};
    
    const messages = [message1, message2, message3];
    return <Messages messages = {messages} name = {user3} />
};