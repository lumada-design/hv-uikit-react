import React, { useState } from "react";
import { Info } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvBanner, HvBannerContent, HvTypography } from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Feedback/Banner",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBanner } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvBanner,
};

const styles = {
  position: "relative",
  top: 0,
  marginBottom: 10,
};

export const Main = () => (
  <>
    <HvBanner open variant="default" style={styles} label="This is an informational message." />
    <HvBanner open variant="success" showIcon style={styles} label="This is a success message." />
    <HvBanner open variant="warning" showIcon style={styles} label="This is an alert message." />
    <HvBanner open variant="error" showIcon style={styles} label="This is an error message." />
    <HvBanner
      open
      style={styles}
      label="This is a banner with an action."
      actions={[{ id: "post", label: "Action" }]}
      actionsCallback={(e, id, action) => console.log(`Clicked ${action.label}`)}
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
        <HvBanner
          open={open}
          onClose={handleClose}
          offset={10}
          variant={variant}
          showIcon
          actions={<HvButton category="semantic">Action</HvButton>}
          bannerContentProps={{ actionProps: { "aria-label": "Close the banner" } }}
          {...others}
        />
      </>
    );
  };

  return (
    <div>
      <SimpleBanner id="banner1" variant="default" label="This is a banner." />
      <SimpleBanner id="banner2" variant="success" label="This is a success banner." />
      <SimpleBanner id="banner3" variant="error" label="This is an error banner." />
    </div>
  );
};

BannerController.parameters = {
  docs: {
    description: { story: "Different Banner variants with actions and controlled by buttons." },
  },
  eyes: { include: false },
};

export const CustomIcon = () => (
  <HvBanner
    open
    style={styles}
    label="This is a banner with a custom icon."
    customIcon={<Info color="base2" />}
  />
);

CustomIcon.parameters = {
  docs: {
    description: { story: "Banner with custom icon with base color on the semantic background." },
  },
};

export const CustomAction = () => (
  <HvBanner
    open
    id="actionStructure"
    style={styles}
    label="This is a banner."
    showIcon
    actions={[{ id: "post", label: "Action", disabled: false }]}
    actionsCallback={(e, id, action) => alert(`clicked ${id} with ${action.label}`)}
  />
);

CustomAction.parameters = {
  docs: {
    description: {
      story: "Banner can receive a component or object action that will render a semantic button.",
    },
  },
};

export const BannerVariations = () => {
  const actionArray = (id) => [
    { id: `action${id}_1`, label: "Action 1", disabled: false },
    { id: `action${id}_2`, label: "Action 2", disabled: false },
  ];

  const BannerContent = (props) => (
    <>
      <p />
      <HvBannerContent {...props} />
    </>
  );

  return (
    <div>
      <HvTypography variant="xsTitle">Semantics</HvTypography>
      <BannerContent content="This is a default banner." variant="default" />
      <BannerContent content="This is a success banner." variant="success" showIcon />
      <BannerContent content="This is a warning banner." variant="warning" showIcon />
      <BannerContent content="This is an error banner." variant="error" showIcon />
      <p />
      <HvTypography variant="xsTitle">Actions</HvTypography>
      <BannerContent
        content="This is a default banner."
        actions={<HvButton category="semantic">Action</HvButton>}
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
      <HvTypography variant="xsTitle">Custom icon</HvTypography>
      <BannerContent
        content="This is a default banner."
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
      <BannerContent
        content="This could be a one-line message text string with no actions on a tablet or on a desktop. This could be a two-lines message text string with no actions on a tablet or on a desktop. However, this is actually a three-lines message text string with no actions on a tablet or on a desktop."
        customIcon={<Info color="base2" />}
        onClose={() => {}}
      />
    </div>
  );
};
