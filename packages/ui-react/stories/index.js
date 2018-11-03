import React from "react";
import { storiesOf } from "@storybook/react";
import { HvThemeProvider, HvButton, HvTypography, HvEventCard } from "@hv-ui/react";

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

storiesOf("Button", module)
  .addDecorator(story => <HvThemeProvider>{story()}</HvThemeProvider>)
  .add("Button", () => <HvButton>Click!</HvButton>);

storiesOf("Typography", module)
  .addDecorator(story => <HvThemeProvider>{story()}</HvThemeProvider>)
  .add("Typography", () => <HvTypography>Some typography</HvTypography>);

storiesOf("Event Card", module)
  .addDecorator(story => <HvThemeProvider>{story()}</HvThemeProvider>)
  .add("EventCard", () => <HvEventCard event={event} />);
