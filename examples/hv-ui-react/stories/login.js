import React from "react";
import { storiesOf } from "@storybook/react";
import { HvLogin } from "../src";

const login = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

storiesOf("Login", module).add("Login", () => <HvLogin login={login} />);
