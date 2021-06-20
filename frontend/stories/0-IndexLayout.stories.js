import React from 'react';
import {text} from "@storybook/addon-knobs";
import IndexLayout from "../components/IndexLayout";

export default{
    title: 'IndexLayout',
    components: IndexLayout,
};

export const titleScreen = () => {
    return <IndexLayout />
};