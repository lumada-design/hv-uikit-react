import { StoryObj } from "@storybook/react";
import { HvAvatar, HvAvatarGroup } from "@hitachivantara/uikit-react-core";

export default {
  title: "Tests/Avatar Group",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false, delay: 5000 },
    eyes: { include: true, waitBeforeCapture: 5000 },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <HvAvatarGroup size="xs" direction="column" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="sm" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="md" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="lg" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="xl" maxVisible={3} toBack={false}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <HvAvatarGroup
          size="xs"
          spacing="compact"
          direction="column"
          maxVisible={3}
        >
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="sm" spacing="compact" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="md" spacing="compact" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup size="lg" spacing="compact" maxVisible={3}>
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>

        <HvAvatarGroup
          size="xl"
          spacing="compact"
          maxVisible={3}
          toBack={false}
        >
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
          <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
          <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
          <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
          <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        </HvAvatarGroup>
      </div>
    </div>
  ),
};
