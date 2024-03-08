import { StoryObj } from "@storybook/react";
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
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
    ref: { control: { disable: true } },
    size: { control: { type: "select" } },
    radius: { control: { type: "select" } },
  },
};

export const Variants: StoryObj<HvButtonProps> = {
  decorators: [
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
  ],
  render: () => (
    <>
      <HvButton variant="primary">Primary</HvButton>
      <HvButton variant="primarySubtle">Primary Subtle</HvButton>
      <HvButton variant="primaryGhost">Primary Ghost</HvButton>
      <HvButton disabled variant="primary">
        Primary
      </HvButton>
      <HvButton disabled variant="primarySubtle">
        Primary Subtle
      </HvButton>
      <HvButton disabled variant="primaryGhost">
        Primary Ghost
      </HvButton>
      <div />
      <HvButton variant="secondarySubtle">Secondary Subtle</HvButton>
      <HvButton variant="secondaryGhost">Secondary Ghost</HvButton>
      <div />
      <HvButton variant="secondarySubtle" disabled>
        Secondary Subtle
      </HvButton>
      <HvButton variant="secondaryGhost" disabled>
        Secondary Ghost
      </HvButton>
    </>
  ),
};

export const Sizes: StoryObj<HvButtonProps> = {
  decorators: [
    (Story) => (
      <HvBox
        sx={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "repeat(3, 100px)",
        }}
      >
        {Story()}
      </HvBox>
    ),
  ],
  render: () => (
    <>
      <div>
        <HvButton variant="primary" size="sm">
          Small
        </HvButton>
      </div>
      <div>
        <HvButton variant="primary" size="md">
          Medium
        </HvButton>
      </div>
      <div>
        <HvButton variant="primary" size="lg">
          Large
        </HvButton>
      </div>
      <div />
      <div>
        <HvButton icon variant="primary" size="md" aria-label="Play">
          <Play />
        </HvButton>
      </div>
      <div>
        <HvButton icon variant="primary" size="lg" aria-label="Play">
          <Play />
        </HvButton>
      </div>
    </>
  ),
};

export const FocusableWhenDisabled: StoryObj<HvButtonProps> = {
  decorators: [
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
  ],
  parameters: {
    docs: {
      description: {
        story:
          "If you still need the button to be focusable when disabled for accessibility purposes, you can set the `focusableWhenDisabled` property to `true`. When using this property, the buttons will continue be read by screen readers when disabled.",
      },
    },
  },
  render: () => (
    <>
      <HvButton variant="primary" disabled focusableWhenDisabled>
        Primary
      </HvButton>
      <HvButton variant="primarySubtle" disabled focusableWhenDisabled>
        Primary Subtle
      </HvButton>
      <HvButton variant="primaryGhost" disabled focusableWhenDisabled>
        Primary Ghost
      </HvButton>
      <div />
      <HvButton variant="secondarySubtle" disabled focusableWhenDisabled>
        Secondary Subtle
      </HvButton>
      <HvButton variant="secondaryGhost" disabled focusableWhenDisabled>
        Secondary Ghost
      </HvButton>
    </>
  ),
};

export const Icons: StoryObj<HvButtonProps> = {
  decorators: [
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
  ],
  render: () => (
    <>
      <div>
        <HvButton icon aria-label="Play" variant="primaryGhost">
          <Play />
        </HvButton>
        <HvButton icon aria-label="Pause">
          <Pause />
        </HvButton>
        <HvButton icon disabled aria-label="Stop">
          <Stop />
        </HvButton>
      </div>
      <div>
        <HvButton startIcon={<Play />} variant="primaryGhost">
          Play
        </HvButton>
        <HvButton startIcon={<Pause />} variant="secondaryGhost">
          Pause
        </HvButton>
        <HvButton disabled startIcon={<Stop />} variant="secondaryGhost">
          Stop
        </HvButton>
      </div>
      <div>
        <HvButton endIcon={<Play />} variant="primaryGhost">
          Play
        </HvButton>
        <HvButton endIcon={<Pause />} variant="secondaryGhost">
          Pause
        </HvButton>
        <HvButton endIcon={<Stop />} disabled variant="secondaryGhost">
          Stop
        </HvButton>
      </div>
    </>
  ),
};

export const Semantic: StoryObj<HvButtonProps> = {
  decorators: [
    (Story) => (
      <HvBox
        sx={{
          display: "flex",
          gap: 20,
          backgroundColor: theme.colors.neutral_20,
          padding: 20,
        }}
      >
        {Story()}
      </HvBox>
    ),
  ],
  render: () => (
    <>
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
    </>
  ),
};

interface CustomLinkProps extends HvButtonProps<"a"> {
  to: string;
}

const CustomLink = ({ to, children, ...others }: CustomLinkProps) => (
  <a href={to} {...others}>
    {children}
  </a>
);

export const CustomRootComponent: StoryObj<HvButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary the button's root component can be changed by setting the `component` property.",
      },
    },
  },
  decorators: [
    (Story) => (
      <HvBox sx={{ display: "flex", gap: 20, padding: 20 }}>{Story()}</HvBox>
    ),
  ],
  render: () => (
    <>
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
    </>
  ),
};
