import React from "react";
import { storiesOf } from "@storybook/react";
import { HvCard } from "../src";

const event = {
  assetId: "ast-gn002",
  assignee: "Zoe J. Le",
  createdDate: "2018-06-03T14:09:00.004Z",
  criticality: "CRITICAL",
  description: "Voltage Unstable",
  id: "evt-g004",
  name: "Voltage Unstable",
  outcome: "RESOLVED"
};

storiesOf("Card", module).add("Card", () => <HvCard event={event} />);
