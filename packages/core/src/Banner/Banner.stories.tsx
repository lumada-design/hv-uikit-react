import { useState } from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvBanner,
  HvBannerContent,
  HvBannerContentProps,
  HvBannerProps,
  HvButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

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
    customIcon: { control: { disable: true } },
    bannerContentProps: { control: { disable: true } },
    actions: { control: { disable: true } },
    actionsCallback: { control: { disable: true } },
  },
  render: (args) => {
    return <StyledBanner {...args} />;
  },
};

export const Variants: StoryObj<HvBannerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Banner with custom icon with base color on the semantic background.",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => {
    const actionArray = (id: string) => [
      { id: `action${id}_1`, label: "Action 1", disabled: false },
      { id: `action${id}_2`, label: "Action 2", disabled: false },
    ];

    const BannerContent = (props: HvBannerContentProps) => (
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
        <br />
        <HvTypography variant="title3">Actions</HvTypography>
        <br />
        <HvBanner
          open
          offset={0}
          label="This is a banner."
          showIcon
          actions={[{ id: "post", label: "Action", disabled: false }]}
          onAction={(event, action) => console.log("Clicked", action)}
          className={css({ position: "relative", top: 0 })}
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
        <br />
        <HvTypography variant="title3">Custom icon</HvTypography>
        <BannerContent
          content="This is a banner with a custom icon."
          customIcon={<Info color="base_dark" />}
        />
        <BannerContent
          content="This could be a one-line message text string with no actions on a tablet or on a desktop. This could be a two-lines message text string with no actions on a tablet or on a desktop. However, this is actually a three-lines message text string with no actions on a tablet or on a desktop."
          customIcon={<Info color="base_dark" />}
        />
      </div>
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
  },
  render: () => {
    const SimpleBanner = ({
      variant,
      ...others
    }: Omit<HvBannerProps, "open">) => {
      const [open, setOpen] = useState(false);

      const handleOpen = () => setOpen(true);

      const handleClose = () => setOpen(false);

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
            actions={
              <HvButton
                variant="secondaryGhost"
                style={{ color: theme.colors.base_dark }}
              >
                Action
              </HvButton>
            }
            bannerContentProps={{
              actionProps: { "aria-label": "Close the banner" },
            }}
            {...others}
          />
        </>
      );
    };

    return (
      <>
        <SimpleBanner variant="default" label="This is a banner." />
        <SimpleBanner variant="success" label="This is a success banner." />
        <SimpleBanner variant="error" label="This is an error banner." />
      </>
    );
  },
};
