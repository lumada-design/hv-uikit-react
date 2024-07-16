import { css } from "@emotion/css";
import {
  HvCanvasBottomPanel,
  HvCanvasBottomPanelProps,
} from "@hitachivantara/uikit-react-pentaho";

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

export const MainStory = (props: HvCanvasBottomPanelProps) => (
  <HvCanvasBottomPanel {...props} className={classes.root} tabs={tabs}>
    Content
  </HvCanvasBottomPanel>
);
