import React from "react";
import { storiesOf } from "@storybook/react";
import { HvProvider, HvLogin } from "../src";

const login = ({ username, password }) => {
  return new Promise((resolve) => setTimeout(() => { resolve() }, 500))
}

storiesOf("Login", module)
  .add("Login", () => <HvLogin login={login}/>);