import { Meta, StoryObj } from "@storybook/react";
import { Deploy, Info } from "@hitachivantara/uikit-react-icons";
import {
  HvSnackbar,
  HvSnackbarProps,
  HvButton,
  HvSnackbarContent,
  HvOverflowTooltip,
} from "@core/components";
import { useState } from "react";
import { css } from "@emotion/css";

const meta: Meta<typeof HvSnackbar> = {
  title: "Components/Snackbar",
  component: HvSnackbar,
  subcomponents: {
    HvSnackbarContent,
  },
};
export default meta;

export const Main: StoryObj<HvSnackbarProps> = {
  args: {
    open: true,
    variant: "default",
    label: "This is a snackbar",
    offset: 0,
    transitionDirection: "left",
    showIcon: true,
    transitionDuration: 300,
    autoHideDuration: 5000,
  },
  argTypes: {
    classes: { control: { disable: true } },
    anchorOrigin: { control: { disable: true } },
    customIcon: { control: { disable: true } },
    action: { control: { disable: true } },
    actionCallback: { control: { disable: true } },
    snackbarContentProps: { control: { disable: true } },
    ref: { control: { disable: true } },
  },
  render: (args) => {
    return <HvSnackbar {...args} />;
  },
};

export const Variants: StoryObj<HvSnackbarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "All the different Snackbar variants and some examples of Snackbar's with custom icons, actions and content.",
      },
    },
  },

  render: () => {
    const classes = {
      snackbar: css({
        position: "relative",
        top: 0,
        marginBottom: 10,
      }),
    };

    return (
      <>
        <HvSnackbar
          open
          offset={0}
          variant="default"
          label="This is a default snackbar."
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          offset={0}
          variant="success"
          showIcon
          label="This is a success message."
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          offset={0}
          variant="warning"
          showIcon
          label="This is a warning message."
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          offset={0}
          variant="error"
          showIcon
          label="This is an error message."
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          offset={0}
          variant="success"
          label="This is a snackbar with a custom icon."
          showIcon
          customIcon={<Deploy color="base_dark" />}
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          id="actionStructure"
          offset={0}
          label="This is a snackbar with a custom action."
          showIcon
          customIcon={<Info color="base_dark" />}
          action={{ id: "post", label: "Action", disabled: false }}
          actionCallback={(evt, id, action) =>
            alert(`clicked ${id} with ${action.label}`)
          }
          classes={{ root: classes.snackbar }}
        />
        <HvSnackbar
          open
          offset={0}
          variant="error"
          showIcon
          snackbarContentProps={{
            classes: { messageText: css({ maxWidth: "250px" }) },
          }}
          label={
            <HvOverflowTooltip data="This is an very very very very long long long long error message." />
          }
          classes={{ root: classes.snackbar }}
        />
      </>
    );
  },
};

export const Controller: StoryObj<HvSnackbarProps> = {
  parameters: {
    docs: {
      description: {
        story: "Different Snackbar variants with controller.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const SimpleSnackbar = ({ variant, ...others }) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);

      const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
      };

      return (
        <div style={{ marginBottom: 10 }}>
          <HvButton
            onClick={handleOpen}
            // variant="contained"
            color="primary"
            style={{ width: "150px", textTransform: "capitalize" }}
          >
            {variant}
          </HvButton>
          <HvSnackbar
            open={open}
            onClose={handleClose}
            offset={0}
            variant={variant}
            {...others}
          />
        </div>
      );
    };

    return (
      <>
        <SimpleSnackbar
          variant="default"
          showIcon
          label="This is a snackbar."
        />
        <SimpleSnackbar
          variant="success"
          showIcon
          label="This is a success message."
        />
        <SimpleSnackbar
          variant="warning"
          showIcon
          label="This is a warning message."
        />
        <SimpleSnackbar
          variant="error"
          showIcon
          label="This is an error message."
        />
      </>
    );
  },
};
