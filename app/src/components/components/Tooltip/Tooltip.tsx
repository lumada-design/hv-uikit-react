import {
  HvBox,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export const Tooltip = () => {
  const styling = {
    placeholder: {
      display: "flex",
      // textAlign: "center",
      justifyContent: "space-between",
      maxWidth: 600,
      margin: "0 auto",
      paddingTop: 80,
    },
  };

  const data = <HvTypography>Grid View</HvTypography>;

  return (
    <HvBox sx={styling.placeholder}>
      <HvTooltip title={data} useSingle>
        {/* <HvTypography>Hover here</HvTypography> */}
        <p>hello world</p>
      </HvTooltip>
      <HvTooltip title={data} open>
        {/* <HvTypography>Tooltip open</HvTypography> */}
        <p>hello world</p>
      </HvTooltip>
    </HvBox>
  );
};