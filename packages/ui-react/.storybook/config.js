import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import HvProvider from "../src/Provider";
import theme from "@hv-ui/themes/dist/theme";

const req = require.context("../stories", true, /\.js$/);

const routerWrapper = {
  push: (route, params, options) => {},
  prefetch: (route, params) => {}
};


const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

addDecorator(withInfo);

addDecorator(story => (
  <HvProvider router={routerWrapper}>
    {story()}
  </HvProvider>
));

configure(loadStories, module);
