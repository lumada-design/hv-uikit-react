import { css } from "@emotion/css";
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import {
  canvasSidePanelClasses,
  canvasToolbarClasses,
} from "@hitachivantara/uikit-react-pentaho";

import Canvas from "../../templates/Canvas";
import CanvasRaw from "../../templates/Canvas?raw";

export default {
  title: "Templates/Canvas",
};

const classes = {
  // Needed to override the styles specific to the app but can't be used in Storybook
  root: css({
    "& > div": { height: "calc(100vh - 40px)" },
    [`& .${canvasToolbarClasses.root}`]: { top: 8 },
    [`& .${canvasSidePanelClasses.root}`]: {
      top: 8,
      height: "calc(100% - 8px)",
    },
  }),
};

export const Main: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: CanvasRaw,
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /Click to Add Nodes/i });
    await userEvent.click(button);
  },
  decorators: [(Story) => <div className={classes.root}>{Story()}</div>],
  render: () => <Canvas />,
};
