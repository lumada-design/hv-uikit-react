import { Meta, StoryObj } from "@storybook/react";
import { HvBreadCrumb, HvBreadCrumbProps } from "components";

const data = [
  { label: "Label 1", path: "route1" },
  { label: "Label 2", path: "route2" },
  { label: "Label 3", path: "route3" },
  { label: "Label 4", path: "route4" },
  { label: "Label 5", path: "route5" },
  { label: "Label 6", path: "route6" },
  { label: "Label 7", path: "route7" },
  { label: "Label 8", path: "route8" },
  { label: "Label 9", path: "route9" },
];

const meta: Meta<typeof HvBreadCrumb> = {
  title: "Navigation/Breadcrumb",
  component: HvBreadCrumb,
  argTypes: {
    onClick: { action: "clicked" },
  },
};
export default meta;

export const Main: StoryObj<HvBreadCrumbProps> = {
  args: {
    maxVisible: 5,
  },
  argTypes: {
    classes: { control: { disable: true } },
    maxVisible: { control: { type: "range", min: 0, max: data.length } },
  },
  render: (args) => {
    return (
      <HvBreadCrumb
        listRoute={data}
        id="breadcrumb1"
        aria-label="Breadcrumb"
        {...args}
      >
        List
      </HvBreadCrumb>
    );
  },
};

export const WithURL: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb sample that generates the paths using an URL",
      },
    },
  },
  render: (args) => {
    return (
      <HvBreadCrumb
        url="https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx"
        id="breadcrumb4"
        aria-label="Breadcrumb"
        {...args}
      />
    );
  },
};

export const WithURLLimited: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb sample that generates the limited paths using an URL.",
      },
    },
  },
  render: (args) => {
    return (
      <HvBreadCrumb
        url="https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx"
        id="breadcrumb5"
        maxVisible={2}
        aria-label="Breadcrumb"
        {...args}
      />
    );
  },
};

export const WithClickEvents: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb sample that has a onClick defined.",
      },
    },
  },
  render: () => {
    return (
      <HvBreadCrumb
        listRoute={data}
        id="breadcrumb6"
        aria-label="Breadcrumb"
        onClick={(event, elem) => console.log(elem.path)}
      />
    );
  },
};

export const WithLongLabels: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb with long labels.",
      },
    },
  },
  render: (args) => {
    const longData = [
      { label: "Label 1 with some long text", path: "route1" },
      { label: "Label 2 with some long text", path: "route2" },
      { label: "Label 3 with some long text", path: "route3" },
      { label: "Label 4 with some long text", path: "route4" },
      { label: "Label 5 with some long text", path: "route5" },
    ];

    return (
      <HvBreadCrumb
        listRoute={longData}
        id="breadcrumb7"
        aria-label="Breadcrumb"
        {...args}
      />
    );
  },
};
