import React from "react";
import { storiesOf } from "@storybook/react";
import { HvPop } from "../src";

import MoreVert from "../src/components/Table/Images/MoreVert.svg";
import MoreVertActive from "../src/components/Table/Images/MoreVertActive.svg";

const popSvgDeactive = <img src={MoreVert} width="100%" height="100%" />;
const popSvgActive = <img src={MoreVertActive} width="100%" height="100%" />;

const CustomButton = ({ isActive }) => {
  return isActive ? popSvgActive : popSvgDeactive;
};

const popItems = [
  {
    label: "View",
    path: "/id",
    router: true,
    isActive: true
  },
  {
    label: "Dismiss",
    path: "/dismiss",
    router: false,
    isActive: true
  }
];

const popPosition = [
  {
    vertical: "top",
    horizontal: "right"
  },
  {
    vertical: "top",
    horizontal: "right"
  }
];

storiesOf("Pop", module).add("Pop", () => (
  <div style={{ width: "50px", height: "100px" }}>
    <HvPop
      popPosition={popPosition}
      PopBtn={CustomButton}
      popItems={popItems}
    />
  </div>
));
