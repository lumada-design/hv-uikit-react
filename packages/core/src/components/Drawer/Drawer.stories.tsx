import { useState } from "react";

import { css } from "@emotion/css";

import { Meta, StoryObj } from "@storybook/react";
import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import {
  HvButton,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvDrawer,
  HvDrawerProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvDrawer> = {
  title: "Widgets/Drawer",
  component: HvDrawer,
};
export default meta;

export const Main: StoryObj<HvDrawerProps> = {
  args: {
    anchor: "right",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button"));

        return waitFor(() => screen.getByText("Lorem Ipsum"));
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const drawerWidth = "60%";

    const classes = {
      drawerPaper: css({
        width: `calc(100% - ${drawerWidth})`,
        overflow: "unset", // we want scroll content, not scroll paper
      }),
      drawerContent: css({
        // maximize space for content
        flex: 1,
        overflow: "auto",
      }),
      drawerTitle: css({
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "auto",
      }),
    };

    return (
      <div>
        <HvButton onClick={() => setOpen(true)}>Open drawer</HvButton>
        <HvDrawer
          open={open}
          disablePortal
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor={args.anchor}
          onClose={() => setOpen(false)}
        >
          <HvDialogTitle classes={{ root: classes.drawerTitle }}>
            Lorem Ipsum
          </HvDialogTitle>
          <HvDialogContent className={classes.drawerContent}>
            {[...new Array(30)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum. 
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </HvDialogContent>
          <HvDialogActions>
            <HvButton
              variant="primaryGhost"
              onClick={() => console.log("Submit action")}
            >
              Submit
            </HvButton>
            <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>
              Cancel
            </HvButton>
          </HvDialogActions>
        </HvDrawer>
      </div>
    );
  },
};
