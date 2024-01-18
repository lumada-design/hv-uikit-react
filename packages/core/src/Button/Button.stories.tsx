import { StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import {
  Delete,
  Favorite,
  Link as LinkIcon,
  MoreOptionsVertical,
  Point,
  Refresh,
} from "@hitachivantara/uikit-react-icons";
import {
  HvBox,
  HvButton,
  HvButtonProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import { Variants as VariantsStory, Icons as IconsStory } from "samples/Button";

import VariantsRaw from "samples/Button/Variants?raw";
import IconsRaw from "samples/Button/Variants?raw";

import { buttonRadius, buttonSize, buttonVariant } from "./types";

export default { title: "Components/Button", component: HvButton };

export const Main: StoryObj<HvButtonProps> = {
  args: {
    children: "Primary",
    variant: "primary",
    disabled: false,
    size: undefined,
    radius: undefined,
    overrideIconColors: false,
    selected: false,
    onClick: () => console.log("clicked"),
  },
  argTypes: {
    children: {
      description: "Button children.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    selected: {
      description: "Whether the Button is selected or not.",
      table: {
        type: { summary: "boolean" },
      },
    },
    variant: {
      description:
        "Use the variant prop to change the visual style of the Button.",
      options: buttonVariant,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: "HvButtonVariant" },
      },
    },
    disabled: {
      description: "Whether the Button is disabled or not.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    size: {
      description: "Button size.",
      options: buttonSize,
      control: { type: "select" },
      table: {
        type: { summary: "HvButtonSize" },
      },
    },
    radius: {
      description: "Button border radius.",
      options: buttonRadius,
      control: { type: "select" },
      table: {
        defaultValue: { summary: "base" },
        type: { summary: "HvButtonRadius" },
      },
    },
    overrideIconColors: {
      description:
        "Defines the default colors of the button are forced into the icon.",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    classes: {
      description:
        "A Jss Object used to override or extend the styles applied.",
      table: {
        type: { summary: "HvButtonClasses" },
      },
      control: { disable: true },
    },
    icon: {
      description: "Whether the Button is an icon-only button.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      control: { disable: true },
    },
    startIcon: {
      description: "Element placed before the children.",
      table: {
        type: { summary: "React.ReactElement" },
      },
      control: { disable: true },
    },
    endIcon: {
      description: "Element placed after the children.",
      table: {
        type: { summary: "React.ReactElement" },
      },
      control: { disable: true },
    },
    component: {
      description: "Element to use for the root node. Defaults to `button`.",
      table: {
        defaultValue: { summary: "button" },
        type: { summary: "React.ElementType" },
      },
      control: { disable: true },
    },
  },
};

export const Variants: StoryObj = {
  parameters: {
    docs: {
      source: { code: VariantsRaw },
    },
  },
  render: () => <VariantsStory />,
};

export const Icons: StoryObj = {
  parameters: {
    docs: {
      source: { code: IconsRaw },
    },
  },
  render: () => <IconsStory />,
};

Variants.decorators = [
  (Story) => (
    <HvBox
      sx={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: "repeat(3, 140px)",
      }}
    >
      {Story()}
    </HvBox>
  ),
];

Icons.decorators = [
  (Story) => (
    <div
      className={css({
        display: "flex",
        flexFlow: "column",
        gap: 10,
        "& > div": {
          display: "flex",
          gap: 20,
        },
      })}
    >
      {Story()}
    </div>
  ),
];

export const Semantic = () => {
  return (
    <HvBox
      sx={{
        display: "flex",
        gap: 20,
        backgroundColor: theme.colors.neutral_20,
        padding: 20,
      }}
    >
      <HvButton
        variant="semantic"
        aria-label="Favorite"
        startIcon={<Favorite />}
      >
        Favorite
      </HvButton>
      <HvButton variant="semantic" startIcon={<Refresh />} aria-label="Refresh">
        Refresh
      </HvButton>
      <HvButton variant="semantic" startIcon={<Delete />} aria-label="Delete">
        Delete
      </HvButton>
      <HvButton variant="semantic" icon aria-label="More options">
        <MoreOptionsVertical />
      </HvButton>
    </HvBox>
  );
};

interface CustomLinkProps extends HvButtonProps<"a"> {
  to: string;
}

const CustomLink = ({ to, children, ...others }: CustomLinkProps) => (
  <a href={to} {...others}>
    {children}
  </a>
);

export const CustomRootComponent = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20, padding: 20 }}>
      <HvButton startIcon={<Point />}>Button</HvButton>
      <HvButton
        variant="secondaryGhost"
        component="a"
        href="https://lumada-design.github.io/uikit/master"
        startIcon={<LinkIcon />}
      >
        Link
      </HvButton>
      <HvButton
        variant="secondarySubtle"
        component={CustomLink}
        to="https://lumada-design.github.io/uikit/master"
        startIcon={<LinkIcon />}
      >
        Custom link
      </HvButton>
    </HvBox>
  );
};

CustomRootComponent.parameters = {
  docs: {
    description: {
      story:
        "If necessary the button's root component can be changed by setting the `component` property.",
    },
  },
};
