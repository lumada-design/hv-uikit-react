import { StoryFn, StoryObj } from "@storybook/react";
import {
  HvBox,
  HvTypography,
  HvTypographyProps,
  typographyVariants,
  theme,
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
    variant: {
      description:
        "Use the variant prop to change the visual style of the Typography.",
      table: {
        defaultValue: { summary: "body" },
        type: { summary: "HvTypographyVariants | HvTypographyLegacyVariants" },
      },
      options: typographyVariants,
    },
    link: {
      description: "If `true` the typography will display the look of a link.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description:
        "If `true` the typography will display the look of a disabled state.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    noWrap: {
      description:
        "If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis. Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    component: {
      description: "Element to use for the root node.",
      table: {
        type: { summary: "React.ElementType" },
      },
      control: { disable: true },
    },
    classes: {
      description:
        "A Jss Object used to override or extend the styles applied to the component.",
      table: {
        type: { summary: "HvTypographyClasses" },
      },
      control: { disable: true },
    },
  },
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>],
  render: (args) => (
    <HvTypography {...args}>Welcome to NEXT Design System!</HvTypography>
  ),
};

export const Variants = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: theme.space.sm }}
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
};

interface CustomLinkProps extends HvTypographyProps<"a"> {
  to: string;
}

const CustomLink = ({ to, children, ...others }: CustomLinkProps) => (
  <a href={to} {...others}>
    {children}
  </a>
);

export const CustomRootComponent: StoryFn = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20, padding: 20 }}>
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
    </HvBox>
  );
};

CustomRootComponent.parameters = {
  docs: {
    description: {
      story:
        "The `component` prop can be used to change the root element, like an `a` element or a `CustomLink` component.",
    },
  },
};
