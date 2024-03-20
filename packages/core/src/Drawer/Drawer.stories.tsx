import { useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvDrawer,
  HvDrawerProps,
  HvGlobalActions,
  HvTypography,
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
    flex: 0,
  }),
};

export const Main: StoryObj<HvDrawerProps> = {
  args: {
    anchor: "right",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <HvGlobalActions title="My Title" />
        <HvButton onClick={() => setOpen(true)}>Open Drawer</HvButton>
        <HvDrawer
          disablePortal
          PaperProps={{ component: "aside", className: classes.drawerPaper }}
          ModalProps={{ disableScrollLock: true }}
          onClose={() => setOpen(false)}
          open={open}
          {...args}
        >
          <HvDialogTitle component="div" className={classes.drawerTitle}>
            Lorem Ipsum
          </HvDialogTitle>
          <HvDialogContent className={classes.drawerContent}>
            <HvTypography tabIndex={0}>
              {[...new Array(30)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum. 
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
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
