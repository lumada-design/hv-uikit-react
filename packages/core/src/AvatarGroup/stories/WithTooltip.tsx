import {
  HvAvatar,
  HvAvatarGroup,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";

export const WithTooltip = () => {
  const users = [
    { name: "Ben", img: "https://i.imgur.com/56Eeg1g.png" },
    { name: "Beatrice", img: "https://i.imgur.com/bE7vg3N.png" },
    { name: "Wayne", img: "https://i.imgur.com/ea22egF.png" },
    { name: "Clara", img: "https://i.imgur.com/6sYhSb6.png" },
  ];

  return (
    <HvAvatarGroup maxVisible={4} size="lg" highlight>
      {users.map((u) => (
        <HvTooltip key={u.img} title={u.name} enterDelay={10}>
          <HvAvatar role="img" alt={u.name} src={u.img} />
        </HvTooltip>
      ))}
    </HvAvatarGroup>
  );
};
