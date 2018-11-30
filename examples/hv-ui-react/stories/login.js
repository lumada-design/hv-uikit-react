import React from "react";
import { storiesOf } from "@storybook/react";
import HvLogin from "../src/Login";

const login = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 500)
  );

storiesOf("Login", module).add("Login", () => (
  <div
    style={{
      height: "100vh",
      display: "flex"
    }}
  >
    <HvLogin login={login} />
  </div>
));
