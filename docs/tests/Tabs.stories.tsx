import { StoryObj } from "@storybook/react";
import { HvBadge, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";
import {
  Alert,
  Calendar,
  DataStore,
  Helicopter,
  Reload,
} from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Tabs",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <>
      <HvTabs value={0}>
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
      <br />
      <br />
      <HvTabs value={0} variant="fullWidth">
        <HvTab label="Clickable tab 1" />
        <HvTab label="Clickable tab 2" />
        <HvTab label="Clickable tab 3" />
      </HvTabs>
      <br />
      <br />
      <HvTabs value={0}>
        <HvTab
          label="Clickable tab 1"
          icon={<DataStore />}
          iconPosition="start"
        />
        <HvTab
          label="Clickable tab 2"
          icon={<DataStore />}
          iconPosition="start"
        />
        <HvTab
          label="Clickable tab 3"
          icon={<DataStore />}
          iconPosition="start"
        />
      </HvTabs>
      <br />
      <br />
      <HvTabs value={0}>
        <HvTab
          label="Clickable tab 1"
          icon={<Helicopter />}
          iconPosition="top"
        />
        <HvTab
          label="Clickable tab 2"
          icon={<Helicopter />}
          iconPosition="top"
        />
        <HvTab
          label="Clickable tab 3"
          icon={<Helicopter />}
          iconPosition="top"
        />
      </HvTabs>
      <br />
      <br />
      <HvTabs value={0}>
        <HvTab icon={<Alert />} aria-label="Alert" />
        <HvTab icon={<Reload />} aria-label="Reload" />
        <HvTab icon={<Calendar />} aria-label="Calendar" />
      </HvTabs>
      <br />
      <br />
      <HvTabs value={0}>
        <HvTab label={<HvBadge showCount count={2} text="Track events" />} />
        <HvTab label={<HvBadge count={1} text="Vehicle events" />} />
      </HvTabs>
    </>
  ),
};
