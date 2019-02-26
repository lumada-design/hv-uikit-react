import React from "react";
import { storiesOf } from "@storybook/react";
import { HvLogin } from "../src";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const callSimulationError = () =>
  new Promise(resolve => {
    throw "error";
    setTimeout(() => {
      resolve();
    }, 2000);
  });

storiesOf("Login", module)
  .add("Success", () => (
    <div
      style={{
        height: "100vh",
        display: "flex"
      }}
    >
      <HvLogin login={callSimulation} recovery={callSimulation} allowRecover />
    </div>
  ))
  .add("Error", () => (
    <div
      style={{
        height: "100vh",
        display: "flex"
      }}
    >
      <HvLogin
        login={callSimulationError}
        recovery={callSimulationError}
        allowRecover
      />
    </div>
  ));
