import React from "react";
import { storiesOf } from "@storybook/react";
import HomeTemplate from "../../samples/templates/home/pages/home";

storiesOf("Templates", module)
  .addParameters({
    options: {
      isToolshown: false,
      noAddon: true
    }
  })
  .add("Home", () => <HomeTemplate />);
