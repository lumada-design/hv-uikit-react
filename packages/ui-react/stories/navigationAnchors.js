import React from "react";
import { storiesOf } from "@storybook/react";
import { HvNavigationAnchors } from "../src";

const options = [
  {
    label: "Option1",
    value: "Value1"
  },
  {
    label: "Option2",
    value: "Value2"
  },
  {
    label: "Option3",
    value: "Value3"
  }
];

storiesOf("Vertical Navigation", module)
  .add("Navigation with anchors", () => (
    <HvNavigationAnchors href options={options} />
  ))
  .add("Navigation with callback", () => (
    <HvNavigationAnchors
      href={false}
      options={options}
      onClick={(event, index) => console.log(event, index)}
    />
  ));
