import {
  HvTooltip,
  HvTypography,
  HvAvatarGroup,
  HvAvatar,
} from "@hitachivantara/uikit-react-core";

export const WithTooltip = () => {
  const users = [
    {
      name: "Ben",
      img: "https://i.imgur.com/56Eeg1g.png",
    },
    {
      name: "Beatrice",
      img: "https://i.imgur.com/bE7vg3N.png",
    },
    {
      name: "Wayne",
      img: "https://i.imgur.com/ea22egF.png",
    },
    {
      name: "Clara Soul",
      img: "https://i.imgur.com/6sYhSb6.png",
    },
  ];

  return (
    <HvTooltip
      title={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <HvTypography variant="label">Allowed users: </HvTypography>
          <HvTypography>{users.map((u) => u.name).join(", ")}</HvTypography>
        </div>
      }
    >
      <HvAvatarGroup maxVisible={2}>
        {users.map((u) => (
          <HvAvatar alt={u.name} src={u.img} />
        ))}
      </HvAvatarGroup>
    </HvTooltip>
  );
};
