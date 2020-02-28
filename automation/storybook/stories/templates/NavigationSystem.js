import React from "react";
import { storiesOf } from "@storybook/react";
import Header1Vertical2 from "../../../../packages/doc/samples/templates/navigation";

// sample scenarios
const samples = {
  Header1Vertical2: <Header1Vertical2 />
};

Object.keys(samples).forEach(key =>
  storiesOf("template.NavigationSystem", module).add(key, () => (
    <>{samples[key]}</>
  ))
);
