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
  HvTypography,
  HvGlobalActions,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvDrawer> = {
  title: "Widgets/Drawer",
  component: HvDrawer,
  decorators: [(Story) => <div style={{ minHeight: 600 }}>{Story()}</div>],
};
export default meta;

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

        return waitFor(() => screen.findByTestId("drawer"));
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <HvGlobalActions title="My Title" />
        <HvButton onClick={() => setOpen(true)}>Open Drawer</HvButton>
        <HvDrawer
          disablePortal
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{ disableScrollLock: true }}
          onClose={() => setOpen(false)}
          open={open}
          data-testid="drawer"
          {...args}
        >
          <HvDialogTitle
            component="div"
            classes={{ root: classes.drawerTitle }}
          >
            Lorem Ipsum
          </HvDialogTitle>
          <HvDialogContent className={classes.drawerContent}>
            <HvTypography tabIndex={0}>
              {[...new Array(30)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum. 
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                )
                .join("\n")}
            </HvTypography>
          </HvDialogContent>
          <HvDialogActions>
            <HvButton variant="primaryGhost">Submit</HvButton>
            <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>
              Cancel
            </HvButton>
          </HvDialogActions>
        </HvDrawer>
      </>
    );
  },
};
