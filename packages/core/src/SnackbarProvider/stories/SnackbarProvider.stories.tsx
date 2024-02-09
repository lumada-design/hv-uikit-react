import { Meta, StoryObj } from "@storybook/react";
import { HvSnackbarProvider } from "@hitachivantara/uikit-react-core";

import { SnackbarProviderButtons } from "./SnackbarProviderButtons";
import SnackbarProviderButtonsRaw from "./SnackbarProviderButtons?raw";

export default {
  title: "Components/Snackbar/Provider",
  parameters: {
    eyes: { include: false },
  },
} as Meta<typeof HvSnackbarProvider>;

export const Provider: StoryObj = {
  parameters: { docs: { source: { code: SnackbarProviderButtonsRaw } } },
  render: () => <SnackbarProviderButtons />,
};
