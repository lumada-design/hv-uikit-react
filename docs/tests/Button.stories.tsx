import { HvButton } from "@hitachivantara/uikit-react-core";
import { Pause, Play, Stop } from "@hitachivantara/uikit-react-icons";
import { StoryObj } from "@storybook/react";

export default {
  title: "Tests/Button",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
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
      <HvButton variant="secondarySubtle">Secondary Subtle</HvButton>
      <HvButton variant="secondaryGhost">Secondary Ghost</HvButton>
      <HvButton variant="secondarySubtle" disabled>
        Secondary Subtle
      </HvButton>
      <HvButton variant="secondaryGhost" disabled>
        Secondary Ghost
      </HvButton>
      <HvButton variant="semantic">Semantic</HvButton>
      <HvButton size="sm" variant="positive">
        Positive
      </HvButton>
      <HvButton size="sm" variant="positiveSubtle">
        Positive Subtle
      </HvButton>
      <HvButton size="sm" variant="positiveGhost">
        Positive Ghost
      </HvButton>
      <HvButton size="sm" variant="positive" disabled>
        Positive
      </HvButton>
      <HvButton size="sm" variant="positiveSubtle" disabled>
        Positive Subtle
      </HvButton>
      <HvButton size="sm" variant="positiveGhost" disabled>
        Positive Ghost
      </HvButton>
      <HvButton size="md" variant="warning">
        Warning
      </HvButton>
      <HvButton size="md" variant="warningSubtle">
        Warning Subtle
      </HvButton>
      <HvButton size="md" variant="warningGhost">
        Warning Ghost
      </HvButton>
      <HvButton size="md" variant="warning" disabled>
        Warning
      </HvButton>
      <HvButton size="md" variant="warningSubtle" disabled>
        Warning Subtle
      </HvButton>
      <HvButton size="md" variant="warningGhost" disabled>
        Warning Ghost
      </HvButton>
      <HvButton size="lg" variant="negative">
        Negative
      </HvButton>
      <HvButton size="lg" variant="negativeSubtle">
        Negative Subtle
      </HvButton>
      <HvButton size="lg" variant="negativeGhost">
        Negative Ghost
      </HvButton>
      <HvButton size="lg" variant="negative" disabled>
        Negative
      </HvButton>
      <HvButton size="lg" variant="negativeSubtle" disabled>
        Negative Subtle
      </HvButton>
      <HvButton size="lg" variant="negativeGhost" disabled>
        Negative Ghost
      </HvButton>

      <HvButton icon aria-label="Play" variant="primary">
        <Play />
      </HvButton>
      <HvButton icon aria-label="Play" variant="primarySubtle">
        <Play />
      </HvButton>
      <HvButton icon aria-label="Play" variant="primaryGhost">
        <Play />
      </HvButton>
      <HvButton icon aria-label="Play" variant="secondarySubtle">
        <Play />
      </HvButton>
      <HvButton icon aria-label="Play" variant="secondaryGhost">
        <Play />
      </HvButton>

      <HvButton icon aria-label="Pause" variant="primarySubtle" size="sm">
        <Play />
      </HvButton>
      <HvButton icon aria-label="Pause" variant="primarySubtle" size="md">
        <Play />
      </HvButton>
      <HvButton icon disabled aria-label="Stop" variant="primary" size="lg">
        <Play />
      </HvButton>

      <HvButton icon aria-label="Play">
        <Play iconSize="M" />
      </HvButton>
      <HvButton icon disabled aria-label="Stop">
        <Play iconSize="M" />
      </HvButton>

      <HvButton startIcon={<Play />} variant="primary" size="lg">
        Play
      </HvButton>
      <HvButton startIcon={<Pause />} variant="secondaryGhost" size="lg">
        Pause
      </HvButton>
      <HvButton disabled startIcon={<Stop />} variant="secondaryGhost">
        Stop
      </HvButton>
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
  ),
};
