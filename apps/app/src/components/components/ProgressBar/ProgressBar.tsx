import {
  HvBox,
  HvProgressBar,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const ProgressBar = () => {
  return (
    <HvBox
      css={{
        display: "flex",
        gap: "20px",
        width: "80%",
        margin: "auto",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <HvBox
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
        }}
      >
        <HvBox css={{ width: 100 }}>
          <HvTypography variant="title4">Success</HvTypography>
        </HvBox>
        <HvBox sx={{ display: "flex", gap: theme.space.md, flex: 1 }}>
          <HvProgressBar value={100} status="completed" />
        </HvBox>
      </HvBox>
      <HvBox
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
        }}
      >
        <HvBox css={{ width: 100 }}>
          <HvTypography variant="title4">Loading</HvTypography>
        </HvBox>
        <HvBox sx={{ display: "flex", gap: theme.space.md, flex: 1 }}>
          <HvProgressBar value={40} />
        </HvBox>
      </HvBox>
      <HvBox
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
        }}
      >
        <HvBox css={{ width: 100 }}>
          <HvTypography variant="title4">Error</HvTypography>
        </HvBox>
        <HvBox sx={{ display: "flex", gap: theme.space.md, flex: 1 }}>
          <HvProgressBar value={30} status="error" />
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
