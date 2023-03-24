import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import { Info } from "@hitachivantara/uikit-react-icons";
import {
  HvSnackbar,
  HvActionGeneric,
  HvSnackbarProps,
  HvButton,
  HvTypography,
  HvSnackbarContent,
  HvTooltip,
  snackbarContentClasses,
} from "components";
import { useState } from "react";

const StyledSnackbar = styled(HvSnackbar)({
  position: "relative",
  top: 0,
  marginBottom: 10,
});

const StyledSnackBarContent = styled(HvSnackbarContent)({
  [`& .${snackbarContentClasses.messageText}`]: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const meta: Meta<typeof HvSnackbar> = {
  title: "Components/Snackbar",
  component: HvSnackbar,
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
    return <HvSnackbar {...args}></HvSnackbar>;
  },
};

export const MultipleExamples: StoryObj<HvSnackbarProps> = {
  render: () => {
    const customAction: HvActionGeneric = {
      id: "get",
      label: "Action",
    };
    return (
      <>
        <StyledSnackbar
          open
          offset={0}
          variant="default"
          label="This is a default snackbar."
        />
        <StyledSnackbar
          open
          offset={0}
          variant="success"
          showIcon
          label="This is a success message."
        />
        <StyledSnackbar
          open
          offset={0}
          variant="error"
          showIcon
          label="This is an error message."
        />
        <StyledSnackbar
          open
          offset={0}
          label="This is a snackbar with action."
          action={customAction}
          actionCallback={(_, __, action) =>
            console.log(`Clicked ${action?.label}`)
          }
        />
      </>
    );
  },
};

export const SnackbarController: StoryObj<HvSnackbarProps> = {
  parameters: {
    docs: {
      description: {
        story: "Different Snackbar variants with controller.",
      },
    },
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
          variant="error"
          showIcon
          label="This is an error message."
        />
      </>
    );
  },
};

export const CustomIcon: StoryObj<HvSnackbarProps> = {
  parameters: {
    docs: {
      description: {
        story: "Snackbar with custom icon.",
      },
    },
  },
  render: () => {
    return (
      <div style={{ height: 100 }}>
        <HvSnackbar
          open
          offset={0}
          style={{ position: "relative" }}
          id="snackbar2"
          label="This is a snackbar with a custom icon."
          customIcon={<Info color="base2" />}
        />
      </div>
    );
  },
};

export const CustomAction: StoryObj<HvSnackbarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Snackbar can receive a component or object action that will render a semantic button.",
      },
    },
  },
  render: () => {
    return (
      <div style={{ height: 100 }}>
        <HvSnackbar
          open
          id="actionStructure"
          offset={0}
          style={{ position: "relative" }}
          label="This is a snackbar."
          showIcon
          action={{ id: "post", label: "Action", disabled: false }}
          actionCallback={(evt, id, action) =>
            alert(`clicked ${id} with ${action.label}`)
          }
        />
      </div>
    );
  },
};

export const SnackbarVariations: StoryObj<HvSnackbarProps> = {
  render: () => {
    return (
      <div>
        <HvTypography variant="title2">Semantics</HvTypography>
        <br />
        <HvSnackbarContent label="This is a snackbar." variant="default" />
        <br />
        <HvSnackbarContent
          label="This is a success message."
          variant="success"
          showIcon
        />
        <br />
        <HvSnackbarContent
          label="This is an error message."
          variant="error"
          showIcon
        />
        <br />
        <HvTypography variant="title2">Custom icon</HvTypography>
        <br />
        <HvSnackbarContent
          variant="default"
          label="This is a snackbar."
          customIcon={<Info color="base2" />}
        />
        <br />
        <HvSnackbarContent
          variant="success"
          label="This is a success message."
          customIcon={<Info color="base2" />}
        />
        <br />
        <HvSnackbarContent
          variant="error"
          label="This is an error message."
          customIcon={<Info color="base2" />}
        />
        <br />
        <HvTypography variant="xsTitle">Custom content</HvTypography>
        <p />

        <HvTooltip
          title={
            <HvTypography>
              This is an very very very very long long long long error message.
            </HvTypography>
          }
        >
          <div>
            <StyledSnackBarContent
              variant="error"
              label="This is an very very very very long long long long error message."
              customIcon={<Info color="base2" />}
            />
          </div>
        </HvTooltip>
      </div>
    );
  },
};
