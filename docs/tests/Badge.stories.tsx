import { StoryObj } from "@storybook/react";
import { HvBadge } from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Badge",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
      <HvBadge count={10} icon={<Alert />} />
      <HvBadge showCount count={8} icon={<Alert />} />
      <HvBadge showCount count={88} icon={<Alert />} />
      <HvBadge showCount count={888} icon={<Alert />} />
      <HvBadge count={0} text="Events" textVariant="label" />
      <HvBadge count={10} text="Events" />
      <HvBadge showCount count={10} maxCount={5} text="Events" />
      <HvBadge showCount count={8} text="Events" textVariant="title4" />
    </div>
  ),
};
