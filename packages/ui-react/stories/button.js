import React from "react";
import { storiesOf } from "@storybook/react";
import { HvButton, buttonTypes } from "../src";

const disabled = true;
const value = 1;
const key = 0;
const buttonStyles = {
  margin: "5px 0",
}

Object.entries(buttonTypes).forEach(KeyPair => {

  storiesOf("Button", module).add(`${KeyPair[value]} button`, () => 
  (
    <>
      <div style={buttonStyles}>
        <HvButton colorType={KeyPair[value]}>{KeyPair[key]}</HvButton>
      </div>

      <div style={buttonStyles}>
        <HvButton disabled={disabled} colorType={KeyPair[value]}>{KeyPair[key]}</HvButton>
      </div>

      <div style={buttonStyles}>
        <HvButton onClick={()=>{alert("You clicked me")}} colorType={KeyPair[value]}>click me!</HvButton>
      </div>
      
      <div style={buttonStyles}>
        <HvButton disabled={disabled} onClick={()=>{alert("You clicked me")}} colorType={KeyPair[value]}>click me!</HvButton>
      </div>
    
    </>
  )
)
});