import React from 'react';
import {text} from "@storybook/addon-knobs";
import Messages from "../components/Messages";

/*export default{
    title: 'Messages',
    component: Messages,
};
*/
export const someMessages = () => {
    const message1 = text("Message 1", "Hello there");
    const message2 = text("Message 2", "General Kenobi");
    const message3 = text("Message 3", "You're a bold one");
    const user = text("User", "DingDongYourOpinionIsWrong");
    const messages = [message1, message2, message3];
    //return <Messages messages = {messages} name = {user} />
    return <Messages messages = {["Hello there", "Heya"]} name = {"Peanut"} />
};

export default someMessages; 