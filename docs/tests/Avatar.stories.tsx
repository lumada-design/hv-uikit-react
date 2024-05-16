import { StoryObj } from "@storybook/react";
import { HvAvatar } from "@hitachivantara/uikit-react-core";
import { Bookmark } from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Avatar",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <HvAvatar size="xs" />
      <HvAvatar size="xs" variant="square" />
      <HvAvatar backgroundColor="sema6" size="sm">
        NA
      </HvAvatar>
      <HvAvatar size="lg" backgroundColor="warning">
        <Bookmark iconSize="M" color={["base_light", "base_dark"]} />
      </HvAvatar>
      <HvAvatar size="xs" variant="square" status="positive">
        AB
      </HvAvatar>
      <HvAvatar size="lg" status="warning" badge="negative">
        AB
      </HvAvatar>
      <HvAvatar
        size="xl"
        alt="Beatrice"
        src="https://i.imgur.com/bE7vg3N.png"
      />
      <HvAvatar
        size="xl"
        variant="square"
        alt="Beatrice"
        src="https://i.imgur.com/bE7vg3N.png"
      />
    </div>
  ),
};
