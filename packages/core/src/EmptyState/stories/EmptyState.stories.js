import React from "react";
import { BarChart, Fail, Ghost } from "@hitachivantara/uikit-react-icons";
import { HvEmptyState, HvLink, HvTypography } from "../..";

export default {
  title: "Components/Empty State",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvEmptyState } from "@hitachivantara/uikit-react-core";',
  },
  component: HvEmptyState,
};

export const Main = () => {
  return (
    <HvEmptyState
      title="No data routes"
      message="After you start adding Data Routes, they will appear in here."
      icon={<Fail iconSize="L" color="atmo7" />}
    />
  );
};

export const WithAction = () => (
  <HvEmptyState
    id="empty-state-action"
    title="Start building data routes"
    message="Before we create any dashboard we need to get some data."
    action={<HvLink route="/">Create a new data route</HvLink>}
    icon={<BarChart iconSize="L" color="atmo7" role="presentation" />}
  />
);

WithAction.story = {
  parameters: {
    docs: {
      storyDescription: "Empty states that includes an action inside its content.",
    },
  },
};

export const CustomMessages = () => {
  const CustomMessage = <HvTypography>404 Not Found</HvTypography>;
  const CustomAction = (
    <HvTypography component="div">
      <div>Here are some helpful links instead:</div>
      <HvLink route="/">Online Help</HvLink>
    </HvTypography>
  );

  return (
    <HvEmptyState
      id="empty-state-custom-message"
      title="This page can't be displayed"
      message={CustomMessage}
      action={CustomAction}
      icon={<Ghost iconSize="L" color="atmo7" role="presentation" />}
    />
  );
};

CustomMessages.story = {
  parameters: {
    docs: {
      storyDescription: "Empty states with message and action set as custom elements.",
    },
  },
};

export const Minimal = () => (
  <HvEmptyState
    id="empty-state-minimal"
    message="No data to display"
    icon={<Fail role="presentation" />}
  />
);

Minimal.story = {
  parameters: {
    docs: {
      storyDescription: "Empty state without title and small icon.",
    },
  },
};
