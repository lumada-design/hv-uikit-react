import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "../src/Button";
import EventCard from "../src/EventCard";
import ThemeProvider from "../src/styles/ThemeProvider";

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
  .addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>)
  .add("Button", () => <Button>Click!</Button>);

storiesOf("Event Card", module)
  .addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>)
  .add("EventCard", () => <EventCard event={event} />);
