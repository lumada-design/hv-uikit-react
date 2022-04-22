/* eslint-disable no-alert */
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

import { Code, LeftAlign, Tool, Champion } from "@hitachivantara/uikit-react-icons";
import { HvTypography } from "../..";

import HvAppSwitcher from "..";

export default {
  title: "Components/App Switcher",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAppSwitcher } from "@hitachivantara/uikit-react-core"',
  },
  component: HvAppSwitcher,
};

export const Main = () => {
  const handlesActionSelectedCallback = (application) => {
    return application.url != null && window.location.href.startsWith(application.url);
  };

  const handleActionClicked = (event, application) => {
    if (!application.url) {
      alert(`The clicked application was: ${application.name}`);
    }
  };

  const applicationsList = [
    {
      name: "UI Kit Storybook",
      color: "#FF4785",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI Kit project",
      url: "https://lumada-design.github.io/uikit/",
      target: "_top",
    },
    {
      name: "UI Kit repository (New Tab)",
      iconElement: <Code />,
      description: "This is the UI Kit repository on Github",
      url: "https://github.com/lumada-design/hv-uikit-react/",
      target: "_blank",
    },
    {
      name: "App with a bigger name than the other just to showcase the truncation on the AppSwitcher",
      color: "acce2",
      iconElement: <LeftAlign color="acce2" />,
      description: "App 1 description",
    },
    {
      name: "No Icon App",
      color: "acce3",
      description: "This is a disabled App without an icon",
      disabled: true,
    },
    {
      name: "No Description App",
      color: "acce3",
    },
  ];

  return (
    <HvAppSwitcher
      title="My Apps"
      applications={applicationsList}
      isActionSelectedCallback={handlesActionSelectedCallback}
      onActionClickedCallback={handleActionClicked}
    />
  );
};

// Sample 2 - Simple example with footer
export const Sample2 = () => {
  const handlesActionSelectedCallback = (application) => {
    return application.url != null && window.location.href.startsWith(application.url);
  };

  const handleActionClicked = (event, application) => {
    event.preventDefault();

    alert(`The clicked application was: ${application.name}`);
  };

  const applicationsList = [
    {
      name: "UI-KIT Storybook",
      color: "#FF4785",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI Kit project",
      url: "http://localhost:9001/",
      target: "_top",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Code />,
      description: "This is the UI Kit repository on Github",
      url: "https://github.com/lumada-design/hv-uikit-react/",
      target: "_blank",
    },
    {
      name: "App with a bigger name than the other just to showcase the truncation on the AppSwitcher",
      color: "acce2",
      iconElement: <LeftAlign color="acce2" />,
      description: "App 1 description",
      url: "https://github.com/lumada-design/hv-uikit-react/2",
      target: "_top",
    },
    {
      name: "No Description App",
      color: "acce3",
      url: "https://github.com/lumada-design/hv-uikit-react/4",
    },
    {
      name: "App without url",
      description:
        "An application without an url renders a button. Use onActionClickedCallback to react when clicked.",
    },
  ];

  return (
    <HvAppSwitcher
      layout="dual"
      title="My Apps"
      applications={applicationsList}
      isActionSelectedCallback={handlesActionSelectedCallback}
      onActionClickedCallback={handleActionClicked}
    />
  );
};

Sample2.parameters = {
  docs: {
    description: {
      story: "Sample using the dual columns layout and showcasing multiple item's variations.",
    },
  },
};

// Sample 3 - Simple example with a big list of applications
export const Sample3 = () => {
  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const getDummyApplicationsList = () => {
    const dummyApplicationsList = [];

    for (let index = 1; index <= 100; index += 1) {
      dummyApplicationsList.push({
        id: `app_${index}`,
        name:
          index % 3 === 0
            ? `Application ${index} is an application with a big name`
            : `Application ${index}`,
        description:
          index % 5 === 0 ? `This is the auto-generated application number ${index}` : undefined,
        url: "https://github.com/lumada-design/hv-uikit-react",
        target: index % 2 === 0 ? "_top" : "_blank",
      });
    }

    return dummyApplicationsList;
  };

  return (
    <div style={{ display: "flex", height: 370 }}>
      <HvAppSwitcher
        layout="dual"
        title="Big list of applications"
        applications={getDummyApplicationsList()}
        isActionSelectedCallback={handlesActionSelectedCallback}
      />
    </div>
  );
};

Sample3.parameters = {
  docs: {
    description: { story: "Sample with a very high cardinality (scrollable)." },
  },
};

// Sample 4 - Example with a custom header and footer
export const Sample4 = () => {
  const applicationsList = [
    {
      name: "App with a bigger name than the others just to showcase the truncation on the AppSwitcher",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Tool />,
      description: "This is the UI-KIT repository on Github",
    },
    {
      name: "No Icon App",
      description: "This is an App without an icon, URL is set to the UI-KIT storybook",
    },
    {
      name: "No Description App",
    },
  ];

  const [selected, setSelected] = useState(null);

  const handleIsActionSelected = (application) => {
    return application.name === selected;
  };

  const handleActionClicked = (event, application) => {
    setSelected(application.name);
  };

  const useStyles = makeStyles((theme) => ({
    itemIcon: {
      transition: "transform .8s ease-in-out",
    },
    itemSelected: {
      backgroundColor: theme.hv.palette.semantic.sema18,

      "& $itemIcon": {
        transform: "rotate(315deg)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <HvAppSwitcher
      applications={applicationsList}
      isActionSelectedCallback={handleIsActionSelected}
      onActionClickedCallback={handleActionClicked}
      classes={classes}
      header={
        <HvTypography
          variant="sTitle"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Champion iconSize="S" />
          This is a custom header
        </HvTypography>
      }
      footer="And this is a footer"
    />
  );
};

Sample4.parameters = {
  docs: {
    description: { story: "Example with a custom header and footer" },
  },
};
