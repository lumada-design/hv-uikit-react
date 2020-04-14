import React from "react";
import { storiesOf } from "@storybook/react";
import Home from "../../../../packages/doc/samples/templates/home/pages/home";

// sample scenarios
const samples = {
  NavigationSystem: <Home />
};

Object.keys(samples).forEach(key =>
  storiesOf("template.", module)
    .addParameters({
      options: {
        isToolshown: false,
        noAddon: true
      }
    })
    .add(key, () => <>{samples[key]}</>)
);
