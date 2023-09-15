import { css } from "@emotion/css";

import { Meta, StoryObj } from "@storybook/react";

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
  decorators: [(Story) => <div style={{ minHeight: 600 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvDrawerProps> = {
  args: {
    anchor: "right",
    open: true,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
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
      <HvDrawer
        disablePortal
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        {...args}
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
          <HvButton variant="primaryGhost">Submit</HvButton>
          <HvButton variant="secondaryGhost">Cancel</HvButton>
        </HvDialogActions>
      </HvDrawer>
    );
  },
};
