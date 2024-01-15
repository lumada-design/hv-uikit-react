/* eslint-disable no-alert */
import React from "react";

import { Tool, PingPong, GameController, Champion } from "@hitachivantara/uikit-react-icons";

import HvAppSwitcherPanel from "..";

export default {
  title: "Lab/AppSwitcherPanel",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAppSwitcherPanel } from "@hitachivantara/uikit-react-lab";',
  },
  component: HvAppSwitcherPanel,
};

export const Main = () => {
  const boxStyles = {
    width: 32,
    height: 32,
  };

  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const applicationsList = [
    {
      iconUrl: "",
      description: "Application without a name should not appear",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App without url",
      iconUrl: "",
      description: "Application without a url should not appear",
      target: "_top",
    },
    {
      name: "",
      iconUrl: "",
      description: "Application with an empty name should not appear",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App with empty url",
      iconUrl: "",
      url: "",
      description: "Application with an empty url should not appear",
      target: "_top",
    },
    {
      name: "UI-KIT Storybook",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://lumada-design.github.io/uikit/v2.x/",
      target: "_top",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "This is the UI-KIT repository on Github",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_blank",
    },
    {
      name: "App with a bigger name than the other just to showcase the truncation on the AppSwitcherPanel",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "App 1 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "No Icon App",
      description: "This is an App without an icon, URL is set to the UI-KIT storybook",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
    {
      name: "No Description App",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
  ];

  return (
    <div style={{ height: "400px" }}>
      <HvAppSwitcherPanel
        applications={applicationsList}
        isActionSelectedCallback={handlesActionSelectedCallback}
        isOpen
      />
    </div>
  );
};

// Sample 2 - Simple example with footer
export const sample2 = () => {
  const boxStyles = {
    width: 32,
    height: 32,
  };

  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const applicationsList = [
    {
      name: "App with a bigger name than the others just to showcase the truncation on the AppSwitcherPanel",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://lumada-design.github.io/uikit/v2.x/",
      target: "_top",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "This is the UI-KIT repository on Github",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_blank",
    },
    {
      name: "No Icon App",
      description: "This is an App without an icon, URL is set to the UI-KIT storybook",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
    {
      name: "No Description App",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
  ];

  return (
    <div style={{ height: "400px" }}>
      <HvAppSwitcherPanel
        title="Dummy Apps with footer and a really big name to not fit in the container"
        applications={applicationsList}
        isActionSelectedCallback={handlesActionSelectedCallback}
        footer={<div>This is the footer</div>}
        isOpen
      />
    </div>
  );
};

sample2.story = {
  parameters: {
    docs: {
      storyDescription: "Simple example with footer",
    },
  },
};

// Sample 3 - Simple example with a big list of applications
export const sample3 = () => {
  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const getDummyApplicationsList = () => {
    const dummyApplicationsList = [];

    for (let index = 1; index <= 100; index += 1) {
      dummyApplicationsList.push({
        name:
          index % 3 === 0
            ? `Application ${index} is an application with a big name`
            : `Application ${index}`,
        iconUrl: `https://i.picsum.photos/id/${index}/32/32.jpg`,
        description: `This is the auto-generated application number ${index}. Note: All the apps redirect to the UI-KIT storybook`,
        url: "https://github.com/lumada-design/hv-uikit-react",
        target: index % 2 === 0 ? "_top" : "_blank",
      });
    }
    return dummyApplicationsList;
  };

  return (
    <div style={{ height: "400px" }}>
      <HvAppSwitcherPanel
        title="Big list of applications"
        applications={getDummyApplicationsList()}
        isActionSelectedCallback={handlesActionSelectedCallback}
        footer={<div>This is the footer</div>}
        isOpen
      />
    </div>
  );
};

sample3.story = {
  parameters: {
    docs: {
      storyDescription: "Simple example with a big list of applications",
    },
  },
};

// Sample 4 - Example with a custom header
export const sample4 = () => {
  const boxStyles = {
    width: 32,
    height: 32,
  };

  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const applicationsList = [
    {
      name: "App with a bigger name than the others just to showcase the truncation on the AppSwitcherPanel",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://lumada-design.github.io/uikit/v2.x/",
      target: "_top",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "This is the UI-KIT repository on Github",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_blank",
    },
    {
      name: "No Icon App",
      description: "This is an App without an icon, URL is set to the UI-KIT storybook",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
    {
      name: "No Description App",
      url: "https://github.com/lumada-design/hv-uikit-react",
    },
  ];

  return (
    <div style={{ height: "400px" }}>
      <HvAppSwitcherPanel
        title="Custom header"
        applications={applicationsList}
        isActionSelectedCallback={handlesActionSelectedCallback}
        header={<div style={{ backgroundColor: "lightgreen" }}>This is the custom header</div>}
        isOpen
      />
    </div>
  );
};

sample4.story = {
  parameters: {
    docs: {
      storyDescription: "Example with a custom header",
    },
  },
};

// Sample 5 - Using icon components mixed with url icons
export const sample5 = () => {
  const boxStyles = {
    width: 32,
    height: 32,
  };

  const handlesActionSelectedCallback = (application) => {
    return window.location.href.startsWith(application.url);
  };

  const applicationsList = [
    {
      name: "App 1 - Icon Tool",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "App 1 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App2 - Url icon",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "App 2 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 3 - Icon PingPong",
      iconElement: <PingPong boxStyles={boxStyles} />,
      description: "App 3 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 4 - No icon",
      description: "App 4 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 5 - Icon GameController",
      iconElement: <GameController boxStyles={boxStyles} />,
      description: "App 5 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App6 - Wrong url icon",
      iconUrl: "http://invalidurl.noicon",
      description: "App 6 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 7 - Icon Champion",
      iconElement: <Champion boxStyles={boxStyles} />,
      description: "App 7 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "ýö ! ' º~ %&#%ç e 合気道",
      iconElement: <Champion boxStyles={boxStyles} />,
      description: "App 8 Special characters",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
  ];

  return (
    <div style={{ height: "500px" }}>
      <HvAppSwitcherPanel
        applications={applicationsList}
        isActionSelectedCallback={handlesActionSelectedCallback}
        isOpen
      />
    </div>
  );
};

sample5.story = {
  parameters: {
    docs: {
      storyDescription: "Using icon components mixed with url icons",
    },
  },
};

// Sample 6 - Alerts on which menu was clicked
export const sample6 = () => {
  const boxStyles = {
    width: 32,
    height: 32,
  };

  const handleActionClicked = (event, application) => {
    event.preventDefault();

    alert(`The clicked application was: ${application.name}`);
  };

  const applicationsList = [
    {
      name: "App 1 - Icon Tool",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "App 1 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App2 - Url icon",
      iconUrl: "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "App 2 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 3 - Icon PingPong",
      iconElement: <PingPong boxStyles={boxStyles} />,
      description: "App 3 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 4 - No icon",
      description: "App 4 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 5 - Icon GameController",
      iconElement: <GameController boxStyles={boxStyles} />,
      description: "App 5 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App6 - Wrong url icon",
      iconUrl: "http://invalidurl.noicon",
      description: "App 6 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App 7 - Icon Champion",
      iconElement: <Champion boxStyles={boxStyles} />,
      description: "App 7 description",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
    {
      name: "ýö ! ' º~ %&#%ç e 合気道",
      iconElement: <Champion boxStyles={boxStyles} />,
      description: "App 8 Special characters",
      url: "https://github.com/lumada-design/hv-uikit-react",
      target: "_top",
    },
  ];

  return (
    <div style={{ height: "500px" }}>
      <HvAppSwitcherPanel
        applications={applicationsList}
        onActionClickedCallback={handleActionClicked}
        isOpen
      />
    </div>
  );
};

sample6.story = {
  parameters: {
    docs: {
      storyDescription: "Alerts on which menu was clicked",
    },
  },
};
