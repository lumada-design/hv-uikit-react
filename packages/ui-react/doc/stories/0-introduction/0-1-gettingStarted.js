import React from "react";
import { storiesOf } from "@storybook/react";
import GettingStarted from "../../samples/introduction/gettingStarted";

storiesOf("Introduction", module).add("Getting Started", () => (
  <GettingStarted />
));
