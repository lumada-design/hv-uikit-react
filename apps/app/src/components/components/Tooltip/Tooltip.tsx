import {
  HvBox,
  HvButton,
  HvTooltip,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Add } from "@hitachivantara/uikit-react-icons";

export const Tooltip = () => {
  const styling = {
    placeholder: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      margin: "0 auto",
      paddingTop: 80,
      gap: theme.space.sm,
    },
  };

  return (
    <HvBox sx={styling.placeholder}>
      <HvTooltip title="Tooltip content" useSingle>
        <HvTypography>Hover here</HvTypography>
      </HvTooltip>
      <HvTooltip title="Tooltip content" open>
        <p>{`I'm always showing a tooltip`}</p>
      </HvTooltip>
      <HvTooltip title="Tooltip content">
        <HvButton icon variant="secondaryGhost">
          <Add />
        </HvButton>
      </HvTooltip>
    </HvBox>
  );
};
