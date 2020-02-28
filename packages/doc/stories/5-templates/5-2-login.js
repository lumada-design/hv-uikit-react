import React from "react";
import { storiesOf } from "@storybook/react";
import LoginTemplate from "../../samples/templates/login";

storiesOf("Templates", module)
  .addParameters({
    options: {
      isToolshown: false,
      noAddon: true
    }
  })
  .add("Login", () => <LoginTemplate />);
