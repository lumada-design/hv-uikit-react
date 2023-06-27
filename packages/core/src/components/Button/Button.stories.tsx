import { StoryObj } from "@storybook/react";
import {
  Delete,
  Favorite,
  MoreOptionsVertical,
  Pause,
  Play,
  Refresh,
  Stop,
} from "@hitachivantara/uikit-react-icons";
import { HvBox } from "@core/components";
import {
  HvButton,
  HvButtonProps,
  buttonRadius,
  buttonSize,
  buttonVariant,
} from "./Button";

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

export const Variants = ({ onClick }) => {
  return (
    <HvBox
      sx={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3, 140px)" }}
    >
      <HvButton variant="primary" onClick={onClick}>
        Primary
      </HvButton>
      <HvButton variant="primarySubtle" onClick={onClick}>
        Primary Subtle
      </HvButton>
      <HvButton variant="primaryGhost" onClick={onClick}>
        Primary Ghost
      </HvButton>
      <div />
      <HvButton variant="secondarySubtle" onClick={onClick}>
        Secondary Subtle
      </HvButton>
      <HvButton variant="secondaryGhost" onClick={onClick}>
        Secondary Ghost
      </HvButton>
      <HvButton disabled variant="primary" onClick={onClick}>
        Disabled
      </HvButton>
      <HvButton disabled variant="primarySubtle" onClick={onClick}>
        Disabled Subtle
      </HvButton>
      <HvButton disabled variant="primaryGhost" onClick={onClick}>
        Disabled Ghost
      </HvButton>
    </HvBox>
  );
};

const clickAction = () => {
  alert("This can be triggered");
};

Variants.args = {
  onClick: clickAction,
};

export const Icons = ({ onClick }) => {
  return (
    <>
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton
          icon
          aria-label="Play"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Play iconSize="M" />
        </HvButton>
        <HvButton
          icon
          aria-label="Pause"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Pause iconSize="M" />
        </HvButton>
        <HvButton
          icon
          aria-label="Stop"
          onClick={onClick}
          variant="secondaryGhost"
        >
          <Stop iconSize="M" />
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20, marginTop: 10 }}>
        <HvButton
          startIcon={<Play />}
          variant="secondaryGhost"
          aria-label="Play"
          onClick={onClick}
        >
          Play
        </HvButton>
        <HvButton
          startIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
          onClick={onClick}
        >
          Pause
        </HvButton>
        <HvButton
          startIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
          onClick={onClick}
        >
          Stop
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20, marginTop: 10 }}>
        <HvButton
          endIcon={<Play />}
          variant="secondaryGhost"
          aria-label="Play"
          onClick={onClick}
        >
          Play
        </HvButton>
        <HvButton
          endIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
          onClick={onClick}
        >
          Pause
        </HvButton>
        <HvButton
          endIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
          onClick={onClick}
        >
          Stop
        </HvButton>
      </HvBox>
    </>
  );
};

Icons.args = {
  onClick: clickAction,
};

export const Semantic = ({ onClick }) => {
  return (
    <HvBox
      sx={{ display: "flex", gap: 20, backgroundColor: "#D3E3F6", padding: 20 }}
    >
      <HvButton
        variant="semantic"
        onClick={onClick}
        aria-label="Favorite"
        startIcon={<Favorite />}
      >
        Favorite
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        startIcon={<Refresh />}
        aria-label="Refresh"
      >
        Refresh
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        startIcon={<Delete />}
        aria-label="Delete"
      >
        Delete
      </HvButton>
      <HvButton
        variant="semantic"
        onClick={onClick}
        icon
        aria-label="More options"
      >
        <MoreOptionsVertical />
      </HvButton>
    </HvBox>
  );
};

Semantic.args = {
  onClick: clickAction,
};

const CustomLink = ({ to, children, ...others }) => (
  <a href={to} {...others}>
    {children}
  </a>
);

export const CustomRootComponent = ({ onClick }) => {
  return (
    <HvBox sx={{ display: "flex", gap: 20, padding: 20 }}>
      <HvButton onClick={onClick}>Button</HvButton>
      <HvButton
        component="a"
        href="https://lumada-design.github.io/uikit/master"
      >
        Link
      </HvButton>
      <HvButton
        component={CustomLink}
        to="https://lumada-design.github.io/uikit/master"
      >
        Custom link
      </HvButton>
    </HvBox>
  );
};

CustomRootComponent.args = {
  onClick: clickAction,
};

CustomRootComponent.parameters = {
  docs: {
    description: {
      story:
        "If necessary the button's root component can be changed by setting the `component` property.",
    },
  },
};
