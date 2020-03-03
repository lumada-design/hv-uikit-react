import React from "react";
import { HvEmptyState } from "@hv/uikit-react-core/dist";
import { Ghost } from "@hv/uikit-react-icons/dist";

export default (
  <HvEmptyState
    title="Resource not found."
    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    icon={<Ghost iconSize="L" color="atmo7" />}
  />
);
