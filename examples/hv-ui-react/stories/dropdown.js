import React from "react";
import { storiesOf } from "@storybook/react";
import { HvDropdown } from "../src";

const data = [
  { value: "desc crit", label: "Most Critical" },
  { value: "desc date", label: "Most Recent" }
];

storiesOf("Dropdown", module)
  .add("with Label", () => <HvDropdown label="Sort" options={data} />)
  .add("without Label", () => <HvDropdown options={data} />)
  .add("with default value", () => <HvDropdown value={data[1]} options={data} />)
  .add("with onChange", () => <HvDropdown onChange={(value) => console.log(value)} options={data} />);


