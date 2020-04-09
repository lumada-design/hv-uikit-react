import React, { useState } from "react";
import { Info } from "@hv/uikit-react-icons/dist";
import { HvButton, HvBanner, HvBannerContent, HvTypography } from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Notification/Banner",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBanner } from '@hv/uikit-react-core/dist'"
  },
  component: HvBanner
};

const styles = {
  position: "relative",
  top: 0,
  marginBottom: 10
};

export const Main = () => (
  <>
    <HvBanner open showIcon style={styles} label="This is a banner." />
    <HvBanner open variant="success" showIcon style={styles} label="This is a success message." />
    <HvBanner open variant="error" showIcon style={styles} label="This is an error message." />
    <HvBanner
      open
      style={styles}
      label="This is a banner with action."
      actions={[{ id: "post", label: "Action" }]}
      actionsCallback={(id, action) => console.log(`Clicked ${action.label}`)}
    />
  </>
);

export const BannerController = () => {
  const SimpleBanner = ({ variant, ...others }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") return;
      setOpen(false);
    };

    return (
      <>
        <HvButton
          onClick={handleOpen}
          variant="contained"
          color="primary"
          style={{ width: "150px", textTransform: "capitalize", margin: 10 }}
        >
          {variant}
        </HvButton>
        <HvBanner open={open} onClose={handleClose} offset={0} variant={variant} {...others} />
      </>
    );
  };

  return (
    <div style={{ marginTop: 60 }}>
      <SimpleBanner variant="default" showIcon label="This is a banner." />
      <SimpleBanner variant="success" showIcon label="This is a success message." />
      <SimpleBanner variant="error" showIcon label="This is an error message." />
    </div>
  );
};

BannerController.story = {
  parameters: {
    docs: {
      storyDescription: "Different Banner variants controlled by buttons"
    }
  }
};

export const CustomIcon = () => (
  <HvBanner
    open
    style={styles}
    label="This is a banner with a custom icon."
    customIcon={<Info color="base2" />}
  />
);

CustomIcon.story = {
  parameters: {
    docs: {
      storyDescription: "Banner with custom icon with base color on the semantic background"
    }
  }
};

export const CustomAction = () => (
  <HvBanner
    open
    id="actionStructure"
    style={styles}
    label="This is a banner."
    showIcon
    actions={[{ id: "post", label: "Action", disabled: false }]}
    actionsCallback={(id, action) => alert(`clicked ${id} with ${action.label}`)}
  />
);

CustomAction.story = {
  parameters: {
    docs: {
      storyDescription:
        "Banner can receive a component or object action that will render a semantic button"
    }
  }
};

export const BannerVariations = () => {
  const actionArray = id => [
    { id: `action${id}_1`, label: "Action 1", disabled: false },
    { id: `action${id}_2`, label: "Action 2", disabled: false }
  ];

  return (
    <div>
      <HvTypography variant="xsTitle">Semantics</HvTypography>
      <p />
      <HvBannerContent content="This is a default banner." variant="default" />
      <p />
      <HvBannerContent content="This is a success banner." variant="success" showIcon />
      <p />
      <HvBannerContent content="This is an error banner." variant="error" showIcon />

      <p />
      <HvTypography variant="xsTitle">Actions</HvTypography>
      <p />
      <HvBannerContent
        content="This is a default banner."
        variant="default"
        actions={<HvButton category="semantic">Action</HvButton>}
        actionsPosition="inline"
      />
      <p />
      <HvBannerContent
        content="This could be a one-line message text string with two actions on a tablet or on a desktop. However, this is actually is a two-lines message text string with two actions on a tablet or on a desktop."
        variant="default"
        actions={actionArray}
        actionsPosition="bottom-right"
      />
      <p />
      <HvBannerContent
        content="This could be a one-line message text string with two actions on a tablet or on a desktop. This could be a two-lines message text string with two actions on a tablet or on a desktop. However, this is actually a three-lines message text string with two actions on a tablet or on a desktop."
        variant="default"
        actions={actionArray}
        actionsPosition="bottom-right"
      />
      <p />
      <HvBannerContent
        content="This is a success banner."
        variant="success"
        showIcon
        actions={<HvButton category="semantic">Action</HvButton>}
        actionsPosition="inline"
        onClose={() => {}}
      />
      <p />
      <HvBannerContent
        content="This is an error banner."
        variant="error"
        showIcon
        actions={actionArray}
        actionsPosition="inline"
        onClose={() => {}}
      />

      <p />
      <HvTypography variant="xsTitle">Custom icon</HvTypography>
      <p />
      <HvBannerContent
        content="This is a default banner."
        variant="default"
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
      <p />
      <HvBannerContent
        content="This could be a one-line message text string with no actions on a tablet or on a desktop. This could be a two-lines message text string with no actions on a tablet or on a desktop. However, this is actually a three-lines message text string with no actions on a tablet or on a desktop."
        variant="default"
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
      <p />
      <HvBannerContent
        content="This is a success banner."
        variant="success"
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
      <p />
      <HvBannerContent
        content="This is an error banner."
        variant="error"
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
    </div>
  );
};
