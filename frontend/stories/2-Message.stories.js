import React from 'react';
import {text} from "@storybook/addon-knobs";
import Message from "../components/Message";

export default{
    title: 'Message',
    component: Message,
};

export const sent = () => {
    const sentence = text("Message sent", "Who parked their car on my sandwich?");
    const user1 = text("Your name", "asdf");
    const msg = {user: user1, text: sentence};
    return <Message message = {msg} name = {user1}/>
};

export const recieved = () => {
    const sentence = text("Message recieved", 'Hello darkness my old friend');
    const user2 = text("User", "Esteban Julió Ricardo Montoya de la Rosa Ramírez");
    const message1 = {user: user2, text: sentence};
    return <Message message = {message1} name = {user2}/>
};