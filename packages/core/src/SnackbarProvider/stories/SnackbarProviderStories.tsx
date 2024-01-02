import { StoryObj } from "@storybook/react";

import { SnackbarProviderButtons } from "./SnackbarProviderButtons";
import SnackbarProviderButtonsRaw from "./SnackbarProviderButtons?raw";

export const SnackbarProviderButtonsStory: StoryObj = {
  parameters: { docs: { source: { code: SnackbarProviderButtonsRaw } } },
  render: () => <SnackbarProviderButtons />,
};
