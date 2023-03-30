import {
  HvBox,
  HvLoading,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const Loading = () => {
  return (
    <HvBox
      css={{
        display: "flex",
        gap: "20px",
        width: "80%",
        margin: "auto",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <HvBox
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <HvBox css={{ width: 80 }}>
          <HvTypography variant="title4">Default</HvTypography>
        </HvBox>
        <HvBox sx={{ display: "flex", gap: theme.space.md }}>
          <HvLoading />
        </HvBox>
      </HvBox>
      <HvBox
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <HvBox css={{ width: 80 }}>
          <HvTypography variant="title4">Small</HvTypography>
        </HvBox>
        <HvBox sx={{ display: "flex", gap: theme.space.md }}>
          <HvLoading small />
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
