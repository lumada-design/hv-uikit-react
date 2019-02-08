import React from "react";
import { storiesOf } from "@storybook/react";
import { HvButton, buttonTypes, HvShowCase, HvShowCaseHeader } from "../src";

const disabled = true;
const value = 1;
const key = 0;

Object.entries(buttonTypes).forEach(KeyPair => {
  const titleNormal = `${KeyPair[key]} button`;
  const titleDisable = `${KeyPair[key]} disabled button`;
  const titleNormalClick = `${KeyPair[key]} button with click action`;
  const titleDisableClick = `${KeyPair[key]} button with click action disabled`;

  storiesOf("Button", module).add(`${KeyPair[value]} button`, () => (
    <>
      <HvShowCaseHeader reviewed date="2018/Dec/28" />

      <HvShowCase title={titleNormal}>
        <HvButton colorType={KeyPair[value]}>{KeyPair[key]}</HvButton>
      </HvShowCase>

      <HvShowCase title={titleDisable}>
        <HvButton disabled={disabled} colorType={KeyPair[value]}>
          {KeyPair[key]}
        </HvButton>
      </HvShowCase>

      <HvShowCase title={titleNormalClick}>
        <HvButton
          onClick={() => {
            alert("You clicked me");
          }}
          colorType={KeyPair[value]}
        >
          click me!
        </HvButton>
      </HvShowCase>

      <HvShowCase title={titleDisableClick}>
        <HvButton
          disabled={disabled}
          onClick={() => {
            alert("You clicked me");
          }}
          colorType={KeyPair[value]}
        >
          click me!
        </HvButton>
      </HvShowCase>
    </>
  ));
});
