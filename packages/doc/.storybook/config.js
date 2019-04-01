import React from "react";
import { configure, addDecorator } from "@storybook/react";
import withLayout from "./layout-addon";
import HvProvider from "../src/Provider";

const req = require.context("../doc/stories", true, /\.js$/);

const routerWrapper = {
  push: (route, params, options) => {},
  prefetch: (route, params) => {}
};

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

addDecorator(withLayout());

addDecorator(story => (
  <HvProvider router={routerWrapper}>{story()}</HvProvider>
));

configure(loadStories, module);
