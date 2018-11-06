import React from "react";
import { storiesOf } from "@storybook/react";
import { HvProvider, HvButton } from "../src";

storiesOf("Button", module)
  .add("Button", () => <HvButton>Click!</HvButton>);