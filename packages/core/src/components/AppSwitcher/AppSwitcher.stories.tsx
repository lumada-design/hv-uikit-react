import { Champion, Code, LeftAlign } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvAppSwitcher,
  HvAppSwitcherProps,
  HvApplication,
  HvTypography,
} from "components";
import { useState } from "react";

const applicationsList: HvApplication[] = [
  {
    name: "UI Kit Storybook",
    color: "#FF4785",
    iconUrl:
      "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
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

const meta: Meta<typeof HvAppSwitcher> = {
  title: "Widgets/App Switcher",
  component: HvAppSwitcher,
};
export default meta;

export const Main: StoryObj<HvAppSwitcherProps> = {
  args: {
    layout: "single",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ layout }) => {
    const handlesActionSelectedCallback = (application) => {
      return (
        application.url != null &&
        window.location.href.startsWith(application.url)
      );
    };

    const handleActionClicked = (event, application) => {
      if (!application.url) {
        alert(`The clicked application was: ${application.name}`);
      }
    };

    return (
      <>
        <HvAppSwitcher
          title="My Apps"
          layout={layout}
          applications={applicationsList}
          isActionSelectedCallback={handlesActionSelectedCallback}
          onActionClickedCallback={handleActionClicked}
          footer="And this is a footer"
        />
      </>
    );
  },
};

export const ManyEntries: StoryObj<HvAppSwitcherProps> = {
  render: () => {
    const handlesActionSelectedCallback = (application) => {
      return window.location.href.startsWith(application.url);
    };

    const getDummyApplicationsList = () => {
      const dummyApplicationsList: HvApplication[] = [];

      for (let index = 1; index <= 100; index += 1) {
        dummyApplicationsList.push({
          id: `app_${index}`,
          name:
            index % 3 === 0
              ? `Application ${index} is an application with a big name`
              : `Application ${index}`,
          description:
            index % 5 === 0
              ? `This is the auto-generated application number ${index}`
              : undefined,
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
  },
};

export const CustomHeader: StoryObj<HvAppSwitcherProps> = {
  render: () => {
    const [selected, setSelected] = useState(null);

    const handleIsActionSelected = (application) => {
      return application.name === selected;
    };

    const handleActionClicked = (event, application) => {
      setSelected(application.name);
    };

    return (
      <HvAppSwitcher
        applications={applicationsList}
        isActionSelectedCallback={handleIsActionSelected}
        onActionClickedCallback={handleActionClicked}
        header={
          <HvTypography
            variant="title4"
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
  },
};
