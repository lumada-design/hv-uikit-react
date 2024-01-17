import {
  HvTooltip,
  HvAvatarGroup,
  HvAvatar,
} from "@hitachivantara/uikit-react-core";

export const CustomOverflow = () => {
  const overflowComponent = (overflowCount: number) => (
    <HvTooltip title={`+${overflowCount}`}>
      <HvAvatar backgroundColor="brand" color="atmo1" />
    </HvTooltip>
  );

  return (
    <HvAvatarGroup overflowComponent={overflowComponent} maxVisible={3}>
      <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
      <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
      <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
      <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
      <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
      <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
      <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
    </HvAvatarGroup>
  );
};
