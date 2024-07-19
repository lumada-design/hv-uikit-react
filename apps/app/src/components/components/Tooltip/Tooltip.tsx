import {
  HvTooltip,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

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
    <div style={styling.placeholder}>
      <HvTooltip title="Tooltip content" useSingle>
        <HvTypography>Hover here</HvTypography>
      </HvTooltip>
      <HvTooltip title="Tooltip content" open>
        <p>{`I'm always showing a tooltip`}</p>
      </HvTooltip>
    </div>
  );
};
