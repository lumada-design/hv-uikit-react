import React from "react";
import { HvEmptyState } from "@hv/uikit-react-core/dist";
import { BarChart } from "@hv/uikit-react-icons/dist";

const CustomAction = <a href="/">Create a new data route</a>;

export default (
  <HvEmptyState
    title="Start building data routes"
    message="Before we create any dashboard we need to get some data."
    action={CustomAction}
    icon={<BarChart iconSize="L" color="atmo7" role="presentation" />}
  />
);
