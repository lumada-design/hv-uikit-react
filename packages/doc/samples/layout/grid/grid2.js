import React from "react";
import HvGrid from "@hv/uikit-react-core/dist/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { useMediaQuery, useTheme } from "@material-ui/core";

const Box = ({ text }) => (
  <div
    style={{
      backgroundColor: "ivory",
      height: "100px",
      width: "100%",
      boxShadow: "2px 2px 5px grey"
    }}
  >
    <div
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center"
      }}
    >
      {text}
    </div>
  </div>
);

const GridExample = () => {
  const theme = useTheme();
  const findBreakpoint = () =>
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || "xs";

  let breakpoint = findBreakpoint();
  let title = `breakpoint: ${breakpoint}`;

  return (
    <div>
      <HvTypography variant="xxsTitle">{title}</HvTypography>
      <div style={{ border: "1px solid", backgroundColor: "#F9F9F9" }}>
        <HvGrid container>
          <HvGrid item xs={4} sm={8} md={8} lg={12} xl={12}>
            <Box text={"xs={4} sm={8} md={8} lg={12} xl={12}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={4} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
        </HvGrid>
      </div>
    </div>
  );
};

export default <GridExample />;
