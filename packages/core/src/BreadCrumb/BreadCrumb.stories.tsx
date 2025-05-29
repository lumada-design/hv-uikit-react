import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  HvBreadCrumb,
  HvBreadCrumbProps,
} from "@hitachivantara/uikit-react-core";

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
  title: "Components/Breadcrumb",
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
    listRoute: { control: { disable: true } },
    component: { control: { disable: true } },
    dropDownMenuProps: { control: { disable: true } },
    maxVisible: { control: { type: "range", min: 0, max: data.length } },
  },
  render: (args) => {
    return <HvBreadCrumb listRoute={data} aria-label="Breadcrumb" {...args} />;
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
        aria-label="Breadcrumb"
        {...args}
      />
    );
  },
};

export const WithCustomComponent: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Breadcrumb sample with a `CustomNavLink` component that has a custom `onClick` behavior.",
      },
    },
  },
  render: () => {
    const CustomNavLink = ({ children, to, ariaLabel, ...others }: any) => (
      <a
        href={to}
        aria-label={ariaLabel}
        onClick={() => console.log("clicked", to)}
        // make sure to forward other props
        {...others}
      >
        {children}
      </a>
    );

    return (
      <HvBreadCrumb
        listRoute={data.map(({ label, path }) => ({
          label,
          path: `#${path}`,
          to: `#${path}`,
          ariaLabel: label,
        }))}
        aria-label="Breadcrumb"
        component={CustomNavLink}
      />
    );
  },
};

export const Test: StoryObj<HvBreadCrumbProps> = {
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb with long labels.",
      },
    },
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /dropdown/i }));
    await expect(await canvas.findByRole("menu")).toBeInTheDocument();
  },
  decorators: [(Story) => <div className="grid gap-sm">{Story()}</div>],
  render: () => (
    <>
      <HvBreadCrumb
        aria-label="Test link"
        url="https://example.com/sites/subpath/anotherPath/leaf.aspx"
      />
      <HvBreadCrumb aria-label="Test" maxVisible={4} listRoute={data} />
      <HvBreadCrumb
        aria-label="Test long"
        listRoute={[...Array(5).keys()].map((i) => ({
          label: `Long label ${i + 1} With Some Long Text`,
          path: `route${i}`,
        }))}
      />
    </>
  ),
};
