import styled from "@emotion/styled";
import { Info } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvBanner,
  HvBannerProps,
  HvButton,
  HvTypography,
} from "@core/components";
import { useState } from "react";
import { HvBannerContent } from "./BannerContent";

const StyledBanner = styled(HvBanner)({
  position: "relative",
  top: "0px",
  marginBottom: 10,
});
const meta: Meta<typeof HvBanner> = {
  title: "Components/Banner",
  component: HvBanner,
};
export default meta;

export const Main: StoryObj<HvBannerProps> = {
  args: {
    open: true,
    variant: "default",
    label: "This is an informational message.",
    showIcon: true,
    offset: 0,
  },
  argTypes: {
    classes: { control: { disable: true } },
    ref: { control: { disable: true } },
    customIcon: { control: { disable: true } },
    bannerContentProps: { control: { disable: true } },
    actions: { control: { disable: true } },
    actionsCallback: { control: { disable: true } },
  },
  render: (args) => {
    return <StyledBanner {...args}></StyledBanner>;
  },
};

export const MultipleExamples: StoryObj<HvBannerProps> = {
  render: () => {
    return (
      <>
        <StyledBanner
          open
          offset={0}
          variant="default"
          label="This is an informational message."
        />
        <StyledBanner
          open
          offset={0}
          variant="success"
          showIcon
          label="This is a success message."
        />
        <StyledBanner
          open
          offset={0}
          variant="warning"
          showIcon
          label="This is an alert message."
        />
        <StyledBanner
          open
          offset={0}
          variant="error"
          showIcon
          label="This is an error message."
        />
        <StyledBanner
          open
          offset={0}
          label="This is a banner with an action."
          actions={[{ id: "post", label: "Action" }]}
          actionsCallback={(e, id, action) =>
            console.log(`Clicked ${action.label}`)
          }
        />
      </>
    );
  },
};

export const BannerController: StoryObj<HvBannerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Different Banner variants with actions and controlled by buttons.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const SimpleBanner = ({ variant, ...others }) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);

      const handleClose = () => {
        setOpen(false);
      };

      return (
        <>
          <HvButton
            onClick={handleOpen}
            color="primary"
            style={{ width: "150px", textTransform: "capitalize", margin: 10 }}
          >
            {variant}
          </HvButton>
          <HvBanner
            open={open}
            onClose={handleClose}
            offset={10}
            variant={variant}
            showIcon
            actions={<HvButton variant="secondaryGhost">Action</HvButton>}
            bannerContentProps={{
              actionProps: { "aria-label": "Close the banner" },
            }}
            {...others}
          />
        </>
      );
    };

    return (
      <div>
        <SimpleBanner
          id="banner1"
          variant="default"
          label="This is a banner."
        />
        <SimpleBanner
          id="banner2"
          variant="success"
          label="This is a success banner."
        />
        <SimpleBanner
          id="banner3"
          variant="error"
          label="This is an error banner."
        />
      </div>
    );
  },
};

export const CustomIcon: StoryObj<HvBannerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Banner with custom icon with base color on the semantic background.",
      },
    },
  },
  render: () => {
    return (
      <StyledBanner
        open
        offset={0}
        label="This is a banner with a custom icon."
        customIcon={<Info color="base_dark" />}
      />
    );
  },
};

export const CustomAction: StoryObj<HvBannerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Banner can receive a component or object action that will render a semantic button.",
      },
    },
  },
  render: () => {
    return (
      <StyledBanner
        open
        id="actionStructure"
        offset={0}
        label="This is a banner."
        showIcon
        actions={[{ id: "post", label: "Action", disabled: false }]}
        actionsCallback={(e, id, action) =>
          alert(`clicked ${id} with ${action.label}`)
        }
      />
    );
  },
};

export const BannerVariations: StoryObj<HvBannerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Banner with custom icon with base color on the semantic background.",
      },
    },
  },
  render: () => {
    const actionArray = (id) => [
      { id: `action${id}_1`, label: "Action 1", disabled: false },
      { id: `action${id}_2`, label: "Action 2", disabled: false },
    ];

    const BannerContent = (props) => (
      <>
        <br />
        <HvBannerContent {...props} />
      </>
    );

    return (
      <div>
        <HvTypography variant="title3">Semantics</HvTypography>
        <BannerContent content="This is a default banner." variant="default" />
        <BannerContent
          content="This is a success banner."
          variant="success"
          showIcon
        />
        <BannerContent
          content="This is a warning banner."
          variant="warning"
          showIcon
        />
        <BannerContent
          content="This is an error banner."
          variant="error"
          showIcon
        />
        <p />
        <HvTypography variant="title3">Actions</HvTypography>
        <BannerContent
          content="This is a default banner."
          actions={<HvButton variant="semantic">Action</HvButton>}
          actionsPosition="inline"
        />
        <BannerContent
          content="This is a banner with two actions."
          actions={actionArray("banner3")}
          actionsPosition="inline"
        />
        <BannerContent
          content="This could be a one-line message text string with two actions on a tablet or on a desktop. However, this is actually is a two-lines message text string with two actions on a tablet or on a desktop."
          actions={actionArray("banner1")}
          actionsPosition="bottom-right"
        />
        <BannerContent
          content="This could be a one-line message text string with two actions on a tablet or on a desktop. This could be a two-lines message text string with two actions on a tablet or on a desktop. However, this is actually a three-lines message text string with two actions on a tablet or on a desktop."
          actions={actionArray("banner2")}
          actionsPosition="bottom-right"
        />
        <p />
        <HvTypography variant="title3">Custom icon</HvTypography>
        <BannerContent
          content="This is a default banner."
          customIcon={<Info color="base_dark" />}
          onClose={() => {}}
        />
        <BannerContent
          content="This could be a one-line message text string with no actions on a tablet or on a desktop. This could be a two-lines message text string with no actions on a tablet or on a desktop. However, this is actually a three-lines message text string with no actions on a tablet or on a desktop."
          customIcon={<Info color="base_dark" />}
          onClose={() => {}}
        />
      </div>
    );
  },
};
