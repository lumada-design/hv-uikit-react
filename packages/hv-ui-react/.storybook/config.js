import React from "react";
import { configure, addDecorator } from "@storybook/react";
import HvProvider from "../src/Provider"

const req = require.context('../stories', true, /\.js$/);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story) => (
  <HvProvider>
    {story()}
  </HvProvider>
))

configure(loadStories, module);
