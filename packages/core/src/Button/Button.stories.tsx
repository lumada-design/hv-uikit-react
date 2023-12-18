import { StoryFn, StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import {
  Delete,
  Favorite,
  Link as LinkIcon,
  MoreOptionsVertical,
  Pause,
  Play,
  Point,
  Refresh,
  Stop,
} from "@hitachivantara/uikit-react-icons";
import {
  HvBox,
  HvButton,
  HvButtonProps,
  theme,
} from "@hitachivantara/uikit-react-core";

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

export const Variants: StoryFn<HvButtonProps> = () => {
  return (
    <>
      <HvButton variant="primary">Primary</HvButton>
      <HvButton variant="primarySubtle">Primary Subtle</HvButton>
      <HvButton variant="primaryGhost">Primary Ghost</HvButton>
      <div />
      <HvButton variant="secondarySubtle">Secondary Subtle</HvButton>
      <HvButton variant="secondaryGhost">Secondary Ghost</HvButton>
      <HvButton disabled variant="primary">
        Disabled
      </HvButton>
      <HvButton disabled variant="primarySubtle">
        Disabled Subtle
      </HvButton>
      <HvButton disabled variant="primaryGhost">
        Disabled Ghost
      </HvButton>
    </>
  );
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

export const Icons: StoryFn<HvButtonProps> = () => {
  return (
    <>
      <div>
        <HvButton icon aria-label="Play" variant="primaryGhost">
          <Play iconSize="M" />
        </HvButton>
        <HvButton icon aria-label="Pause">
          <Pause iconSize="M" />
        </HvButton>
        <HvButton icon disabled aria-label="Stop">
          <Stop iconSize="M" />
        </HvButton>
      </div>
      <div>
        <HvButton startIcon={<Play />} variant="primaryGhost" aria-label="Play">
          Play
        </HvButton>
        <HvButton
          startIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
        >
          Pause
        </HvButton>
        <HvButton
          disabled
          startIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
        >
          Stop
        </HvButton>
      </div>
      <div>
        <HvButton endIcon={<Play />} variant="primaryGhost" aria-label="Play">
          Play
        </HvButton>
        <HvButton
          endIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
        >
          Pause
        </HvButton>
        <HvButton
          endIcon={<Stop />}
          disabled
          variant="secondaryGhost"
          aria-label="Stop"
        >
          Stop
        </HvButton>
      </div>
    </>
  );
};

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

export const CustomRootComponent = ({ onClick }) => {
  return (
    <HvBox sx={{ display: "flex", gap: 20, padding: 20 }}>
      <HvButton onClick={onClick} startIcon={<Point />}>
        Button
      </HvButton>
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
