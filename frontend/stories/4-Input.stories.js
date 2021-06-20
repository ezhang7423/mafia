import React from "react";
import {text} from "@storybook/addon-knobs";
import Input from "../components/Input";

export default{
    title: 'Input',
    component: Input,
};

export const aMessage = () => {
    const status = text("Status", "false");
    const message = text("Message", "Type something here");
    return <Input disabled = {status} message = {message} />
};