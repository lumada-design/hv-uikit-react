import { StoryObj } from "@storybook/react";
import {
  HvTypography,
  HvTypographyProps,
  theme,
  typographyVariants,
} from "@hitachivantara/uikit-react-core";

export default { title: "Foundation/Typography", component: HvTypography };

export const Main: StoryObj<HvTypographyProps> = {
  args: {
    variant: "title1",
    link: false,
    disabled: false,
    noWrap: false,
    paragraph: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
    ref: { control: { disable: true } },
  },
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>],
  render: (args) => (
    <HvTypography {...args}>Welcome to NEXT Design System!</HvTypography>
  ),
};

export const Variants: StoryObj<HvTypographyProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The component supports different variants through the `variant` property as shown below. It's also possible to set the `disabled` or `link` properties if needed.",
      },
    },
  },
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.sm,
        }}
      >
        {typographyVariants.map((variant) => (
          <div key={variant}>
            <HvTypography variant="label">{variant}</HvTypography>
            <br />
            <HvTypography variant={variant}>
              Welcome to NEXT Design System!
            </HvTypography>
          </div>
        ))}
      </div>
    );
  },
};

interface CustomLinkProps extends HvTypographyProps<"a"> {
  to: string;
}

const CustomLink = ({ to, children, ...others }: CustomLinkProps) => (
  <a href={to} {...others}>
    {children}
  </a>
);

export const CustomRootComponent: StoryObj<HvTypographyProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `component` prop can be used to change the root element, like an `a` element or a `CustomLink` component.",
      },
    },
  },
  render: () => {
    return (
      <div style={{ display: "flex", gap: 20, padding: 20 }}>
        <HvTypography component="span">Typography</HvTypography>
        <HvTypography
          link
          component="a"
          href="https://lumada-design.github.io/uikit/master"
        >
          Link
        </HvTypography>
        <HvTypography
          link
          component={CustomLink}
          to="https://lumada-design.github.io/uikit/master"
        >
          Custom link
        </HvTypography>
      </div>
    );
  },
};

export const Test: StoryObj = {
  decorators: [
    (Story) => <div className="flex flex-wrap gap-sm">{Story()}</div>,
  ],
  render: () => (
    <>
      <HvTypography disabled variant="display">
        Welcome to UI-Kit!
      </HvTypography>
      <HvTypography
        link
        variant="display"
        component="a"
        href="https://lumada-design.github.io/uikit/master"
      >
        Welcome to UI-Kit!
      </HvTypography>
      {typographyVariants.map((variant) => (
        <HvTypography key={variant} variant={variant}>
          Welcome to UI-Kit!
        </HvTypography>
      ))}
    </>
  ),
};
