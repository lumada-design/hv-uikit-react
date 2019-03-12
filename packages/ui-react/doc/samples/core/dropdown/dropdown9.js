import React from "react";
import HvDropdown from "@hv-ui/react/core/Dropdown";
import { data } from "./data";

export default (
  <HvDropdown values={data} multiSelect={false} showSearch={false} disabled />
);
