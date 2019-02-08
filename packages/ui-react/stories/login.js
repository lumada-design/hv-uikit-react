import React from "react";
import { storiesOf } from "@storybook/react";
import { HvLogin } from "../src/";
import SvgIcon from "@material-ui/core/SvgIcon";

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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

storiesOf("Login", module)
  .add("Success", () => (
    <div
      style={{
        height: "100vh",
        display: "flex"
      }}
    >
      <HvLogin
        login={callSimulation}
        recovery={callSimulation}
        allowRecover={true}
      />
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
        allowRecover={true}
      />
    </div>
  ));
