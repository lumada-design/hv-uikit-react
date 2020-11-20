import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/";
import { HvBadge, HvTabs, HvTab, HvTypography } from "../..";

export default {
  title: "Components/Tabs",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTabs, HvTab } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.1",
  },
  component: HvTabs,
  subcomponents: { HvTab },
};

export const Main = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <HvTabs id="tabs" value={value} onChange={handleChange}>
      <HvTab id="tabs-tab1" label="Clickable tab 1" />
      <HvTab id="tabs-tab2" label="Clickable tab 2" />
      <HvTab id="tabs-tab3" label="Clickable tab 3" />
    </HvTabs>
  );
};

Main.parameters = {
  eyes: { waitBeforeScreenshot: ".HvTabs-root" },
};

export const FullWidth = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <HvTabs variant="fullWidth" value={value} onChange={handleChange}>
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
    </HvTabs>
  );
};

FullWidth.parameters = {
  docs: {
    description: { story: "Tabs occupying the full width of the available space" },
  },
};

export const ContentChanging = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  const renderContainer = (id, children) => (
    <HvTypography id={id} component="div" style={{ padding: 8 * 3 }}>
      {children}
    </HvTypography>
  );

  return (
    <>
      <HvTabs id="tabs" value={value} onChange={handleChange}>
        <HvTab id="tabs-tab1" label="Clickable tab 1" />
        <HvTab id="tabs-tab2" label="Clickable tab 2" />
        <HvTab id="tabs-tab3" label="Clickable tab 3" />
      </HvTabs>
      {value === 0 && renderContainer("container1", "Page One")}
      {value === 1 && renderContainer("container2", "Page Two")}
      {value === 2 && renderContainer("container3", "Page Three")}
    </>
  );
};

ContentChanging.parameters = {
  docs: {
    description: { story: "Tabs changing the content to display according to the selected tab" },
  },
  eyes: { waitBeforeScreenshot: ".HvTabs-root" },
};

export const TextSize = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  const StyledTab = withStyles((theme) => ({
    root: {
      minHeight: 48,
      ...theme.hv.typography.sTitle,
    },
  }))((props) => <HvTab {...props} />);

  return (
    <HvTabs id="tabs" value={value} onChange={handleChange}>
      <StyledTab id="tabs-tab1" label="Clickable tab" />
      <StyledTab id="tabs-tab2" disabled label="Disabled tab" />
      <StyledTab id="tabs-tab3" label="Clickable tab" />
    </HvTabs>
  );
};

TextSize.parameters = {
  eyes: { waitBeforeScreenshot: ".HvTabs-root" },
};

export const CenteredTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  const classes = makeStyles({
    content: {
      "& div div": {
        justifyContent: "center",
      },
    },
  })();

  return (
    <HvTabs className={classes.content} value={value} onChange={handleChange}>
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
      <HvTab label="Clickable tab" />
    </HvTabs>
  );
};

CenteredTabs.parameters = {
  eyes: { waitBeforeScreenshot: ".HvTabs-root" },
};

export const WithBadges = () => {
  const Sample = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    const StyledTab = withStyles((theme) => ({
      root: {
        ...theme.hv.typography.sTitle,
        minHeight: 48,
        justifyContent: "center",
        "&$selected": {
          fontWeight: theme.hv.typography.highlightText.fontWeight,
        },
      },
    }))((props) => <HvTab {...props} />);

    return (
      <HvTabs value={value} onChange={handleChange}>
        <StyledTab label={<HvBadge showCount count={2} text="Track events" />} />
        <StyledTab label={<HvBadge count={1} text="Vehicle events" />} />
      </HvTabs>
    );
  };

  return <Sample />;
};

WithBadges.parameters = {
  docs: {
    description: { story: "Badges applied to Tabs component." },
  },
  eyes: { waitBeforeScreenshot: ".HvTabs-root" },
};
