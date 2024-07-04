import { css } from "@emotion/css";
import {
  HvCanvasFloatingPanel,
  HvCanvasFloatingPanelProps,
} from "@hitachivantara/uikit-react-lab";

const tabs = [
  {
    id: 0,
    title: "Tab 1",
  },
  {
    id: 1,
    title: "Tab 2",
  },
];

const classes = { root: css({ position: "relative" }) }; // for Storybook purposes

export const MainStory = (props: HvCanvasFloatingPanelProps) => (
  <HvCanvasFloatingPanel {...props} className={classes.root} tabs={tabs}>
    Content
  </HvCanvasFloatingPanel>
);
