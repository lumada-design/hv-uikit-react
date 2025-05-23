import { theme } from "@hitachivantara/uikit-react-core";
import {
  Battery,
  Cloud,
  Edit,
  Favorite,
  Fire,
  Ghost,
  Heart,
  Level0Good,
  Level2Average,
  Level3Bad,
  Palette,
  Table,
} from "@hitachivantara/uikit-react-icons";

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const iconsMapping = {
  table: <Table color="base_dark" />,
  ghost: <Ghost color="base_dark" />,
  cloud: <Cloud color="base_dark" />,
  battery: <Battery color="base_dark" />,
  fire: <Fire color="base_dark" />,
  palette: <Palette color="base_dark" />,
  edit: <Edit color="base_dark" />,
  heart: <Heart color="base_dark" />,
  favorite: <Favorite color="base_dark" />,
};

export const iconsMappingKeys = Object.keys(iconsMapping);

const iconWrapper = (icon: React.ReactNode) => (
  <div
    style={{
      height: 24,
      width: 24,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: `1px solid ${theme.colors.atmo1}`,
      borderRadius: theme.radii.full,
    }}
  >
    {icon}
  </div>
);

export const flowStatuses = ["warning", "error", "success"] as const;
export type FlowStatus = (typeof flowStatuses)[number];
export const flowStatusesSpecs = {
  [flowStatuses[0]]: {
    icon: iconWrapper(<Level2Average color={["warning", "base_light"]} />),
    color: theme.colors.warning,
    description: "Warning",
  },
  [flowStatuses[1]]: {
    icon: iconWrapper(<Level3Bad color={["negative_80", "base_light"]} />),
    color: theme.colors.negative_80,
    description: "Error",
  },
  [flowStatuses[2]]: {
    icon: iconWrapper(<Level0Good color={["positive", "base_light"]} />),
    color: theme.colors.positive,
    description: "Success",
  },
};
