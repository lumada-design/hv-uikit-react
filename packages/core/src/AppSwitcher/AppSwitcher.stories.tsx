import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvAppSwitcher,
  HvAppSwitcherActionApplication,
  HvAppSwitcherProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Champion, Code, LeftAlign } from "@hitachivantara/uikit-react-icons";

const applicationsList: HvAppSwitcherActionApplication[] = [
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
    color: "primary",
    iconElement: <LeftAlign color="primary" />,
    description: "App 1 description",
  },
  {
    name: "No Icon App",
    color: "brand",
    description: "This is a disabled App without an icon",
    disabled: true,
  },
  {
    name: "No Description App",
    color: "brand",
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
    const handlesActionSelectedCallback: HvAppSwitcherProps["isActionSelectedCallback"] =
      (application) => {
        return (
          application.url != null &&
          window.location.href.startsWith(application.url)
        );
      };

    const handleActionClicked: HvAppSwitcherProps["onActionClickedCallback"] = (
      event,
      application,
    ) => {
      if (!application.url) {
        alert(`The clicked application was: ${application.name}`);
      }
    };

    return (
      <HvAppSwitcher
        title="My Apps"
        layout={layout}
        applications={applicationsList}
        isActionSelectedCallback={handlesActionSelectedCallback}
        onActionClickedCallback={handleActionClicked}
        footer="And this is a footer"
      />
    );
  },
};

export const ManyEntries: StoryObj<HvAppSwitcherProps> = {
  render: () => {
    const dummyApplicationsList = [
      ...Array(100).keys(),
    ].map<HvAppSwitcherActionApplication>((index) => ({
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
    }));

    return (
      <HvAppSwitcher
        className="max-h-370px"
        layout="dual"
        title="Big list of applications"
        applications={dummyApplicationsList}
        isActionSelectedCallback={(application) =>
          window.location.href.startsWith(application.url || "")
        }
      />
    );
  },
};

export const CustomHeader: StoryObj<HvAppSwitcherProps> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    const handleIsActionSelected: HvAppSwitcherProps["isActionSelectedCallback"] =
      (application) => {
        return !!selected && application.name === selected;
      };

    const handleActionClicked: HvAppSwitcherProps["onActionClickedCallback"] = (
      event,
      application,
    ) => {
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
